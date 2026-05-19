import fs from "node:fs/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDir = new URL(".", import.meta.url);
const port = 9339;
const viewport = { width: 1080, height: 1440, scale: 1 };
const targetUrl = "http://127.0.0.1:5173/";

const { spawn } = await import("node:child_process");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed ${response.status}: ${url}`);
  }
  return response.json();
}

async function waitForChrome() {
  const deadline = Date.now() + 12000;
  while (Date.now() < deadline) {
    try {
      return await requestJson(`http://127.0.0.1:${port}/json/version`);
    } catch {
      await sleep(250);
    }
  }
  throw new Error("Chrome remote debugging did not become ready.");
}

async function openPage() {
  const endpoint = `http://127.0.0.1:${port}/json/new?${encodeURIComponent(targetUrl)}`;
  const response = await fetch(endpoint, { method: "PUT" });
  if (!response.ok) {
    throw new Error(`Could not open page: ${response.status}`);
  }
  return response.json();
}

function createCdpClient(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  });

  return {
    ready: new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    }),
    send(method, params = {}) {
      const messageId = ++id;
      socket.send(JSON.stringify({ id: messageId, method, params }));
      return new Promise((resolve, reject) => pending.set(messageId, { resolve, reject }));
    },
    close() {
      socket.close();
    },
  };
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Runtime evaluation failed");
  }
  return result.result.value;
}

async function screenshot(client, filename, y, note) {
  await evaluate(client, `window.scrollTo(0, ${Math.max(0, Math.round(y))});`);
  await sleep(700);
  const result = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await fs.writeFile(new URL(filename, outputDir), Buffer.from(result.data, "base64"));
  console.log(`${filename} <- ${Math.round(y)} ${note}`);
}

await fs.mkdir(outputDir, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=/private/tmp/showai-redbook-chrome-${Date.now()}`,
  `--window-size=${viewport.width},${viewport.height}`,
  "about:blank",
], { stdio: "ignore" });

try {
  await waitForChrome();
  const page = await openPage();
  const client = createCdpClient(page.webSocketDebuggerUrl);
  await client.ready;

  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.scale,
    mobile: false,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
  await client.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await client.send("Page.navigate", { url: targetUrl });
  await sleep(1800);

  const offsets = await evaluate(client, `(() => {
    const sections = [...document.querySelectorAll("main > section")];
    return sections.map((section, index) => {
      const rect = section.getBoundingClientRect();
      const label = section.querySelector("h1,h2")?.innerText || "";
      return { index, y: rect.top + window.scrollY, height: rect.height, label };
    });
  })()`);

  const pageHeight = await evaluate(client, "document.documentElement.scrollHeight");
  console.log(JSON.stringify({ viewport, pageHeight, sections: offsets }, null, 2));

  const shots = [
    ["01-cover-hero.png", offsets[0].y, "首屏封面"],
    ["02-animation-process.png", offsets[1].y, "实现过程"],
    ["03-value-cost-models.png", offsets[2].y, "定位与成本"],
    ["04-use-cases.png", offsets[3].y, "实际帮助"],
    ["05-canvas-code.png", offsets[4].y, "代码示例"],
    ["06-plugin-workflow.png", offsets[5].y, "开发工具 + 插件 + API"],
    ["07-ai-dev-risks.png", offsets[6].y, "AI 开发挑战"],
  ];

  for (const [filename, y, note] of shots) {
    await screenshot(client, filename, y, note);
  }

  client.close();
} finally {
  chrome.kill("SIGTERM");
}
