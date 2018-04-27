<template>
  <section class="container">
      <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <form @submit.prevent="onSubmit">
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" class="form-control" v-model='email' id="email" />
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input type="password" class="form-control" v-model='password' id="password" />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            <button type="button" class="btn btn-primary btn-sm" @click="isLogin = !isLogin">Switch to {{ !isLogin ? 'login' : 'register' }}</button>


          </div>
        </div>
      </div>
  </section>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      email: '',
      password: '',
      isLogin: true
    }
  },
  computed:{
  },
  methods: {
      onSubmit() {
      this.$store.dispatch("AUTHENTICATE_USER", {
        isLogin: this.isLogin,
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push('/goals');
      });
    }
  }
}
</script>

<style lang="scss" scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}
</style>
