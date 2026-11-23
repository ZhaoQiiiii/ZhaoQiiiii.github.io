# Zhaoqi Wang — Personal Homepage

纯静态单页个人主页，无构建步骤，GitHub Pages 直接托管仓库根目录。

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 编辑位置

- `index.html`：全部文案、链接、区块结构。待填内容用 `[方括号]` 标注，并在源码中以 `<!-- TODO: ... -->` 标记。
- `assets/css/site.css`：设计系统，顶部 `:root` 是浅色令牌，`html.dark` 是深色令牌。
- `assets/js/site.js`：主题切换、微信复制、滚动进度、reveal 入场、返回顶部、最后更新时间。

## 页面功能

- 名字旁的 `inno` 是英文名别名；浏览器标题为 `Zhaoqi Wang · inno`。
- 字体：姓名与 `inno` 用 Instrument Serif 斜体，正文 Inter，章节标题 Space Grotesk，等宽信息 JetBrains Mono。
- 右上角月亮/太阳按钮切换浅色/深色，选择写入 `localStorage`；没有记录时跟随系统 `prefers-color-scheme`。
- WeChat 按钮点击复制 `data-wechat` 里的 ID（默认占位 `[WeChat ID]`，记得替换）。

## 换成你自己的信息

1. 搜索 `TODO` 逐个替换占位。
2. 照片：把 `.profile-placeholder` 整块换成
   `<img class="profile-photo" src="assets/img/portrait.jpg" alt="Zhaoqi Wang">`，
   并把图片放进 `assets/img/`。
3. 其余占位链接 `href="#"` 换成真实 URL（Google Scholar 和邮箱已填好）。
4. 新增论文卡片：复制一个 `<article class="pub-card">` 整块。
5. 部署：推到 GitHub 的 `main`/`master`，仓库 Settings → Pages 选择根目录即可。
   `.nojekyll` 已关闭 Jekyll 处理。
