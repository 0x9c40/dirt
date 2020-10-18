<template>
  <InputComponent :value="value" @input="$emit('input', $event)" />
</template>

<script>
import InputComponent from "./InputComponent.vue";

export default {
  name: "InputComponentWrapper",

  components: {
    InputComponent,
  },

  props: {
    value: {
      default: "",
      type: String,
    },
  },
};
</script>