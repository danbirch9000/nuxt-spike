<template>
  <span :class="classes" class="pill">
    <slot/>
  </span>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/colors";
.pill {
  border-radius: 6px;
  font-size: 0.8em;
  padding: 3px 6px;
  margin: 5px;
  display: inline-block;
}
.click {
  cursor: pointer;
  text-decoration: underline;
}
.grey {
  background-color: $midgrey;
  color: #fff;
}
.blue {
  background-color: $primary;
}
</style>
