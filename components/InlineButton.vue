<template>
  <div>
    <span :class="classes" class="ss-btn-inline" @click="confirm()">
      <span v-if="!confirmation">{{ text }}</span>
      <span v-else>Are you sure?</span>
      <InlineLoader v-if="loading"/>
    </span>
  </div>
</template>

<script>
import "./icons/circle-loader";
import InlineLoader from "~/components/InlineLoader";
export default {
  components: {
    InlineLoader
  },
  props: {
    text: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Boolean,
      default: true
    },
    classes: {
      type: String,
      default: ""
    },
    action: {
      type: Function,
      default: () => {}
    },
    useConfirmation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      confirmation: false
    };
  },
  methods: {
    confirm() {
      if (!this.valid) {
        return;
      }
      setTimeout(() => {
        this.reset();
      }, 3000);
      if (!this.useConfirmation) {
        this.action();
        return;
      }
      if (this.confirmation) {
        this.action();
        this.confirmation = false;
      } else {
        this.confirmation = true;
      }
    },
    reset() {
      this.confirmation = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
