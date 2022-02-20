<template lang="pug">
  .dnd-checkbox(
    :class="componentClasses"
    @click="() => !disabled && (checked = !checked)"
  )
    .checkbox(
      :class="{ 'checked': checked }"
      :style="checkboxStyle"
    )

    label(v-if="label")
      | {{ label }}
</template>

<script>
export default {
  name: 'dnd-checkbox',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    partial: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    labelLeft: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#ecbe57',
    },
  },

  computed: {
    componentClasses() {
      return {
        partial: this.partial,
        disabled: this.disabled,
        'label-left': this.labelLeft,
        'full-width': this.fullWidth,
        rounded: this.rounded,
      };
    },

    checkboxStyle() {
      if (this.checked) {
        return {
          backgroundColor: this.color,
          borderColor: this.color,
          borderRadius: this.rounded ? '50%' : '2px',
        };
      }

      return {
        borderRadius: this.rounded ? '50%' : '2px',
      };
    },

    checked: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
$base-height: 28px
$yellow: #ecbe57
$bg-transparent: rgba(255,255,255,0.1)
$text-transparent: rgba(255,255,255,0.55)

$icon-check: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjYiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMjAiIHN0cm9rZS13aWR0aD0iMS44IiBkPSJNMSAyLjEyNnYwTDIuOTg1IDQuMjR2MEw2LjI3MyAxdjAiLz48L3N2Zz4=") no-repeat 50% 60% / 12px 9px

.dnd-checkbox
  position: relative
  display: inline-flex
  align-items: center
  height: $base-height
  min-width: 16px
  line-height: 20px
  margin-left: 1px
  cursor: pointer
  user-select: none

  label
    line-height: 16px
    margin-left: 6px
    cursor: pointer
    transition: color 0.2s linear

  .checkbox
    width: 16px
    height: 16px
    outline: none
    background-color: $bg-transparent
    border: 1px solid $yellow
    border-radius: 2px
    box-sizing: border-box
    transition: border-color 0.2s linear

    &::before
      position: absolute
      content: ''
      height: 14px
      width: 14px

    &.checked
      &::before
        -webkit-mask: $icon-check
        mask: $icon-check
        background-color: #333

  &:hover .checkbox
    border-color: $yellow

  &.label-left
    label
      order: 1
      margin: 0 6px 0 0

    .checkbox
      order: 2

  &.full-width
    width: 100%

    label
      margin-left: auto

    &.label-left
      label
        margin: 0 auto 0 0

  &.partial
    .checkbox
      border-color: #d4dce6
      background-color: #ebf2f7

      &:before
        -webkit-mask: $icon-check
        mask: $icon-check
        background-color: #333

      &:hover
        border-color: $yellow

  &.disabled
    color: #999
    cursor: default
    cursor: default

    .checkbox
      background-image: none
      border-color: #d4dce6

      &.checked
        background-color: #B1BBCB

    label
      cursor: default

    &:hover .checkbox::before
      border-color: #ccc

</style>
