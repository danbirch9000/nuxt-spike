import auth0 from "auth0-js";
import Auth0Lock from "auth0-lock";
import axios from "axios";
import { urls } from "~/config/constants";
import firebase from "firebase";
let test = new auth0.WebAuth({
  domain: "code82.auth0.com",
  clientID: "lGYegv04mhYn0lTILyPqM9xaIEuNS_DM",
  redirectUri: "http://localhost:3000/callback",
  audience: "https://code82.auth0.com/userinfo",
  responseType: "token id_token",
  scope: "openid"
});
export const loginUser = function() {
  test.authorize();
};

export const parseHash = function() {
  console.log("parsing hash");
  console.log(test);
  var lock = new Auth0Lock(
    "lGYegv04mhYn0lTILyPqM9xaIEuNS_DM",
    "code82.auth0.com"
  );
  test.parseHash((err, authResult) => {
    console.log(window.location.hash);
    console.log(err);
    console.log(authResult);
    if (authResult && authResult.accessToken) {
      var id_token = authResult.idToken;
      console.log(id_token);
      window.location.hash = "";
      lock.getUserInfo(authResult.accessToken, function(err, profile) {
        if (err) {
          console.log("err", err);
        }
        console.log("urls", urls);
        console.log("profile", profile);
        // Get CustomFirebase Token
        /*
        Request
https://us-central1-vuejs-83403.cloudfunctions.net/delegateToken*/
        axios({
          method: "post",
          data: {
            userId: profile.user_id
          },
          baseURL: "https://us-central1-vuejs-83403.cloudfunctions.net",
          url: "/delegateToken",
          headers: {
            Authorization: "Bearer " + authResult.accessToken
          }
        }).then(response => {
          firebase
            .auth()
            .signInWithCustomToken(response.data)
            .catch(function(error) {
              console.log(error);
            });
        });
      });
    }
  });
  // var result = test.parseHash(window.location.hash);
  // console.log(result);
};
