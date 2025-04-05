# Chrome DevTools Panel Template

[![npm version](https://img.shields.io/npm/v/chrome-devtools-panel-template.svg)](https://www.npmjs.com/package/chrome-devtools-panel-template)
[![license](https://img.shields.io/npm/l/chrome-devtools-panel-template.svg)](https://github.com/yourusername/chrome-devtools-panel-template/blob/main/LICENSE)

一个用于快速创建Chrome DevTools面板扩展的模板，使用Vue 3和Vite构建。

## 特点

- 使用Vite进行高效构建
- Vue 3用于UI组件
- 完整配置的Chrome扩展结构
- 内置通信测试工具
- 示例实现了Chrome DevTools API (inspectedWindow.getResources)

## 安装

```bash
# 使用NPX创建项目
npx chrome-devtools-panel-template my-panel

# 或者先全局安装模板，然后使用它
npm install -g chrome-devtools-panel-template
chrome-devtools-panel-template my-panel
```

## 项目结构

```
my-panel/
├── src/
│   ├── assets/
│   │   └── panel.css       # 面板的主要CSS样式
│   ├── icons/              # 扩展图标
│   ├── background.js       # 背景脚本
│   ├── devtools.html       # DevTools页面
│   ├── devtools.js         # DevTools脚本
│   └── manifest.json       # 扩展配置文件
├── panel.html              # 面板入口点HTML（项目主入口）
├── panel.js                # 面板入口点JS
├── Panel.vue               # 主Vue组件
├── vite.config.js          # Vite配置
└── package.json            # 项目依赖和脚本
```

## 输出结构

构建后，扩展将在`dist`目录中具有以下结构：

```
dist/
├── assets/
│   └── panel.css           # 编译后的CSS
├── icons/                  # 扩展图标
├── vendor/                 # 第三方代码块
├── background.js           # 背景脚本
├── devtools.html           # DevTools页面
├── devtools.js             # DevTools脚本
├── manifest.json           # 扩展配置
├── panel.html              # 面板HTML
└── panel.js                # 编译后的面板JavaScript
```

## 使用方法

### 开发

1. 安装依赖：
   ```bash
   npm install
   ```

2. 构建扩展：
   ```bash
   npm run build
   ```

3. 启用文件监视模式（实时编译）：
   ```bash
   npm run watch
   ```
   
   注意：在监视模式下，每当你修改源文件，扩展就会自动重新构建。
   修改文件后，你需要在Chrome的扩展管理页面刷新扩展。

### 在Chrome中加载扩展

1. 打开Chrome并导航到`chrome://extensions/`
2. 启用"开发者模式"（右上角的开关）
3. 点击"加载已解压的扩展"并选择`dist`目录
4. 在任何页面中打开Chrome DevTools（F12或Ctrl+Shift+I）
5. 查找新的"DevTools_demo"选项卡

### 自定义扩展

- 修改`Panel.vue`以更改UI和功能
- 更新`src/manifest.json`以修改扩展元数据
- 替换占位图标为实际图标


### 资源检查

面板默认显示当前页面上所有资源的类型和数量统计，演示了如何使用`chrome.devtools.inspectedWindow.getResources` API。

## 设计理念

这个模板采用了与标准Vite项目略有不同的结构：
- 入口文件（panel.html、panel.js、Panel.vue）放在项目根目录，而不是src目录下
- 这样设计是为了确保构建输出直接将这些文件放在dist根目录，符合Chrome扩展的要求
- 其他支持文件保留在src目录中，构建时会正确复制到dist

## 许可证

MIT
