<template>
  <router-view/>
</template>

<script lang="ts">
import { isDark } from '@/hooks/useDarkmode'
import { watch } from 'vue'

export default {
  setup () {
    watch(isDark, () => {
      if (isDark.value && !document.body.classList.contains('darkmode')) {
        document.body.classList.add('darkmode')
      } else if (!isDark.value && document.body.classList.contains('darkmode')) {
        document.body.classList.remove('darkmode')
      }
    })
  }
}
</script>

<style lang="scss">
@import '@/style/vars';

* { box-sizing: border-box; }

html,
body {
  margin: 0;
  padding: 0;
  transition: color .2s ease-out .15s, background .2s ease-out .5s;
  color: #121212;
}

body {
  --main-text-color: #121212;
  --main-bg-color: #fff;
  --main-link-color: #419986;
  --dark-bg-color: #121825;
  --dark-text-color: #fff;
  --dark-link-color: #50E3C2;

  --border-radius: 6px;

  min-height: 100vh;
}

body.darkmode {
  background: #121825;
  color: #fff;

  img {
    filter: brightness(.8) contrast(1.2);
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
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
