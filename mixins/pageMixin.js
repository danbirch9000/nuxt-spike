import axios from "axios";
import { urls } from "~/config/constants";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.userModule
    })
  },
  created() {
    axios.defaults.baseURL = urls.apiBaseUrl;
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
