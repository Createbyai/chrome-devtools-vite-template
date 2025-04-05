#!/usr/bin/env node

/**
 * 同步脚本 - 将源文件更新到template目录
 * 用法: node sync-template.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// 获取当前目录
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 定义源文件路径和目标路径
const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'template');
const TEMPLATE_SRC_DIR = path.join(TEMPLATE_DIR, 'src');

// 确保目标目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`创建目录: ${dir}`);
  }
}

// 复制文件
function copyFile(src, dest) {
  try {
    fs.copyFileSync(src, dest);
    console.log(`复制文件: ${src} -> ${dest}`);
  } catch (error) {
    console.error(`复制失败: ${src} -> ${dest}`);
    console.error(error);
  }
}

// 递归复制目录
function copyDir(src, dest) {
  ensureDir(dest);
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// 执行同步
function syncTemplate() {
  console.log('开始同步源文件到template目录...');
  
  // 1. 同步src目录
  ensureDir(TEMPLATE_SRC_DIR);
  copyDir(SRC_DIR, TEMPLATE_SRC_DIR);
  
  // 2. 同步根目录关键文件
  const rootFiles = ['panel.html', 'panel.js', 'Panel.vue', 'vite.config.js'];
  
  for (const file of rootFiles) {
    const src = path.join(ROOT_DIR, file);
    const dest = path.join(TEMPLATE_DIR, file);
    
    if (fs.existsSync(src)) {
      copyFile(src, dest);
    } else {
      console.warn(`警告: 源文件不存在 ${src}`);
    }
  }
  
  // 3. 确保template/package.json最新
  const templatePackageJson = path.join(TEMPLATE_DIR, 'package.json');
  
  if (!fs.existsSync(templatePackageJson)) {
    // 如果模板package.json不存在，基于当前package.json创建一个简化版本
    const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
    
    // 创建一个简化版本
    const templatePkg = {
      name: 'chrome-devtools-panel',
      private: true,
      version: '1.0.3',
      type: 'module',
      scripts: packageJson.scripts,
      dependencies: packageJson.dependencies,
      devDependencies: packageJson.devDependencies
    };
    
    fs.writeFileSync(templatePackageJson, JSON.stringify(templatePkg, null, 2));
    console.log(`创建文件: ${templatePackageJson}`);
  }
  
  console.log('同步完成!');
  
  // 4. 提示NPM发布相关信息
  const currentVersion = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8')).version;
  console.log('\n要发布更新的NPM包，请执行:');
  console.log(`npm version patch  # 当前版本 ${currentVersion}`);
  console.log('npm publish');
}

// 执行同步
syncTemplate(); 