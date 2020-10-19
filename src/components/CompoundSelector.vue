<template>
  <div class="cs-options">
    <div class="cs-options__label">CompoundSelector</div>
    <SelectorOption
      v-for="option in options"
      :key="option"
      :option="option"
      class="cs-options__option"
      @deselect="deselect"
      @select="select"
    />
  </div>
</template>

<script>
import SelectorOption from "./SelectorOption.vue";

export default {
  name: "CompoundSelector",

  components: {
    SelectorOption,
  },

  props: {
    options: {
      default: () => [],
      type: Array,
    },
  },

  data() {
    return {
      selected_options: [],
    };
  },

  methods: {
    deselect(option) {
      this.selected_options = this.selected_options.filter(
        (item) => item !== option
      );
    },
    select(option) {
      this.selected_options.push(option);
    },
  },
};
</script>