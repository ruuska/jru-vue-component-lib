<template>
  <div
    class="darkmode-toggle__container"
    @click="toggle"
    ref="container"
    :style="{ 'height': `calc(${size} / 2)`, 'width': size }"
  ></div>
</template>

<script lang="ts">
import Lottie, { AnimationItem, AnimationSegment } from 'lottie-web'
// https://lottiefiles.com/4928-day-n-nite
import toggleAnimationData from '@/assets/day-n-nite.json'
import { onMounted, ref, watch } from 'vue'
import { useDarkmode } from '@/hooks/useDarkmode'

const darkmode = useDarkmode()

export default {
  props: { size: String },
  setup () {
    const container = ref<HTMLElement>()
    let animation: AnimationItem
    let isAnimating = false

    const lightToDark: AnimationSegment = [0, 48]
    const darkToLight: AnimationSegment = [48, 96]

    watch(darkmode.isDark, () => {
      if (!animation) return
      animation.playSegments(darkmode.isDark.value ? lightToDark : darkToLight, true)
    })

    function toggle () {
      if (isAnimating) return
      darkmode.toggle()
      isAnimating = true
    }

    onMounted(() => {
      animation = Lottie.loadAnimation({
        container: (container.value as HTMLElement),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: toggleAnimationData,
        rendererSettings: {
          viewBoxSize: '200 180 100 150'
        }
      })
      animation.addEventListener('complete', () => { isAnimating = false })
      animation.goToAndStop(darkmode.isDark.value ? 48 : 0, true)
    })

    return {
      container,
      toggle
    }
  }
}
</script>

<style lang="scss" scoped>
.darkmode-toggle__container {
  width: 1rem;
  display: inline-block;
}
</style>
