<template>
  <div>
    <span :class="classes" class="ss-btn-inline" @click="action">{{ text }}</span>
    <span v-if="loading">Loading</span>
  </div>
</template>

<script>
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
