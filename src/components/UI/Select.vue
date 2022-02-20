<template lang="pug">
  .dnd-select(
    v-clickaway="onClickAway"
    :class="componentClasses"
    :id="selectId"
  )
    .label(
      v-if="label && (value || value === 0)"
    ) {{ label }}

    // Selected value
    .dnd-select-selected(
      :class="{ active: isActive }"
      @click="showList()"
    )
      template(v-if="isValidValue")
        span.dnd-select-text(
          v-if="!multiselect"
        )
          | {{ selectedText }}

        .chips(v-else)
          .chips-item(
            v-for="(item, index) in selectedText"
            :key="index"
            v-text="item"
            @click.stop="model.splice(index, 1)"
          )

      span.dnd-select-placeholder(
        v-else-if="placeholder"
        v-text="placeholder"
      )

    // List
    ul.dnd-select-list(
      v-if="isActive"
      :class="{ active: isActive, top: top, bottom: bottom }"
    )
      .dnd-select-list__search(
        v-if="list.length > 15 || searchQuery || autocomplete"
        class=""
      )
        dnd-input(
          v-model="searchQuery"
          placeholder="Search the list"
          full-width
          @input="searchQueryInput"
        )

      li.dnd-select-item.disabled(
        v-if="!listData || !listData.length"
      )
        | {{ noDataText }}

      li(
        v-for="(item, index) in listData"
        :key="`select-item-${index}`"
        :class="{ selected: isSelected(item) }"
        class="dnd-select-item"
        @click="onItemClick(item)"
      )
        slot(
          name="option"
          :item="item"
        )
          | {{ item[valueField] || item }}

          dnd-checkbox(
            v-if="multiselect"
            :value="isSelected(item)"
          )
</template>

<script>
import { directive as clickaway } from 'vue-clickaway';
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'dnd-select',

  directives: { clickaway },

  model: {
    prop: 'value',
    event: 'change',
  },

  inheritAttrs: true,

  props: {
    value: {
      type: [Number, String, Object, Array],
      default: null,
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Select from the list',
    },
    noDataText: {
      type: String,
      default: 'List is empty',
    },
    idField: {
      type: String,
      default: null,
    },
    valueField: {
      type: String,
      default: null,
    },

    returnObject: {
      type: Boolean,
      default: false,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },

    multiselect: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    selectId: null,
    isActive: false,
    searchQuery: null,
    top: false,
    bottom: false,
  }),

  created() {
    this.selectId = uniqueId('select');
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

    model: {
      get() {
        return this.value;
      },

      set(newValue) {
        this.$emit('change', newValue);
      },
    },

    listData() {
      if (!this.searchQuery || this.searchQuery === '' || this.autocomplete) return this.list;

      return this.list
        .filter(
          (item) => (item[this.valueField] || item)
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) !== -1,
        );
    },

    selectedText() {
      if (Array.isArray(this.value)) {
        return this.value.map((chip) => {
          if (chip[this.valueField]) return chip[this.valueField];
          if (chip.value) return chip.value;

          const reference = this.list
            .find((item) => item[this.idField] === chip);
          if (reference) return reference[this.valueField];

          return chip || 'Label not found';
        });
      }

      if (typeof this.value === 'object' && this.value !== null) {
        return this.value[this.valueField] || this.value.value;
      }

      const reference = this.list.find((item) => item[this.idField] === this.value);
      if (reference) return reference[this.valueField];

      return this.value;
    },

    isValidValue() {
      if (this.multiselect) return Array.isArray(this.value) && this.value.length;

      return this.value !== null;
    },
  },

  methods: {
    onItemClick(item) {
      const readyValue = this.getSelectedValue(item);

      if (!this.multiselect && this.value === readyValue) {
        // this.model = null;
        return;
      }

      if (this.multiselect && this.value?.includes(readyValue)) {
        const index = this.value.findIndex((i) => i === readyValue);
        const newValue = [...this.value];

        newValue.splice(index, 1);

        this.model = newValue.filter(Boolean);
        return;
      }

      this.model = this.multiselect ? [...(this.value || []), readyValue] : readyValue;

      if (this.closeOnSelect && !this.multiselect) {
        this.onClickAway();
      }
    },

    isSelected(item) {
      if (this.multiselect) {
        return (this.value || []).includes(item[this.idField] || item);
      }

      return this.value === (item[this.idField] || item);
    },

    getSelectedValue(item) {
      if (this.returnObject && typeof item === 'object') return item;

      if (typeof item === 'object') {
        return item[this.idField] || item.id;
      }

      return item;
    },

    searchQueryInput(text) {
      this.searchQuery = text;

      if (this.autocomplete) {
        this.$emit('autocompleteInput', text);
      }
    },

    showList() {
      this.isActive = !this.isActive;

      if (this.isActive === true) {
        this.getPosition();
      }

      this.$emit('showList');
    },

    getPosition() {
      // eslint-disable-next-line consistent-return
      this.$nextTick(() => {
        const el = document.getElementById(this.selectId);
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (windowHeight - rect.bottom < 290) {
          this.bottom = false;
          this.top = true;
        } else {
          this.top = false;
          this.bottom = true;
        }
      });
    },

    onClickAway() {
      this.isActive = false;
      this.searchQuery = null;
    },
  },
};
</script>

<style lang="sass" scoped>
$base-height: 28px
$yellow: #ecbe57
$bg-transparent: rgba(255,255,255,0.1)
$text-transparent: rgba(255,255,255,0.55)

$gray-blue-border: #E0E8F0
$light-gray: #F0F4FB
$blue: #3F6ADA
$icon-arrow: url('~@/assets/select-arrow.svg') no-repeat 0 0 / 100% 100%

.dnd-select
  position: relative
  width: auto
  min-height: $base-height
  min-width: 60px
  user-select: none
  color: #333

  .label
    position: absolute
    top: -10px
    left: 5px
    font-size: 10px
    font-weight: 200
    color: $yellow
    z-index: 1

  .dnd-select-item,
  .dnd-select-selected
    position: relative
    display: flex
    align-items: center
    width: 100%
    min-height: $base-height
    background-color: white
    padding: 0 6px
    cursor: pointer

    .dnd-checkbox
      margin-left: auto

  .dnd-select-placeholder
    font-weight: 300
    color: #9F9F9F
    white-space: nowrap

  .dnd-select-selected
    overflow: hidden
    font-size: inherit
    white-space: nowrap
    color: #fff
    border-radius: 3px
    border-width: 0 0 1px 0
    border-style: solid
    border-color: $yellow
    background-color: $bg-transparent

    &::after
      content: ""
      -webkit-mask: $icon-arrow
      mask: $icon-arrow
      background-color: $yellow
      width: 6px
      height: 11px
      position: absolute
      transform: translate(-50%, -50%) rotate(90deg)
      top: 50%
      right: 8px
      transition: 0.3s

    &.active
      border-radius: 2px 2px 0 0

      &::after
        transform: translate(-50%, -50%) rotate(270deg)
        transition: 0.3s

  &.is-disabled
    opacity: .7
    pointer-events: none

    .dnd-select-selected
      &::after
        background-color: #999

  .dnd-select-item
    &:hover
      background-color: $gray-blue-border

    &.selected
      background-color: transparentize(#b2b8c4, .9)
      color: $blue

      &:hover
        background-color: transparentize(#b2b8c4, .7)

    &.disabled
      pointer-events: none
      color: #9F9F9F

  // List
  $max-list-height: 280

  .dnd-select-list
    position: absolute
    width: 100%
    padding: 0
    margin: 0
    box-sizing: border-box
    background-color: white
    border: 1px solid $gray-blue-border
    box-shadow: 0 2px 2px rgba(100,100,100, 0.15)
    max-height: #{$max-list-height}px
    overflow-x: hidden
    overflow-y: scroll
    border-radius: 0 0 0 2px
    pointer-events: none
    visibility: hidden
    opacity: 0
    z-index: 2

    &.top
      top: unset
      bottom: 100%
      box-shadow: 0 -1px 2px rgba(100,100,100, 0.15)

    &.bottom
      top: 100%
      bottom: unset

    &.active
      visibility: visible
      opacity: 1
      pointer-events: auto

    &::-webkit-scrollbar
      -webkit-appearance: none
      height: 4px
      width: 4px
      cursor: pointer

    &::-webkit-scrollbar-track
      -webkit-box-shadow: inset 0 0 4px #f7f7f7
      box-shadow: inset 0 0 4px #f7f7f7

    &::-webkit-scrollbar-thumb
      background-color: $gray-blue-border
      border-radius: 2px
      outline: none
      background-clip: border-box
      cursor: pointer

  .dnd-select-text
    display: block
    max-width: 100%
    overflow: hidden
    text-overflow: ellipsis

  /* todo add chips for all sizes */
  .chips
    padding: 4px 20px 4px 0
    display: flex
    flex-wrap: wrap
    margin-top: -4px

    .chips-item
      font-size: 11px
      border: 1px solid $gray-blue-border
      padding: 4px
      background-color: white
      border-radius: 3px
      margin-top: 4px
      margin-right: 4px

  .dnd-select-list__search
    padding: 8px

::v-deep .dnd-select-list__search
  input
    color: #333

    &::placeholder
      color: #999
</style>
