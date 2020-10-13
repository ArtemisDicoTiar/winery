<template>
  <div id="app">
    <router-view/>


  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine"; // Import the theme engine

  .app {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;
  }

  @include md-register-theme("default", (
          primary: #3fffbe, // The primary color of your brand
          accent: #8e11e8 // The secondary color of your brand
  ));

  @import "~vue-material/dist/theme/all"; // Apply the theme
</style>
