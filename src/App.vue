<template>
  <component :is="layout">
    <router-view :layout.sync="layout"></router-view>
  </component>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      layout: `div`
    };
  },
  created(){
    
  }
};
</script>
