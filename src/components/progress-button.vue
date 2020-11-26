<template>
  <button class="progress-button" :class="stateClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { ref, watch } from 'vue'

export type ProgressBtnState = '' | 'loading' | 'success' | 'fail';

export default {
  props: { state: String },

  setup (props: { state: ProgressBtnState }) {
    const stateClass = ref('')

    watch(
      () => props.state,
      () => {
        const classList: string[] = []

        if (props.state === '') {
          stateClass.value = ''
          return
        }

        classList.push('progress-button__loading')

        if (props.state === 'success' || props.state === 'fail') {
          classList.push('progress-button__loading--' + props.state)
          setTimeout(() => { stateClass.value = '' }, 500)
        }

        stateClass.value = classList.join(' ')
      }
    )

    return {
      stateClass
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-button {
  border: 0;
  padding: .6em 1.8em;
  background: var(--dark-link-color);
  position: relative;
  border-radius: var(--border-radius);
  transition: transform .4s ease-out, color .4s;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    width: 0;
    background: var(--main-link-color);
    border-radius: var(--border-radius);
  }

  &__loading {
    transform: scaleY(25%);
    color: transparent;
    transition: transform .4s ease-out, color .4s;

    &::before {
      width: 90%;
      transition: width 3s ease-in-out;
    }

    &--success,
    &--fail {
      transition-delay: 1.2s;

      &::before {
        width: 100%;
        transition: width .2s ease-out;
      }
    }
  }
}
</style>
