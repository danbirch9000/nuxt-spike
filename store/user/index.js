import moment from "moment";

export default {
  state: {
    userData: null,
    token: null,
    userId: null,
    error: false,
    loading: false,
    authenticated: false,
    tokens: null
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
    },
    SET_TOKENS(state, payload) {
      state.tokens = payload;
    }
  },
  actions: {
    IS_AUTHENTICATED({ commit }) {
      console.log("IS_AUTHENTICATED called");
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
      console.log("IS_AUTHENTICATED end");
    },
    INIT_AUTH(vuexContext, req) { //eslint-disable-line
      console.log("INIT_AUTH called");
      const tokens = {
        firebaseTokenExpiry: sessionStorage.getItem("firebaseTokenExpiry"),
        auth0TokenExpiry: sessionStorage.getItem("auth0TokenExpiry"),
        token: sessionStorage.getItem("token"),
        access_token: sessionStorage.getItem("access_token"),
        id_token: sessionStorage.getItem("id_token")
      };

      if (
        moment().isAfter() > moment(tokens.firebaseTokenExpiry) ||
        !tokens.token
      ) {
        vuexContext.dispatch("LOGOUT");
        return;
      }

      let userInfo = tokens.token.split(".");
      let userDetails = JSON.parse(atob(userInfo[1]));
      vuexContext.commit("SET_USER_ID", userDetails.user_id);
      vuexContext.commit("SET_FIREBASE_TOKEN", tokens.token);
      vuexContext.commit("SET_TOKENS", tokens.token);
      console.log("INIT_AUTH end");
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
