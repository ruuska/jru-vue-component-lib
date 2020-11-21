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
    </ul>
  </settings-cog-dropdown>
</template>

<script lang="ts">
import settingsCogDropdown from '@/components/settings-cog-dropdown.vue' // @ is an alias to /src

export default {
  components: { settingsCogDropdown }
}
</script>

<style lang="scss" scoped>
.settings-list {
  li {
    line-height: 1.5;

    b {
      line-height: 1.8;
    }
  }
}
</style>
