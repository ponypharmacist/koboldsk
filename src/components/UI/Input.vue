<template lang="pug">
  .dnd-input(
    :class="componentClasses"
    @click="$emit('click', $event)"
  )
    .label(
      v-if="label && (value || value === 0)"
    ) {{ label }}

    input(
      ref="input"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled || readonly"
      autocomplete="off"
      @change="onChange"
      @input="onInput"
      @focus="onFocus"
      @focusin="isFocused = true"
      @focusout="isFocused = false"
    )
</template>

<script>
export default {
  name: 'dnd-input',

  model: {
    prop: 'value',
    event: 'input',
  },

  inheritAttrs: true,

  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    centered: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    componentClasses() {
      return [
        {
          'is-centered': this.centered,
          'is-focused': this.isFocused,
          'is-disabled': this.disabled,
        },
      ];
    },
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },

    onChange(event) {
      this.$emit('change', event.target.value);
    },

    onFocus(event) {
      this.$emit('focus', event.target.value);
    },
  },
};
</script>

<style lang="sass" scoped>
$base-height: 28px
$yellow: #ecbe57
$bg-transparent: rgba(255,255,255,0.1)
$text-transparent: rgba(255,255,255,0.55)

.dnd-input
  position: relative
  height: $base-height

  input
    width: 100%
    height: $base-height
    padding: 2px 6px
    color: #fff
    background-color: $bg-transparent
    border-radius: 3px
    border-width: 0 0 1px 0
    border-style: solid
    border-color: $yellow
    font-size: inherit
    font-family: inherit

    &::placeholder
      color: $text-transparent

  .label
    position: absolute
    top: -10px
    left: 5px
    font-size: 10px
    font-weight: 200
    z-index: 1

  &.input-gold
    input
      padding-left: 28px

    &::before
      position: absolute
      content: ''
      top: 4px
      left: 2px
      width: 20px
      height: 20px
      background: transparent url('~@/assets/coin-gold.svg') no-repeat 0 50% / 20px 20px
      z-index: 1

  &.is-centered
    input
      text-align: center
</style>
