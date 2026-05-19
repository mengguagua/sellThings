import {
  ArrowDown,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  PackageCheck,
  Sprout,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import heroOrchardImage from "../static/IMG_9326.jpg";
import basketImage from "../static/d14d1b1a2fdb05ce3800e4e2915a92.JPG";
import fruitImageOne from "../static/8ba307ca17f16539bb6cd430623cc9.JPG";
import fruitImageTwo from "../static/5e73295dae70ebae2ef98264f015ba.JPG";
import fruitImageThree from "../static/744a301794728301f2cc848e83a121.JPG";
import orchardImage from "../static/2e9bc988afd47dc45ddb7468859620.JPG";
import StickFigureCanvas from "./components/StickFigureCanvas";

const wechatId = "g844972580";
const coordinateText = "120.179454,30.493722";

const prices = [
  {
    title: "上门自提",
    price: "12",
    unit: "元 / 斤",
    text: "适合附近朋友当天自提，果子新鲜到手，价格最实在。",
    icon: PackageCheck,
  },
  {
    title: "下地采摘和购买",
    price: "15",
    unit: "元 / 斤",
    text: "到塘栖现场采摘，边选边买，适合周末带家人体验。",
    icon: Sprout,
  },
  {
    title: "顺丰邮寄",
    price: "20",
    unit: "元 / 斤",
    text: "不包邮。邮费和快递单号可提供截图，按实际发货沟通。",
    icon: Truck,
  },
];

const highlights = [
  { label: "当季鲜果", value: "现摘现发" },
  { label: "塘栖产地", value: "软糯多汁" },
  { label: "购买方式", value: "微信直联" },
];

const storyCards = [
  {
    title: "清甜软糯",
    text: "成熟枇杷入口是柔和的甜，果肉细腻，汁水充足，适合冷藏后慢慢吃。",
  },
  {
    title: "自然果香",
    text: "带着枝叶和果皮的清香，不靠浓烈甜味撑场面，吃起来很轻盈。",
  },
  {
    title: "日常分享",
    text: "家里老人、小朋友和办公室同事都好分，整篮摆着也很有春末初夏的仪式感。",
  },
];

function copyWechat() {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(wechatId);
  }

  const textarea = document.createElement("textarea");
  textarea.value = wechatId;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    return Promise.reject(new Error("copy failed"));
  }

  return Promise.resolve();
}

function SectionHeader({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className={light ? "section-eyebrow section-eyebrow-dark" : "section-eyebrow"}>
        {eyebrow}
      </p>
      <h2 className={light ? "section-title text-white" : "section-title text-apple-ink"}>
        {title}
      </h2>
      {text ? (
        <p className={light ? "section-copy text-white/74" : "section-copy text-apple-muted"}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[560px] overflow-hidden bg-[#f5f5f7] text-apple-ink sm:min-h-[640px] lg:h-screen" data-hero>
      <nav className="absolute inset-x-0 top-0 z-30 border-b border-black/5 bg-[#f5f5f7]/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:py-3">
          <a href="#top" className="text-sm font-semibold tracking-[-0.01em]">
            塘栖枇杷
          </a>
          <div className="flex items-center gap-5 text-xs text-apple-muted">
            <a className="hidden transition hover:text-apple-blue sm:inline" href="#flavor">
              风味
            </a>
            <a className="hidden transition hover:text-apple-blue sm:inline" href="#pricing">
              价格
            </a>
            <a className="hidden transition hover:text-apple-blue sm:inline" href="#location">
              采摘定位
            </a>
            <a className="apple-pill apple-pill-small" href="#buy">
              加微信购买
            </a>
          </div>
        </div>
      </nav>

      <div className="absolute inset-0">
        <StickFigureCanvas />
      </div>

      <div id="top" className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-8 pt-[74px] text-center sm:pb-10 sm:pt-20">
        <div className="mt-1 flex max-w-[340px] flex-wrap justify-center gap-2 text-[11px] text-apple-muted sm:mt-6 sm:max-w-none sm:text-xs">
          {highlights.map((item) => (
            <span key={item.label} className="rounded-full bg-white/80 px-2.5 py-1 shadow-[0_1px_1px_rgba(0,0,0,0.04)] sm:px-3">
              {item.label} · {item.value}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.02em] text-apple-ink sm:mt-5 sm:text-6xl lg:text-7xl">
          塘栖枇杷
        </h1>
        <p className="mt-3 max-w-[360px] text-[21px] leading-[1.35] tracking-[-0.01em] text-apple-ink sm:max-w-2xl sm:text-2xl sm:leading-8">
          枝头刚熟的软糯清甜，现摘、可自提、可采摘、可顺丰。
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6">
          <a className="apple-pill" href="#buy">
            微信购买
          </a>
          <a className="apple-pill apple-pill-secondary" href="#pricing">
            查看价格
          </a>
        </div>
        <a
          href="#flavor"
          className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 text-sm text-apple-blue transition hover:translate-y-0.5"
        >
          继续了解
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function FlavorSection() {
  return (
    <section id="flavor" className="bg-white px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Flavor"
          title="一口是塘栖的初夏"
          text="不是浓到发腻的甜，而是软糯、细润、带一点清清爽爽的果香。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {storyCards.map((card) => (
            <article key={card.title} className="rounded-[18px] border border-black/10 bg-[#f5f5f7] p-6">
              <Star className="h-5 w-5 text-apple-blue" />
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.015em] text-apple-ink">
                {card.title}
              </h3>
              <p className="mt-3 text-[17px] leading-7 tracking-[-0.01em] text-apple-muted">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoStorySection() {
  return (
    <section className="bg-[#1d1d1f] px-5 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Fresh"
          title="真实果子，真实产地"
          text="照片来自现有素材，页面按不同屏幕裁切，尽量让商品本身成为主角。"
          light
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[18px] bg-white/5">
            <img
              src={heroOrchardImage}
              alt="塘栖枇杷挂在枝头"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <img
              src={basketImage}
              alt="一篮新鲜塘栖枇杷"
              className="h-60 w-full rounded-[18px] object-cover sm:h-full lg:h-[250px]"
            />
            <div className="rounded-[18px] bg-white px-6 py-7 text-apple-ink">
              <p className="text-sm font-semibold text-apple-blue">现摘销售</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
                可以自提，也可以到地里采摘。
              </h3>
              <p className="mt-4 text-[17px] leading-7 tracking-[-0.01em] text-apple-muted">
                顺丰邮寄按实际情况沟通，邮费和快递单号都可以截图确认。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const items = [
    "果肉柔软细腻，适合鲜食和饭后分享。",
    "富含水分和自然果香，冷藏后口感更清爽。",
    "当季短窗口鲜果，适合尽快吃完，风味更好。",
  ];

  return (
    <section className="bg-[#f5f5f7] px-5 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <p className="section-eyebrow text-left">Nutrition</p>
          <h2 className="section-title text-left text-apple-ink">清甜、水润、刚刚好。</h2>
          <p className="mt-5 text-[17px] leading-8 tracking-[-0.01em] text-apple-muted">
            枇杷适合做日常水果补充。页面只做普通食品介绍，不做药效承诺；真正动人的地方，还是那口新鲜。
          </p>
          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div key={item} className="flex gap-3 text-[17px] leading-7 text-apple-ink">
                <Check className="mt-1 h-5 w-5 shrink-0 text-apple-blue" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={fruitImageOne}
            alt="新鲜塘栖枇杷细节"
            className="h-72 w-full rounded-[18px] object-cover"
          />
          <img
            src={fruitImageTwo}
            alt="成熟塘栖枇杷果实"
            className="mt-10 h-72 w-full rounded-[18px] object-cover"
          />
          <img
            src={fruitImageThree}
            alt="邵家坝村枇杷湾产地招牌"
            className="col-span-2 h-[640px] w-full rounded-[18px] bg-[#ebe7dc] object-contain sm:h-[760px] lg:h-[680px]"
          />
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="bg-white px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Price"
          title="三种购买方式"
          text="按你离塘栖的距离和时间安排来选。价格清楚，发货前可微信确认。"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {prices.map((item) => (
            <article key={item.title} className="rounded-[18px] border border-black/10 bg-[#f5f5f7] p-7">
              <item.icon className="h-7 w-7 text-apple-blue" />
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.015em] text-apple-ink">
                {item.title}
              </h3>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-6xl font-semibold tracking-[-0.03em] text-apple-ink">
                  {item.price}
                </span>
                <span className="pb-2 text-[17px] text-apple-muted">{item.unit}</span>
              </div>
              <p className="mt-5 text-[17px] leading-7 tracking-[-0.01em] text-apple-muted">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuySection() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopy = async () => {
    try {
      await copyWechat();
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  };

  return (
    <section id="buy" className="bg-[#f5f5f7] px-5 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[28px] bg-white lg:grid-cols-[0.95fr_1.05fr]">
        <div className="p-8 sm:p-12">
          <p className="section-eyebrow text-left">Buy</p>
          <h2 className="section-title text-left text-apple-ink">想买，直接加微信。</h2>
          <p className="mt-5 text-[17px] leading-8 tracking-[-0.01em] text-apple-muted">
            备注“枇杷”，说明自提、采摘或邮寄，再确认数量和时间。顺丰邮寄会单独沟通邮费。
          </p>
          <div className="mt-8 rounded-[18px] border border-black/10 bg-[#f5f5f7] p-5">
            <p className="text-sm text-apple-muted">微信号</p>
            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <strong className="break-all text-3xl font-semibold tracking-[-0.02em] text-apple-ink">
                {wechatId}
              </strong>
              <button className="apple-pill shrink-0 border-0" type="button" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    复制微信
                  </>
                )}
              </button>
            </div>
            {copyFailed ? (
              <p className="mt-3 text-sm leading-6 text-apple-muted">
                当前浏览器限制自动复制，请长按上方微信号手动复制。
              </p>
            ) : null}
          </div>
        </div>
        <img
          src={basketImage}
          alt="可购买的新鲜枇杷"
          className="h-full min-h-[320px] w-full object-cover"
        />
      </div>
    </section>
  );
}

function LocationSection() {
  const amapUrl =
    "https://uri.amap.com/marker?position=120.179454,30.493722&name=%E5%A1%98%E6%A0%96%E6%9E%87%E6%9D%B7";
  const baiduUrl =
    "https://api.map.baidu.com/marker?location=30.493722,120.179454&title=%E5%A1%98%E6%A0%96%E6%9E%87%E6%9D%B7&content=%E5%A1%98%E6%A0%96%E6%9E%87%E6%9D%B7&output=html";

  return (
    <section id="location" className="bg-[#1d1d1f] px-5 py-20 text-white sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[#2a2a2c]">
          <img
            src={orchardImage}
            alt="塘栖枇杷采摘位置"
            className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-apple-blue shadow-[0_16px_50px_rgba(0,0,0,0.28)]">
            <MapPin className="h-10 w-10" />
          </div>
          <div className="absolute inset-x-6 bottom-6 rounded-[18px] bg-white/90 p-5 text-apple-ink backdrop-blur">
            <p className="text-sm text-apple-muted">GCJ-02 坐标</p>
            <p className="mt-1 break-all text-2xl font-semibold tracking-[-0.02em]">
              {coordinateText}
            </p>
          </div>
        </div>

        <div>
          <p className="section-eyebrow section-eyebrow-dark text-left">Location</p>
          <h2 className="section-title text-left text-white">可到地里采摘。</h2>
          <p className="mt-5 text-[17px] leading-8 tracking-[-0.01em] text-white/74">
            坐标使用计划中提供的 GCJ-02 数据。点击下面的导航入口，用你常用的地图打开。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="apple-pill" href={amapUrl} target="_blank" rel="noreferrer">
              <Navigation className="h-4 w-4" />
              高德导航
            </a>
            <a className="apple-pill apple-pill-on-dark" href={baiduUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              百度地图
            </a>
          </div>
          <a
            className="mt-8 inline-flex items-center gap-1 text-[17px] text-[#2997ff]"
            href="#buy"
          >
            先加微信确认采摘时间
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <FlavorSection />
      <PhotoStorySection />
      <BenefitsSection />
      <PricingSection />
      <BuySection />
      <LocationSection />
    </main>
  );
}
