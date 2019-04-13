<template>
  <div class="ss-panel">
    <h3>{{ goalData.description }}</h3>
  </div>
</template>

<script>
import InlineButton from "~/components/InlineButton.vue";
import ApexChart from "~/components/ApexChart";

export default {
  components: {
    InlineButton,
    ApexChart
  },
  props: {
    goalData: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
</style>
