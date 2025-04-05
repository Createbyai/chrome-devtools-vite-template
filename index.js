/**
 * Chrome DevTools Panel Template
 * 
 * 这个模块提供了一个用于创建Chrome DevTools面板扩展的模板。
 * 使用Vue 3和Vite构建，支持消息通信测试。
 */

export const version = '1.0.2';

/**
 * 创建一个新的Chrome DevTools面板扩展项目
 * 
 * @param {string} projectName - 项目名称
 * @param {Object} options - 配置选项
 * @returns {Promise<void>}
 */
export async function create(projectName, options = {}) {
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);
  
  try {
    await execAsync(`npx chrome-devtools-panel-template ${projectName}`);
    console.log(`成功创建项目: ${projectName}`);
  } catch (error) {
    console.error('创建项目失败:', error.message);
    throw error;
  }
}

/**
 * 获取模板信息
 * 
 * @returns {Object} 模板信息
 */
export function getTemplateInfo() {
  return {
    name: 'chrome-devtools-panel-template',
    version,
    description: 'Vue 3 + Vite template for building Chrome DevTools panel extensions',
    features: [
      'Vue 3 组件系统',
      'Vite构建工具',
      'Chrome DevTools API集成',
      '自动文件监视'
    ],
    author: 'CreateByAi'
  };
} 