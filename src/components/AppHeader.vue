<template>
  <header>
    <h1>GraphCMS Starter blog</h1>
    <nav>
      <router-link exact to="/" class="link">Home</router-link>
      <router-link to="/about" class="link">About</router-link>
    </nav>
  </header>
</template>
​
<script>
  export default {
    name: 'AppHeader'
  }
</script>

<style>
  #app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
  }
  main {
    max-width: 650px;
    margin: 32px auto;
    padding: 0 24px;
  }
  a {
    color: deepskyblue;
    text-decoration: none;
  }
  article {
    margin: 0 auto;
    max-width: 650px;
  }
</style>
