import auth0 from "auth0-js";
import axios from "axios";
import firebase from "firebase";
import Cookie from "js-cookie";
import moment from "moment";

let config = {
  isProd: true,
  firebaseMintAPIDev: "http://localhost:1337/",
  firebaseCloudFunctions:
    "https://us-central1-saveswift-2b8ff.cloudfunctions.net/",
  devUrl: "http://localhost:3000/",
  prodUrl: "https://www.saveswift.com/"
};

let _auth0 = new auth0.WebAuth({
  domain: "code82.auth0.com",
  clientID: "rojWMbjsCsCP6pQneYwDyeRima4ylg8X",
  redirectUri: config.isProd
    ? config.prodUrl + "callback"
    : config.devUrl + "callback",
  audience: config.isProd
    ? config.firebaseCloudFunctions
    : config.firebaseMintAPIDev,
  responseType: "token id_token",
  scope: "openid profile"
});
export const authorise = function() {
  _auth0.authorize();
};

export const parseHash = function(store, router) {
  _auth0.parseHash((err, authResult) => {
    if (authResult) {
      axios({
        method: "get",
        baseURL: config.isProd
          ? config.firebaseCloudFunctions + "api"
          : config.firebaseMintAPIDev,
        url: "/auth",
        headers: {
          Authorization: "Bearer " + authResult.accessToken
        }
      }).then(response => {
        firebase
          .auth()
          .signInWithCustomToken(response.data.firebaseToken)
          .then(() => {
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                user.getIdToken().then(idToken => {
                  store.commit("SET_FIREBASE_TOKEN", idToken);
                  store.commit("SET_AUTH_LOADING", false);
                  store.commit("REMOVE_AUTH_ERROR");
                  let userInfo = idToken.split(".");
                  let userDetails = JSON.parse(atob(userInfo[1]));
                  store.commit("SET_USER_ID", userDetails.user_id);
                  const expiry = userDetails.exp;
                  const firebaseTokenExpiry = moment.unix(expiry).format();
                  localStorage.setItem("token", idToken);
                  localStorage.setItem("tokenExpiration", firebaseTokenExpiry);
                  Cookie.set("jwt", response.data.firebaseToken);
                  Cookie.set("expirationDate", firebaseTokenExpiry);
                });
                router.push("/goals");
              }
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  });
  // var result = test.parseHash(window.location.hash);
  // console.log(result);
};
