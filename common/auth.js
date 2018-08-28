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
export const loginUser = function() {
  _auth0.authorize();
};

export const parseHash = function() {
  _auth0.parseHash((err, authResult) => {
    console.log("err", err);
    console.log("authResult", authResult);

    axios({
      method: "get",
      baseURL: "http://localhost:1337",
      url: "/auth/firebase",
      headers: {
        Authorization: "Bearer " + authResult.accessToken
      }
    }).then(response => {
      console.log("response", response);
      firebase
        .auth()
        .signInWithCustomToken(response.data.firebaseToken)
        .then(res => {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  });
  // var result = test.parseHash(window.location.hash);
  // console.log(result);
};
