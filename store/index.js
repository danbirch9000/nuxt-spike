import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      userData: null,
      goals: [],
      goalView: {
        description: '',
        rate: '',
        amount: '',
        monthly: '',
        years: '',
        startDate: ''
      },
      token: null,
      userId: null,
      firebase: null
    },
    mutations: {
      setUserData: (state, payload) => {
        state.userData = payload
      },
      setData: (state, payload) => {
        state.firebase = payload
      },
      saveGoal: (state, payload) => {
        state.goals.push(payload);
      },
      setCurrentGoalView: (state, payload) => {
        state.goalView = payload;
      },
      setToken(state, token) {
        state.token = token;
      },
      setUserId(state, id){
        state.userId = id;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      getUserData(vuexContext, context){
        return axios.get(`http://localhost:3000/assets/assets/mockjson/sample.json`)
        .then(data => {
          vuexContext.commit("setUserData", data.data);
        });
      },
      getData(vuexContext, context){
        return axios.get(`https://vuejs-83403.firebaseio.com/test.json?auth=` + vuexContext.state.token)
        .then(data => {
          vuexContext.commit("setData", data.data);
        });
      },
      saveGoal(vuexContext, context){
        vuexContext.commit("saveGoal", context);
      },
      authenticateUser(vuexContext, authData) {
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
            vuexContext.commit("setToken", result.idToken);

            let userInfo = result.idToken.split('.');

            let userDetails = JSON.parse(atob(userInfo[1]));


            vuexContext.commit("setUserId", userDetails.user_id);
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
      initAuth(vuexContext, req) {
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
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      getCurrentViewChartData: (state) => {
        return {
          rate: state.goalView.rate,
          amount: state.goalView.amount,
          monthly: state.goalView.monthly,
          years: state.goalView.years,
          startDate: state.goalView.startDate
        }
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  })
}

export default createStore
