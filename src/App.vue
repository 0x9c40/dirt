<template>
  <div>
    <InputComponentWrapper v-model="msg" />
  </div>
</template>

<script>
import InputComponentWrapper from "./components/InputComponentWrapper.vue";

export default {
  name: "App",

  components: {
    InputComponentWrapper,
  },

  data() {
    return {
      msg: "",
    };
  },
};
</script>

<style lang="scss">
</style>
