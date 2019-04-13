<template>
  <span>
    <svgicon :width="width" :height="height" name="circle-loader" color="currentColor" />
  </span>
</template>

<script>
import "./icons/circle-loader";
export default {
  props: {
    width: {
      type: String,
      default: "18"
    },
    height: {
      type: String,
      default: "18"
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
