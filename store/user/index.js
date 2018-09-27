import moment from "moment";

export default {
  state: {
    userData: null,
    token: null,
    userId: null,
    error: false,
    loading: false,
    authenticated: false
  },
  mutations: {
    SET_FIREBASE_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_ID(state, id) {
      state.userId = id;
    },
    CLEAR_TOKEN(state) {
      state.token = null;
    },
    SET_ERROR(state) {
      state.error = true;
    },
    REMOVE_AUTH_ERROR(state) {
      state.error = false;
    },
    SET_AUTH_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_AUTHENTICATED(state, authenticated) {
      state.authenticated = authenticated;
    }
  },
  actions: {
    IS_AUTHENTICATED({ commit }) {
      const idToken = sessionStorage.getItem("id_token");
      let authenticated = false;
      if (idToken !== null) {
        const now = Math.floor(new Date().getTime() / 1000);
        const idTokenUserDetails = idToken.split(".")[1];
        const userDetails = atob(
          idTokenUserDetails.replace(/_/g, "/").replace(/-/g, "+")
        );
        authenticated = now < JSON.parse(userDetails).exp;
      }
      commit("SET_AUTHENTICATED", authenticated);
    },
    INIT_AUTH(vuexContext, req) { //eslint-disable-line
      let token;
      let expirationDate;
      token = sessionStorage.getItem("token");
      expirationDate = sessionStorage.getItem("firebaseTokenExpiry");
      if (moment().isAfter() > moment(expirationDate) || !token) {
        vuexContext.dispatch("LOGOUT");
        return;
      }

      let userInfo = token.split(".");
      let userDetails = JSON.parse(atob(userInfo[1]));
      vuexContext.commit("SET_USER_ID", userDetails.user_id);
      vuexContext.commit("SET_FIREBASE_TOKEN", token);
    },
    LOGOUT(vuexContext) {
      vuexContext.commit("CLEAR_TOKEN");
      vuexContext.commit("RESET_CURRENT_GOAL_VIEW");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("firebaseTokenExpiry");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("id_token");
      sessionStorage.removeItem("auth0TokenExpiry");
      this.$router.push("/");
    }
  },
  getters: {
    IS_AUTHENTICATED(state) {
      return state.token != null;
    }
  }
};
