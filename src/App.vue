<template>
  <div>
    <SimpleSelector :options="items" />
    <CompoundSelector :options="items" />
  </div>
</template>

<script>
import SimpleSelector from "./components/SimpleSelector.vue";
import CompoundSelector from "./components/CompoundSelector.vue";

export default {
  name: "App",

  components: {
    SimpleSelector,
    CompoundSelector,
  },

  data() {
    return {
      items: ["science", "technology", "engineering", "math"],
    };
  },
};
</script>