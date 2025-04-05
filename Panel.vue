<template>
  <div class="container">
    <h1>{{ result }}</h1>
   这个是一个示例组件。它使用了 Vue 3 的组合式 API，包括 ref 和 onMounted 钩子。


  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const result = ref('Loading resources...');
const types = {};

onMounted(() => {

console.log('chrome.devtools.inspectedWindow.getResources')


  if (typeof chrome !== 'undefined' && chrome.devtools) {
    chrome.devtools.inspectedWindow.getResources((resources) => {
      resources.forEach((resource) => {
        if (!(resource.type in types)) {
          types[resource.type] = 0;
        }
        types[resource.type] += 1;
      });
      
      result.value = `Resources on this page: 
      ${Object.entries(types)
        .map((entry) => {
          const [type, count] = entry;
          return `${type}: ${count}`;
        })
        .join('\n')}`;
    });
  } else {
    // For development environment where Chrome API is not available
    result.value = 'Chrome DevTools API not available in development mode';
  }
});
</script>


<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}


</style> 