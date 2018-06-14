<template>
  <div>
    <transition name="fade">
      <div v-if="show" class="off-canvas">
        <header>
          <h3>{{ offCanvas.title }}</h3>
          <button v-if="isClosable" class="close" @click="close" >
            <svgicon name="close" width="20" height="20" color="currentColor" />
          </button>
        </header>
        <component :is="offCanvas.component" />
        <Message v-if="showMessage && closableMessage" class="message">{{ closableMessage }}</Message>
      </div>
    </transition>
    <div v-if="show" class="overlay" @click="close" />
  </div>
</template>

<script>
import "~/components/icons/cancel";

import Message from "~/components/global/Message";
import { stopPageScroll, allowPageScroll } from "~/config/utilities";
import { hotkeys } from "~/config/constants";
import { inputIsFocused } from "~/config/utilities";
import { mapState } from "vuex";

export default {
  components: {
    Message
  },
  data() {
    return {
      showMessage: false
    };
  },
  computed: {
    ...mapState({
      offCanvas: state => state.appModule.offCanvas,
      show: state => state.appModule.offCanvas.show,
      isClosable: state => state.appModule.offCanvas.isClosable,
      closableMessage: state => state.appModule.offCanvas.closableMessage
    })
  },
  watch: {
    show() {
      if (this.show) {
        stopPageScroll();
      } else {
        allowPageScroll();
      }
    }
  },
  mounted() {
    window.addEventListener("keyup", this.escapeEvent);
  },
  destroyed() {
    window.removeEventListener("keyup", this.escapeEvent);
  },
  methods: {
    escapeEvent(e) {
      if (inputIsFocused()) {
        return;
      }
      if (e.keyCode === hotkeys.key_escape && this.show) {
        this.close();
      }
    },
    close() {
      if (!this.isClosable) {
        this.showMessage = true;
        return;
      }

      this.showMessage = false;
      this.$store.commit("CLOSE_OFF_CANVAS");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/colors.scss";
@import "../../assets/scss/variables.scss";

$off-canvas-size: 450px;

.off-canvas {
  width: $off-canvas-size;
  background: $wfp-white;
  padding: $spacer * 2;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 3;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: center;
  margin-bottom: $spacer * 2;
}

h3 {
  flex: 1 1 0;
  margin: 0;
  padding: 0;
  line-height: 1;
  padding-right: $spacer * 2;
}

.close {
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.4;
  }
}

.fade-enter-active {
  transition: right 0.6s, opacity 0.7s;
}
.fade-leave-active {
  transition: right 0.2s, opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  right: -$off-canvas-size;
  opacity: 0;
}

.overlay {
  position: fixed;
  background: rgba($wfp-blue, 0.8);
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
}

.message {
  margin-top: $spacer;
}
</style>
