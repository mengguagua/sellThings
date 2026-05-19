import {
  AudioLines,
  BrainCircuit,
  Code2,
  Cpu,
  FileSearch,
  GitPullRequestArrow,
  Guitar,
  Lightbulb,
  Microscope,
  NotebookTabs,
  Pill,
  Puzzle,
  Radar,
  Rocket,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

export const modelRows = [
  {
    name: "Codex / OpenAI",
    model: "GPT-5.5",
    cost: "$5 输入 / $30 输出；缓存输入 $0.50",
    ability: "前沿通用与代码模型，支持 1,050K 上下文、128K 输出；适合复杂工程代理、长链路调试、工具调用和高难度推理。",
    company: "OpenAI，美国；ChatGPT、API、Codex 与企业方案。GPT-5.5 已面向 ChatGPT、Codex 和 API 提供。",
    business: "非上市公司，官方定价与模型页不披露实时营收；实际采购看 API 用量、ChatGPT/Codex 订阅和企业合同。",
  },
  {
    name: "Gemini Pro",
    model: "Gemini 3.1 Pro Preview",
    cost: "$2/$12；>200K 为 $4/$18；缓存 $0.20/$0.40",
    ability: "面向复杂任务的推理升级版，强化多模态理解、Agentic 能力和 vibe coding；适合复杂材料综合、交互原型和长链路分析。",
    company: "Google / Alphabet，美国；云、搜索、广告和 AI 基建协同。",
    business: "Google 官方 2026-02 宣布 3.1 Pro 进入 Gemini API、Vertex AI、Gemini app 和 NotebookLM；Alphabet 2025 年收入约 4028 亿美元。",
  },
  {
    name: "Claude",
    model: "Claude Sonnet 4.6 / Opus 4.7",
    cost: "Sonnet $3/$15；Opus $5/$25",
    ability: "代码审阅、长文写作、需求澄清与多步推理很强。",
    company: "Anthropic，美国；强调安全、企业和代码场景。",
    business: "私营公司；Axios 2026-04 称年化收入 run-rate 约 300 亿美元。",
  },
  {
    name: "GLM",
    model: "GLM-5.1",
    cost: "约 ¥6 输入 / ¥24 输出",
    ability: "国产旗舰模型，Agentic Coding、长任务和本地生态适配突出。",
    company: "智谱 AI，中国；GLM 系列、开放平台和企业解决方案。",
    business: "非上市，公开营收有限；融资和政企生态较强。",
  },
  {
    name: "Kimi",
    model: "Kimi K2.6 / K2.5",
    cost: "K2.5 市场常见约 $0.44-$0.60 / $2-$3",
    ability: "长上下文、中文材料处理、Agent 和代码能力提升明显。",
    company: "月之暗面，中国；Kimi 应用和 Moonshot API。",
    business: "私营公司；公开营收少，增长主要看消费端和 API 采用。",
  },
  {
    name: "DeepSeek",
    model: "DeepSeek V4 Flash / Pro",
    cost: "Flash $0.14/$0.28；Pro 折扣期 $0.435/$0.87",
    ability: "极强成本优势，适合高频问答、批处理和预算敏感项目。",
    company: "深度求索，中国；模型开放、API 与兼容生态。",
    business: "私营公司；营收未充分公开，以技术影响力和低价策略著称。",
  },
  {
    name: "MiniMax",
    model: "MiniMax M2.7",
    cost: "$0.30 输入 / $1.20 输出；高速版 $0.60/$2.40",
    ability: "面向真实软件工程和复杂 Agent 工作流，强化 Agent Teams、多轮工具调用、线上排障、Office 文档生成与高保真编辑。",
    company: "MiniMax，中国；M2.7 已在 MiniMax Agent 和 MiniMax API Platform 提供，另有 Token Plan 按请求窗口计量。",
    business: "MiniMax 官方 2026-03 发布 M2.7，强调 SWE-Pro 56.22%、Terminal Bench 2 为 57.0%、GDPval-AA ELO 1495；公司业务覆盖文本、语音、视频、Agent、Talkie、海螺等。",
  },
];

export const workItems = [
  { icon: Code2, title: "代码问题修复", text: "扫描代码，确认问题代码位置，分析问题原因，最小修改，协助开发者解决中低级问题。" },
  { icon: FileSearch, title: "陌生工程速读", text: "快速概述业务边界、目录结构、技术栈、运行环境。" },
  { icon: Sparkles, title: "简单业务 Vibe Coding", text: "把低风险表单、脚本、运营页、内部工具快速做成可运行原型。" },
  { icon: AudioLines, title: "会议同步记录", text: "语音转文字、抽取待办、按角色归档结论，事后复盘。" },
  { icon: Lightbulb, title: "疑难问题思路", text: "把模糊问题拆成可验证假设，给出排查顺序和备选方案。" },
  { icon: GitPullRequestArrow, title: "代码 Review", text: "从边界条件、性能、可维护性、测试缺口四个角度补盲。" },
];

export const lifeItems = [
  {
    icon: Rocket,
    title: "个人项目开发",
    text: "Godot 游戏、微信小程序、Chrome 插件都可以从需求拆解到可运行 demo，再逐步精修。",
  },
  {
    icon: Guitar,
    title: "消费分析：例如换吉他",
    text: "以 7 个月学习、每周 1 节课、每天练 1 小时、当前 Yamaha FG830、预算 5-6k、无舞台需求为前提，Eastman E3DE DLX 属于合理升级，但要优先试琴。建议同时看 Eastman E6D/E8D、Yamaha LL16、Furch Blue D-CM、二手 Martin DX/000X。琴行老师报价看售后和调校，二手琴看面板鼓包/琴颈角度/品丝，电商看退换，抖音私报价要留聊天记录和发票。合理目标价：E3DE DLX 新琴约 4.8k-5.6k，成色好的二手约 3.8k-4.6k。",
  },
  {
    icon: Pill,
    title: "复杂物品理解",
    text: "例如药品或保健品，AI 可拆成成分、作用、禁忌、定价逻辑和需要咨询医生的问题清单。",
  },
];

export const sourceLinks = [
  ["OpenAI Pricing", "https://platform.openai.com/docs/pricing/"],
  ["Gemini Pricing", "https://ai.google.dev/gemini-api/docs/pricing"],
  ["Claude Pricing", "https://platform.claude.com/docs/about-claude/pricing"],
  ["DeepSeek Pricing", "https://api-docs.deepseek.com/quick_start/pricing"],
  ["Kimi Pricing", "https://platform.kimi.com/docs/pricing/chat"],
  ["MiniMax FY2025", "https://www.prnewswire.com/news-releases/minimax-announces-full-year-2025-financial-results-302700868.html"],
];

export const buildSteps = [
  {
    icon: NotebookTabs,
    label: "读 md 需求",
    text: "先读取 plan.md，确认首屏必须是一屏高、白灰背景、底部火柴人、轻微呼吸，并且鼠标移动时要左右走动。",
  },
  {
    icon: BrainCircuit,
    label: "分析动画拆解",
    text: "把一句“火柴人跟随鼠标”拆成目标位置、缓动位移、朝向切换、呼吸曲线、手臂摆动、弯膝抬腿和地面线关系。",
  },
  {
    icon: Cpu,
    label: "确认技术方案",
    text: "选择 Canvas + requestAnimationFrame 承担逐帧绘制，React 只负责页面结构，避免用 DOM 反复重排来做角色动画。",
  },
  {
    icon: TerminalSquare,
    label: "确认运行环境",
    text: "检查 Node 与 npm 可用后，搭建 Vite、React、TypeScript、Tailwind、PostCSS、Radix UI 和 lucide 图标依赖。",
  },
  {
    icon: Puzzle,
    label: "代码实施",
    text: "编写 StickFigureCanvas：监听 pointermove，计算 targetX、velocity、facing、walkPower，再绘制头、身体、手臂、双段腿和阴影。",
  },
  {
    icon: Radar,
    label: "运行与视觉验证",
    text: "启动本地开发服务，在浏览器里观察首屏效果；根据视觉反馈继续调按钮位置、眼睛朝向、站姿和走路抬腿幅度。",
  },
];

export const positioningCards = [
  {
    title: "AI 的定位",
    body: "不是“替代专业能力”的魔法，而是一个高速度、低情绪成本的协作层：能读、能写、能试错、能解释，但最终判断仍在使用者。",
  },
  {
    title: "国内外差异",
    body: "海外模型在通用能力和生态工具上领先，国内模型在中文、本地价格、部署链路和政策适配上更容易落地。",
  },
];

export const techBadges = ["React", "TypeScript", "Vite", "Tailwind CSS", "PostCSS", "Radix UI", "shadcn 风格", "Canvas"];
