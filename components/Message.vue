<template>
  <div :class="type">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "success"
    }
  }
};
</script>
<style style lang="scss" scoped>
@import "../assets/colors";
@import "../assets/mixins";
div {
  border-width: 1px;
  border-style: solid;
  padding: 8px;
  border-radius: 3px;
  &.success {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
  }
  &.info {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
  }
  &.error {
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
  }
}
</style>
