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
</template>

<script lang="ts">
import settingsCogDropdown from '@/components/settings-cog-dropdown.vue' // @ is an alias to /src
import darkmodeToggle from '@/components/darkmode-toggle.vue'

export default {
  components: { settingsCogDropdown, darkmodeToggle }
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
