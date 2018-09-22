import Cookie from "js-cookie";
import axios from "axios";
import moment from "moment";

export default {
  state: {
    userData: null,
    token: null,
    userId: null,
    error: false,
    loading: false
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
    }
  },
  actions: {
    AUTHENTICATE_USER({ commit }, authData) {
      let authUrl =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
        process.env.fbAPIKey;
      if (!authData.isLogin) {
        authUrl =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
          process.env.fbAPIKey;
      }
      commit("SET_AUTH_LOADING", true);
      return axios
        .post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(response => {
          let result = response.data;
          commit("SET_AUTH_LOADING", false);
          commit("SET_FIREBASE_TOKEN", result.idToken);
          commit("REMOVE_AUTH_ERROR");

          let userInfo = result.idToken.split(".");
          let userDetails = JSON.parse(atob(userInfo[1]));
          commit("SET_USER_ID", userDetails.user_id);
          localStorage.setItem("token", result.idToken);
          localStorage.setItem(
            "tokenExpiration",
            new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
          );
          Cookie.set("jwt", result.idToken);
          Cookie.set(
            "expirationDate",
            new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
          );
        })
        .catch(() => {
          commit("SET_AUTH_LOADING", false);
          commit("SET_ERROR");
        });
    },
    INIT_AUTH(vuexContext, req) {
      let token;
      let expirationDate;
      if (req) {
        if (!req.headers.cookie) {
          return;
        }
        const jwtCookie = req.headers.cookie
          .split(";")
          .find(c => c.trim().startsWith("jwt="));
        if (!jwtCookie) {
          return;
        }
        token = jwtCookie.splitgetFinancialData("=")[1];
        expirationDate = req.headers.cookie
          .split(";")
          .find(c => c.trim().startsWith("expirationDate="))
          .split("=")[1];
      } else {
        token = localStorage.getItem("token");
        expirationDate = localStorage.getItem("tokenExpiration");
      }

      token = localStorage.getItem("token");
      expirationDate = localStorage.getItem("tokenExpiration");
      if (moment().format() > moment(expirationDate) || !token) {
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
      Cookie.remove("jwt");
      Cookie.remove("expirationDate");
      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      }
      this.$router.push("/");
    }
  },
  getters: {
    IS_AUTHENTICATED(state) {
      return state.token != null;
    }
  }
};
