<template>
  <i
    ref="container"
    @click="toggle"
    :style="{ 'font-size': size || '1em' }"
  >
    <transition name="drop-in">
      <div
        :style="{...dropdownStyle}"
        class="dropdown"
        :class="alignLeft ? 'left' : 'right'"
        v-if='dialogOpen'
        @click="(e) => { e.stopPropagation() }"
      >
        <div :style="{...dropdownInnerStyle}" class="dropdown__inner">
          <slot></slot>
        </div>
      </div>
    </transition>
  </i>
</template>

<script lang="ts">
import Lottie, { AnimationItem } from 'lottie-web'
// https://lottiefiles.com/2305-settings-icon
import CogAnimation from '@/assets/cogdrop.json'
import { ref, onMounted } from 'vue'

export default {
  props: {
    size: String,
    dropdownStyle: Object,
    dropdownInnerStyle: Object,
    alignLeft: Boolean
  },

  setup () {
    const container = ref<HTMLElement>()
    const dialogOpen = ref(false)
    let animation: AnimationItem

    function enter (): void {
      if (!animation) return
      animation.setDirection(1)
      animation.playSegments([0, 50], true)
    }

    function openCompleteCallback () {
      setTimeout(() => { enter() }, 300)
      animation.removeEventListener('complete', openCompleteCallback)
    }

    function close (): void {
      if (!animation || !dialogOpen.value) return
      dialogOpen.value = false
      setTimeout(() => {
        animation.setDirection(-1)
        animation.playSegments([89, 60], true)
      }, 200)
      document.body.removeEventListener('click', close, false)
    }

    function open (): void {
      if (!animation || dialogOpen.value) return
      animation.setDirection(1)
      animation.playSegments([60, 89], true)
      setTimeout(() => { dialogOpen.value = true }, 420)
      animation.addEventListener('complete', openCompleteCallback)
      document.body.addEventListener('click', close, false)
    }

    function toggle (): void {
      if (!animation) return
      if (dialogOpen.value) {
        close()
      } else {
        open()
      }
    }

    onMounted(() => {
      animation = Lottie.loadAnimation({
        container: (container.value as HTMLElement),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: CogAnimation,
        rendererSettings: {
          viewBoxSize: '160 160 280 280'
        }
      })
      animation.setSpeed(2)
      animation.goToAndStop(60, true)
    })

    return {
      container,
      toggle,
      dialogOpen
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/vars';

i {
  display: inline-block;
  width: 1em;
  height: 1em;
  position: relative;
}

.dropdown {
  position: absolute;
  font-size: 1rem;
  top: 110%;
  box-shadow: 3px 3px 8px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  border: 1px solid $primary-color;
  overflow: hidden;
  width: fit-content;
  height: fit-content;
  background: var(--main-bg-color);
  transition: color .2s ease-out .25s, background .2s ease-out .5s;

  &.right { left: 50%; }
  &.left { right: 50%; }

  &__inner {
    position: relative;
    width: fit-content;
    height: fit-content;
    white-space: nowrap;
  }
}
.darkmode .dropdown {
  background: var(--dark-bg-color);
  color: var(--dark-text-color);
}

.drop-in {
  &-enter-active {
    opacity: 1;
    transition: opacity .2s ease-out, top .2s ease-out;
  }
  &-leave-active {
    opacity: 1;
    transition: opacity .2s ease-in, top .2s ease-in;
  }

  &-enter-from {
    opacity: 0;
    top: 92%;
  }
  &-leave-to {
    opacity: 0;
    top: 100%;
  }
}
</style>
