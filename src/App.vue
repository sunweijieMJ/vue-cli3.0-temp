<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
  @import '../src/assets/scss/_reset.scss';
  @import '../src/assets/scss/component/_element.scss';

  html, body, #app {
    background-color: $backcolor;
  }
</style>
