<template>
  <div
    class="cs-option"
    :class="{ 'cs-option--selected': is_selected }"
    @click="toggle_selection"
  >
    {{ option }}
  </div>
</template>

<script>
export default {
  name: "SelectorOption",

  props: {
    option: {
      default: "",
      type: String,
    },
  },

  data() {
    return {
      is_selected: false,
    };
  },

  methods: {
    toggle_selection() {
      if (this.is_selected) {
        this.$emit("deselect", this.option);
      } else {
        this.$emit("select", this.option);
      }
      this.is_selected = !this.is_selected;
    },
  },
};
</script>

<style lang="scss">
.cs-option {
  margin-bottom: 2px;
  padding: 10px;
  border: 1px solid black;

  &--selected {
    border: 1px solid red;
  }
}
</style>