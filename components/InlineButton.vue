<template>
  <div>
    <span :class="classes" class="ss-btn-inline" @click="action">
      <span>{{ text }}</span>
      <svgicon v-if="loading" name="circle-loader" width="18" height="18" color="currentColor" />
    </span>


  </div>
</template>

<script>
import "./icons/circle-loader";
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: ""
    },
    action: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
