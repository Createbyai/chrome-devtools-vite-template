#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// 获取当前文件的目录
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// 获取命令行参数
const projectName = process.argv[2];

if (!projectName) {
  console.error('请提供项目名称:');
  console.error('  npx create-chrome-devtools-panel my-panel');
  process.exit(1);
}

// 项目目标路径
const targetDir = path.join(process.cwd(), projectName);

// 检查目标目录是否已存在
if (fs.existsSync(targetDir)) {
  console.error(`错误: 目录 ${projectName} 已存在`);
  process.exit(1);
}

// 模板路径
const templateDir = path.join(__dirname, '..', 'template');

// 创建项目函数
async function createProject() {
  console.log(`正在创建Chrome DevTools面板扩展: ${projectName}...`);
  
  // 1. 创建目标目录
  fs.mkdirSync(targetDir);

  // 2. 复制模板文件
  copyTemplate(templateDir, targetDir);

  // 3. 更新package.json
  const packagePath = path.join(targetDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.name = projectName;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

  // 4. 完成
  console.log(`\n✅ 项目创建成功！`);
  console.log(`\n  cd ${projectName}`);
  console.log('  npm install');
  console.log('  npm run build\n');
  console.log('要在Chrome中加载扩展，请打开chrome://extensions/并加载dist目录');
}

// 复制模板文件的函数
function copyTemplate(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyTemplate(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 执行创建项目
createProject().catch(err => {
  console.error('创建项目时出错:', err);
  process.exit(1);
}); 