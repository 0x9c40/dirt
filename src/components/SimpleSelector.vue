<template>
  <div class="ss-options">
    <div class="ss-option__label">SimpleSelector</div>
    <div
      v-for="option in options"
      :key="option"
      class="ss-option"
      :class="{ 'ss-option--selected': selected_options.includes(option) }"
      @click="toggle_selection_for(option)"
    >
      {{ option }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleSelector",

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
    toggle_selection_for(option) {
      if (this.selected_options.includes(option)) {
        this.selected_options = this.selected_options.filter(
          (item) => item !== option
        );
      } else {
        this.selected_options.push(option);
      }
    },
  },
};
</script>

<style lang="scss">
.ss-options {
  margin-bottom: 20px;
}

.ss-option {
  margin-bottom: 2px;
  padding: 10px;
  border: 1px solid black;

  &--selected {
    border: 1px solid lime;
  }
}
</style>