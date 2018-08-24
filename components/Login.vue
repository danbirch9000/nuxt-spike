<template>
  <section>
    <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm1">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input id="email" v-model="email" type="email" class="form-control" >
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Password</label>
              <input id="password" v-model="password" type="password" class="form-control">
            </div>
            <button type="submit" class="cta">Submit</button>
            <Loader v-if="authStore.loading" />
            <p v-if="authStore.error">Unable to login, username or password incorrect</p>
          </form>
          <a v-if="!isLogin" @click="isLogin = !isLogin" >Already registerd? Login here</a>
          <a v-if="isLogin" @click="isLogin = !isLogin" >Register here</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from "~/components/Loader";
import { mapState } from "vuex";
export default {
  components: {
    Loader
  },
  data() {
    return {
      email: "",
      password: "",
      isLogin: true
    };
  },
  computed: {
    ...mapState({
      authStore: state => state.userModule
    })
  },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("AUTHENTICATE_USER", {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/goals");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}
</style>
