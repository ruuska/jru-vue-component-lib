<template>
  <header id="page-head">
    <div class="page-wrap">
      <h1>Vue components</h1>
      <div class="header-right">
        <settings-cog-dropdown
          size="3em"
          :dropdown-style="{ padding: '1em' }"
          align-left
        >
          <ul>
            <li><a href="#">Expand all</a></li>
            <li>
              <darkmode-toggle size="1.6em" /> Darkmode
            </li>
          </ul>
        </settings-cog-dropdown>
      </div>
    </div>
  </header>

  <div class="page-wrap">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { isDark } from '@/hooks/useDarkmode'
import { watch } from 'vue'
import settingsCogDropdown from './components/settings-cog-dropdown.vue'
import DarkmodeToggle from './components/darkmode-toggle.vue'

export default {
  components: { settingsCogDropdown, DarkmodeToggle },
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

* {
  box-sizing: border-box;
}

html,
body {
  --main-text-color: #121212;
  --main-bg-color: #fff;
  --main-link-color: #419986;

  --dark-bg-color: #121825;
  --dark-text-color: #fff;
  --dark-link-color: #50E3C2;

  margin: 0;
  padding: 0;
  transition: color .2s ease-out .15s, background .2s ease-out .5s;
  color: var(--main-text-color);
}

body {
  min-height: 100vh;
}

h1, h2, h3, h4, h5 {
  margin: 0;
}

body.darkmode {
  background: var(--dark-bg-color);
  color: var(--main-text-color);

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

.page-wrap {
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 0 1em;
}

#page-head {
  width: 100%;
  height: 300px;
  margin-bottom: 2em;
  background: #490b79 ;
  background: linear-gradient(
    180deg,
    #490b79 0%,
    #95165d 17%,
    #e68165 50%,
    #95165d 83%,
    #490b79 100%
  );
  background-size: 100% 200%;
  background-position: top;
  transition: background-position .4s ease .4s;

  h1 {
    color: rgb(252, 229, 204);
  }

  .page-wrap {
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
  }
}

body.darkmode #page-head {
  background-position: bottom;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  color: var(--main-link-color);
  text-decoration: none;
  transition: color .2s ease-out .4s;
}
.darkmode a {
  color: var(--dark-link-color);
}
</style>
