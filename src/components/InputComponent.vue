<template>
  <div>
    <input :value="value" @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: "InputComponent",

  props: {
    value: {
      default: "",
      type: String,
    },
  },
};
</script>