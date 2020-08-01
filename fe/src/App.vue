<template>
  <div id="app">
    <div class="parent">
      <div class="div1">
        left Bar Section<br/>
        Name<br/>
        Title<br/>
        * Home<br/>
        * About/CV<br/>
        * Project Diary<br/>
        * Daily Diary<br/>
        * Contact<br/>
        gif img<br/>
      </div>
      <div class="div2">
        right Main Body Section<br/>
        (home)<br/>
        finished projects<br/>
        a / b / c<br/>
        project on progress / daily post (wiggle wiggle)<br/>
        * title / ''<br/>
        # contents / ''<br/>
        * title / ''<br/>
        # contents / ''<br/>
        * title / ''<br/>
        # contents / ''
        Planning projects<br/>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
  .parent {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  .div1 { grid-area: 2 / 1 / 11 / 4; }
  .div2 { grid-area: 1 / 4 / 11 / 11; }
</style>
