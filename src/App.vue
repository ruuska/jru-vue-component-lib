<template>
  <router-view/>
</template>

<style lang="scss">
@import '@/style/vars';

body {
  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  color: $primary-color;
  text-decoration: none;
}
</style>
