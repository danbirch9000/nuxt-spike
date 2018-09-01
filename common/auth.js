import auth0 from "auth0-js";
import axios from "axios";
import firebase from "firebase";
import Cookie from "js-cookie";

let _auth0 = new auth0.WebAuth({
  domain: "code82.auth0.com",
  clientID: "rojWMbjsCsCP6pQneYwDyeRima4ylg8X",
  redirectUri: "http://localhost:3000/callback",
  audience: "http://localhost:1337/",
  responseType: "token id_token",
  scope: "openid profile"
});
export const authorise = function() {
  _auth0.authorize();
};

export const parseHash = function(store) {
  _auth0.parseHash((err, authResult) => {
    if (authResult) {
      // console.log("parseHash response", authResult);

      // console.log("idTokenPayload", authResult.idTokenPayload);
      // console.log("isDev", process.env.isDev);
      axios({
        method: "get",
        baseURL: "http://localhost:1337",
        url: "/auth/firebase",
        headers: {
          Authorization: "Bearer " + authResult.accessToken
        }
      }).then(response => {
        // console.log("response from firebase mint api", response);
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
                  console.log("userDetails", userDetails);
                  store.commit("SET_USER_ID", userDetails.user_id);
                  localStorage.setItem("token", idToken);
                  localStorage.setItem(
                    "tokenExpiration",
                    new Date().getTime() +
                      Number.parseInt(userDetails.exp) * 1000
                  );
                  Cookie.set("jwt", response.data.firebaseToken);
                  Cookie.set(
                    "expirationDate",
                    new Date().getTime() +
                      Number.parseInt(userDetails.exp) * 1000
                  );
                });
              }
            });

            /*
            var credential = firebase.auth.EmailAuthProvider.credential(email, password);
            firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(function(usercred) {
              var user = usercred.user;
              console.log("Account linking success", user);
            }, function(error) {
              console.log("Account linking error", error);
            });
            */
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
