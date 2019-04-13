export const MAIN_CONFIG = {
  dev: {
    siteURL: "http://localhost:3000/",
    audience: "http://localhost:1337/",
    firebaseToken: "http://localhost:1337/",
    auth0Domain: "code82.auth0.com",
    auth0ClientID: "rojWMbjsCsCP6pQneYwDyeRima4ylg8X",
    firebase: {
      apiKey: "AIzaSyAa-RKBK-Ko65Ajo_2xRWC2mDcqjWakx3w",
      authDomain: "saveswift-test.firebaseapp.com",
      databaseURL: "https://saveswift-test.firebaseio.com",
      projectId: "saveswift-test",
      storageBucket: "saveswift-test.appspot.com",
      messagingSenderId: "224524379398"
    }
  },
  prod: {
    siteURL: "https://www.saveswift.com/",
    audience: "https://us-central1-saveswift-2b8ff.cloudfunctions.net/",
    firebaseToken: "https://us-central1-saveswift-2b8ff.cloudfunctions.net/api",
    auth0Domain: "code82.auth0.com",
    auth0ClientID: "rojWMbjsCsCP6pQneYwDyeRima4ylg8X",
    firebase: {
      apiKey: "AIzaSyAPH_yMg5UZWsdC0EivWGgZH1RgH-YBivA",
      authDomain: "saveswift-2b8ff.firebaseapp.com",
      databaseURL: "https://saveswift-2b8ff.firebaseio.com",
      projectId: "saveswift-2b8ff",
      storageBucket: "saveswift-2b8ff.appspot.com",
      messagingSenderId: "617398087422"
    }
  }
};
