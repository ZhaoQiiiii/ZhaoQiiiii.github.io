# Subpage template

在 `works/` 下复制本目录为子页面目录，目录名用页面 slug（在仓库根目录执行）：

```bash
cp -r works/_template works/my-page
```

然后：

1. 编辑 `index.html` 的标题、作者、Overview、Highlights 和链接。
2. 图片放 `assets/images/`，视频放 `assets/videos/`，PDF/BibTeX 放 `assets/files/`。
3. 把 `.teaser-placeholder` 换成 `<img>` 或 `<video>`（HTML 注释里有示例）。
4. 在根页面 `index.html` 对应卡片里把链接改成 `./works/my-page/`。
5. 共享素材（照片、卡片缩略图、logo）放根级 `assets/figures/`；页面内素材放本目录 `assets/`。
