<template lang="pug">
  .dnd-textarea(
    :class="componentClasses"
    @click="$emit('click', $event)"
  )
    .label(
      v-if="label && (value || value === 0)"
    ) {{ label }}

    textarea(
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled || readonly"
      :rows="rows"
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
  name: 'dnd-textarea',

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
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 3,
    },
  },

  computed: {
    componentClasses() {
      return [
        {
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
$yellow: #ecbe57
$bg-transparent: rgba(255,255,255,0.1)
$text-transparent: rgba(255,255,255,0.55)

.dnd-textarea
  position: relative
  padding: 2px 6px
  background-color: $bg-transparent
  border-radius: 3px
  border-width: 0 0 1px 0
  border-style: solid
  border-color: $yellow

  textarea
    width: 100%
    height: 100%
    color: #fff
    font-size: inherit
    font-family: inherit
    outline: none
    background-color: transparent
    border: none
    resize: vertical

    &::placeholder
      color: $text-transparent

  .label
    position: absolute
    top: -10px
    left: 5px
    font-size: 10px
    font-weight: 200
    z-index: 1
</style>
