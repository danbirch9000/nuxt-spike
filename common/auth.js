import auth0 from "auth0-js";
import axios from "axios";
import firebase from "firebase";
import moment from "moment";
import { clearAuth0LocalStorage } from "~/common/common";
import { MAIN_CONFIG } from "~/common/env-config";

let siteSettings = process.env.isDev
  ? { ...MAIN_CONFIG.dev }
  : { ...MAIN_CONFIG.prod };

let _auth0 = new auth0.WebAuth({
  domain: siteSettings.auth0Domain,
  clientID: siteSettings.auth0ClientID,
  redirectUri: siteSettings.siteURL + "callback",
  audience: siteSettings.audience,
  responseType: "token id_token",
  scope: "openid profile"
});

export const parseHash = function(store, router) {
  _auth0.parseHash((err, authResult) => {
    setSessionStorage(authResult);
    clearAuth0LocalStorage();
    if (authResult) {
      axios({
        method: "get",
        baseURL: siteSettings.firebaseToken,
        url: "/auth",
        headers: {
          Authorization: "Bearer " + authResult.accessToken
        }
      }).then(response => {
        firebase
          .auth()
          .signInWithCustomToken(response.data.firebaseToken)
          .then(() => {
            firebase.auth().onAuthStateChanged(user => {
              handleFirebaseResponse(user, store, router);
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  });
};

const handleFirebaseResponse = (user, store, router) => {
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
      sessionStorage.setItem("token", idToken);
      sessionStorage.setItem("firebaseTokenExpiry", firebaseTokenExpiry); //eslint-disable-line
    });
    router.push("/goals");
  }
};

export const authorise = function() {
  _auth0.authorize();
};

const setSessionStorage = authResult => {
  sessionStorage.setItem("id_token", authResult.idToken);
  sessionStorage.setItem("access_token", authResult.accessToken);
  const auth0IdToken = authResult.idToken.replace(/_/g, "/").replace(/-/g, "+");
  const auth0IdTokenDetails = auth0IdToken.split(".");
  const auth0TokenInfo = JSON.parse(atob(auth0IdTokenDetails[1]));
  sessionStorage.setItem(
    "auth0TokenExpiry",
    moment.unix(auth0TokenInfo.exp).format()
  );
};
