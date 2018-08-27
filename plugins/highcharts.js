import Vue from "vue";
import VueHighcharts from "vue-highcharts";
import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD_sLyw1k_eOwnZ48UjPjgLzUpzN7sz5R8",
  authDomain: "vuejs-83403.firebaseapp.com",
  databaseURL: "https://vuejs-83403.firebaseio.com",
  projectId: "vuejs-83403",
  storageBucket: "vuejs-83403.appspot.com",
  messagingSenderId: "360438485027"
};
firebase.initializeApp(config); //eslint-disable-line

Vue.use(VueHighcharts);
