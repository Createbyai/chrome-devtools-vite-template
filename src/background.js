// This background script is needed for the extension structure
// but doesn't need to contain any specific functionality for this example 

// 后台脚本 - 处理devtools和content script之间的通信
let connections = {};

// 监听来自devtools的连接
chrome.runtime.onConnect.addListener(function(port) {
  // 检查连接名称以验证来源
  if (port.name !== "devtools-page") {
    return;
  }
  
  // 为每个devtools实例分配一个连接ID
  let connectionId;
  
  // 监听devtools页面的消息
  port.onMessage.addListener(function(message) {
    // 初始化连接
    if (message.name === 'init') {
      connectionId = message.tabId;
      connections[connectionId] = port;
      console.log('DevTools connection established with tab:', connectionId);
      
      // 当连接关闭时清理
      port.onDisconnect.addListener(function() {
        delete connections[connectionId];
        console.log('DevTools connection closed with tab:', connectionId);
      });
    }
  });
});

// 可以添加其他监听器处理来自content scripts或扩展其他部分的消息
// 例如:
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // 处理来自content scripts的消息
    if (sender.tab) {
      const tabId = sender.tab.id;
      if (tabId in connections) {
        // 转发消息到对应的devtools连接
        connections[tabId].postMessage(request);
      }
    }
    return true;
  }
); 