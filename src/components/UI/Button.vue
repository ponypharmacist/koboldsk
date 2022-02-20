<template lang="pug">
  .dnd-button(
    :class="componentClasses"
    @click.stop="$emit('click', $event)"
  )
    span.label(v-if="label") {{ label }}
</template>

<script>
export default {
  name: 'dnd-button',

  props: {
    label: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    d20: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    tiny: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    componentClasses() {
      return {
        'is-round': this.round,
        'is-full-width': this.fullWidth,
        'is-small': this.small,
        'is-tiny': this.tiny,
        'no-label': !this.label,
        d20: this.d20,
        disabled: this.disabled,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
$yellow: #ecbe57
$dark: #081414
$bg-transparent: rgba(255,255,255,0.05)

.dnd-button
  position: relative
  display: inline-flex
  justify-content: center
  align-items: center
  height: 32px
  padding: 8px 16px
  font-family: inherit
  border-radius: 4px
  outline: none
  cursor: pointer
  user-select: none

  color: $yellow
  background-color: $bg-transparent
  border: 2px solid $yellow
  transition: .23s

  -webkit-tap-highlight-color:  rgba(255, 255, 255, 0)

  &:hover
    background-color: rgba(255,255,255,0.1)

  &:active
    border-top-width: 1px
    border-bottom-width: 1px

    &::before
      transform: scale(1.025)

  &.is-full-width
    width: 100%

  &.disabled
    opacity: .5
    background-image: none
    pointer-events: none

  .label
    white-space: nowrap

  &.is-round
    width: 32px
    border-radius: 50%
    padding: 0
    text-align: center

  &.is-small
    height: 28px
    background-color: rgba(252, 186, 3, 0.8)
    color: #202020
    border: none
    padding: 6px 6px

  &.is-tiny
    height: 28px
    background-color: rgba(252, 186, 3, 0.8)
    color: #202020
    border: none
    font-size: 14px
    padding: 6px 4px

  &.d20
    padding-left: 36px

    &::before
      position: absolute
      content: ''
      left: -16px
      width: 48px
      height: 48px
      background: transparent url('~@/assets/d20-gold.svg') no-repeat 50% 50% / cover

</style>
