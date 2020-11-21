<template>
  <i
    ref='container'
    @click.prevent="open"
    @click="(e) => { e.stopPropagation() }"
    :style="{ 'font-size': size || '1em' }"
  >
    <transition name='drop-in'>
      <div
        :style="{...dropdownStyle}"
        class='dropdown'
        v-if='dialogOpen'
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
  props: { size: String, dropdownStyle: Object, dropdownInnerStyle: Object },

  setup () {
    const container = ref<HTMLElement>()
    const dialogOpen = ref(false)
    let animation: AnimationItem

    function enter (): void {
      if (!animation || dialogOpen.value) return
      animation.setDirection(1)
      animation.playSegments([0, 60], true)
    }

    function exit (): void {
      dialogOpen.value = false
      setTimeout(() => {
        animation.setDirection(-1)
        animation.stop()
        animation.playSegments([89, 60], true)
      }, 200)
      document.body.removeEventListener('click', exit, false)
    }

    function open (): void {
      if (!animation || dialogOpen.value) return
      animation.setDirection(1)
      animation.playSegments([60, 89], true)
      setTimeout(() => { dialogOpen.value = true }, 420)
      document.body.addEventListener('click', exit, false)
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
      enter,
      open,
      exit,
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
  left: 50%;
  box-shadow: 3px 3px 8px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  border: 1px solid $primary-color;
  overflow: hidden;
  width: fit-content;
  height: fit-content;

  &__inner {
    position: relative;
    width: fit-content;
    height: fit-content;
  }
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
