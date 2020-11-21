<template>
  <i
    ref='container'
    @click.prevent="open"
  >
    <transition name='drop-in'>
      <div @click.prevent='close' class='dropdown' v-if='dialogOpen'>
        <div class="dropdown__inner">
          Settings
        </div>
      </div>
    </transition>
  </i>
</template>

<script lang="ts">
import Lottie, { AnimationItem } from 'lottie-web'
import CogAnimation from '@/assets/cogdrop.json'
import { ref, onMounted } from 'vue'

export default {
  setup () {
    const container = ref<HTMLElement>()
    const dialogOpen = ref(false)
    let animation: AnimationItem

    function enter (): void {
      if (!animation || dialogOpen.value) return
      animation.setDirection(1)
      animation.playSegments([0, 60], true)
    }

    function open (): void {
      if (!animation || dialogOpen.value) return
      animation.setDirection(1)
      animation.playSegments([60, 89], true)
      setTimeout(() => { dialogOpen.value = true }, 500)
    }

    function close (e: MouseEvent): void {
      dialogOpen.value = false
      setTimeout(() => {
        animation.setDirection(-1)
        animation.stop()
        animation.playSegments([89, 60], true)
      }, 400)
      e.stopPropagation()
    }

    onMounted(() => {
      animation = Lottie.loadAnimation({
        container: (container.value as HTMLElement),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: CogAnimation
      })
      animation.setSpeed(2)
      animation.goToAndStop(60, true)
    })

    return {
      container,
      enter,
      open,
      close,
      dialogOpen
    }
  }
}
</script>

<style lang="scss" scoped>
i {
  display: inline-block;
  width: 4em;
  position: relative;
}

.dropdown {
  position: absolute;
  top: 3.4em;
  left: 2em;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding-top: 1em;
  width: 140px;
  height: 200px;
  border: 1px solid #50E3C2;
  overflow: hidden;

  &__inner {
    position: relative;
    width: 140px;
    height: 200px;
  }
}

.drop-in {
  &-enter-active,
  &-leave-active {
    opacity: 1;
    transition: width .4s ease-out,
      height .4s ease-out,
      opacity .4s ease-out,
      top .4s ease-out;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    top: 3em;
    width: 0;
    height: 0;
  }
}
</style>
