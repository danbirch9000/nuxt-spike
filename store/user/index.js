import Vuex from 'vuex'
import axios from 'axios'
import Cookie from "js-cookie";

export default {
  state: {
    userData: null,
    token: null,
    userId: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_ID(state, id){
      state.userId = id;
    },
    CLEAR_TOKEN(state) {
      state.token = null;
    }
  },
  actions: {
    AUTHENTICATE_USER(vuexContext, authData) {
      let authUrl =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
        process.env.fbAPIKey;
      if (!authData.isLogin) {
        authUrl =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
          process.env.fbAPIKey;
      }
      return this.$axios
        .$post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(result => {
          vuexContext.commit("SET_TOKEN", result.idToken);
          let userInfo = result.idToken.split('.');
          let userDetails = JSON.parse(atob(userInfo[1]));
          vuexContext.commit("SET_USER_ID", userDetails.user_id);
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
        .catch(e => console.log(e));
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
        token = jwtCookie.split("=")[1];
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

      if (new Date().getTime() > +expirationDate || !token) {
        console.log("No token or invalid token");
        vuexContext.dispatch("LOGOUT");
        return;
      }

      let userInfo = token.split('.');
      let userDetails = JSON.parse(atob(userInfo[1]));
      vuexContext.commit("SET_USER_ID", userDetails.user_id);
      vuexContext.commit("SET_TOKEN", token);
    },
    LOGOUT(vuexContext) {
      vuexContext.commit("CLEAR_TOKEN");
      Cookie.remove("jwt");
      Cookie.remove("expirationDate");
      if (process.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      }
    }
  },
  getters: {
    IS_AUTHENTICATED(state) {
      return state.token != null;
    }
  }
};
