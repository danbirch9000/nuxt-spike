<template>
  <section class="container">
    <div class="goal-layout">
      <div class="panel">
        <Login />
        <div @click="logUserIn()">Auth0</div>
        <div @click="firebase()">Firebase</div>
      </div>
      <div class="panel">
        <h1>Savings Calculator</h1>
        <P>Use our savings calculator to see how compound interest can boost your savings over time.</P>
        <Calculator/>
      </div>
    </div>

  </section>


</template>


<script>
import Login from "~/components/Login";
import Calculator from "~/components/Calculator";
import { loginUser } from "~/common/auth"; //eslint-disable-line

export default {
  components: { Login, Calculator },
  // middleware: ["check-auth", "auth"],
  beforeMount() {
    this.$store.commit("CLOSE_MENU");

    // var provider = new firebase.auth.GoogleAuthProvider();
    // firebase
    //   .auth()
    //   .signInWithRedirect(provider)
    //   .then(function(d) {
    //     console.log(d);
    //   })
    //   .catch(function(e) {
    //     console.log(e);
    //   });
  },
  methods: {
    logUserIn() {
      console.log("called");
      loginUser();
    }
    // firebase() {
    //   var token =
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFqaEJSVE00T0RjM01rTkNOVGxGTTBWRE1EZ3lOVUkyUkRaR1JVWTFNMEkyUkRVeE5EWkNNdyJ9.eyJpc3MiOiJodHRwczovL2NvZGU4Mi5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWI4MmExYmNkZDQ0YTkyYTI1YTBhMjc0IiwiYXVkIjoibEdZZWd2MDRtaFluMGxUSUx5UHFNOXhhSUV1TlNfRE0iLCJpYXQiOjE1MzUyODc3NDYsImV4cCI6MTUzNTMyMzc0NiwiYXRfaGFzaCI6InRBY3hEeGpEUk16V0JFUE4yR2tzT3ciLCJub25jZSI6Illha0N4dUxSc0lSWHAwcnktQjFoSkUzNTUuaENKZWoyIn0.RqCvwNfv6g0a-4pTZ2jJAGMxNbnRIw-2n3vIIz_Z4Yrr6I29T1RzTsuarq_Aq-xXJH9vBK45jcKsYOjGB7M88Pk40XIJiDcRABndXNurX3XUQuASkFQ-MJb76ouy_0EJP6gXiPfjKTWO5Fh0CVkZ_JFk-Thf3f6gq9wjOFVEC-7dhHfYjUWIEDBUma_0U2eVt4aJV8_Z5PlyYqdaS_f7vB90MtqgYeLiHXjBa8i1CefVZ42NlWiXEgMCXxb_k25rMgYjiVgDZpdssuNesKcp3_Jygg4G8BkvhniJWpjWg8j7hP7NY5hEl8xE0SaflXT6ucy6gDaqA41djDGiCpKfpQ";
    //   firebase
    //     .auth()
    //     .signInWithCustomToken(token)
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //       // ...
    //     });
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/colors";
@import "../assets/mixins";

@media (min-width: 700px) {
  .grid-container {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 25% 75%;
  }
}
</style>
