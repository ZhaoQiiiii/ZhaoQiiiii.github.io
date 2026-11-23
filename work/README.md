# work

当前主页的独立子页面，每个项目/论文一个目录，统一放在 `work/`：

```text
work/
├── _template/              # 复制用模板
└── <slug>/
    ├── index.html
    └── assets/
        ├── images/
        ├── videos/
        └── files/
```

新建页面：

```bash
cp -r work/_template work/my-page
```

然后编辑 `work/my-page/index.html`，把根页面卡片链接改成 `./work/my-page/`。
没有本地页面的论文可以不建目录，主页卡片直接链 arXiv/PDF。子页面返回主页用 `../../`。
