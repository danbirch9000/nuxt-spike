import axios from "axios";
import { mapState } from "vuex";
import { MAIN_CONFIG } from "~/common/env-config";

export default {
  computed: {
    ...mapState({
      user: state => state.userModule
    })
  },
  created() {
    const config = process.env.isDev
      ? { ...MAIN_CONFIG.dev.firebase }
      : { ...MAIN_CONFIG.prod.firebase };

    axios.defaults.baseURL = config.databaseURL;
    axios.defaults.params = {
      auth: this.user.token
    };

    axios.interceptors.response.use(
      response => response,
      error => {
        const { status } = error.response;
        if (status === 401) {
          setTimeout(() => {
            this.$store.dispatch("LOGOUT");
          }, 1);
        }
      }
    );
  }
};
