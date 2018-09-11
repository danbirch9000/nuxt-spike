import Vue from "vue";
import VueHighcharts from "vue-highcharts";
import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAPH_yMg5UZWsdC0EivWGgZH1RgH-YBivA",
  authDomain: "saveswift-2b8ff.firebaseapp.com",
  databaseURL: "https://saveswift-2b8ff.firebaseio.com",
  projectId: "saveswift-2b8ff",
  storageBucket: "saveswift-2b8ff.appspot.com",
  messagingSenderId: "617398087422"
};
firebase.initializeApp(config); //eslint-disable-line

Vue.use(VueHighcharts);
