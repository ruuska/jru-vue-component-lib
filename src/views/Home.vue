<template>
  <settings-cog-dropdown
    size="4rem"
    :dropdownStyle="{
      padding: '1em .8em',
    }"
    :dropdownInnerStyle="{
      margin: '0 auto'
    }"
  >
    <ul class="settings-list">
      <li><b>Settings</b></li>
      <li><a href="#">Size</a></li>
      <li><a href="#">Color</a></li>
      <li><darkmode-toggle size="1.6em" /> Darkmode</li>
    </ul>
  </settings-cog-dropdown>

  <darkmode-toggle size="4rem" />

  <progress-button ref="button" :state="buttonState" @click="mockLoad">Click me</progress-button>
</template>

<script lang="ts">
import settingsCogDropdown from '@/components/settings-cog-dropdown.vue' // @ is an alias to /src
import darkmodeToggle from '@/components/darkmode-toggle.vue'
import ProgressButton, { ProgressBtnState } from '@/components/progress-button.vue'
import { ref } from 'vue'

export default {
  components: { settingsCogDropdown, darkmodeToggle, ProgressButton },

  setup () {
    const buttonState = ref<ProgressBtnState>('')

    function mockLoad () {
      buttonState.value = 'loading'
      setTimeout(() => {
        buttonState.value = 'success'
      }, 200)
    }

    return {
      buttonState,
      mockLoad
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-list {
  li {
    line-height: 1.5;
    white-space: nowrap;

    b {
      line-height: 1.8;
    }
  }
}
</style>
