import auth0 from "auth0-js";
import axios from "axios";
import firebase from "firebase";
let _auth0 = new auth0.WebAuth({
  domain: "code82.auth0.com",
  clientID: "rojWMbjsCsCP6pQneYwDyeRima4ylg8X",
  redirectUri: "http://localhost:3000/callback",
  audience: "http://localhost:1337/",
  responseType: "token id_token",
  scope: "openid"
});
export const authorise = function () {
  _auth0.authorize();
};

export const parseHash = function () {
  _auth0.parseHash((err, authResult) => {
    console.log("parseHash response", authResult);

    let userInfo = authResult.idToken.split(".");
    let userDetails = JSON.parse(atob(userInfo[1]));
    console.log("userDetails", userDetails);
    console.log("isDev", process.env.isDev);
    axios({
      method: "get",
      baseURL: "http://localhost:1337",
      url: "/auth/firebase",
      headers: {
        Authorization: "Bearer " + authResult.accessToken
      }
    }).then(response => {
      console.log("response from firebase mint api", response);
      firebase
        .auth()
        .signInWithCustomToken(response.data.firebaseToken)
        .then(res => {
          console.log(res);
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
        .catch(function (error) {
          console.log(error);
        });
    });
  });
  // var result = test.parseHash(window.location.hash);
  // console.log(result);
};
