<template>
  <section class="container">
      <h1>Login</h1>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <form @submit.prevent="onSubmit">
              <input type='text' v-model='email'/>
              <input type='text' v-model='password'/>
              <button type="submit">go</button>
            </form>
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
      password: ''
    }
  },
  computed:{
  },
  methods: {
      onSubmit(){
          this.$axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey, {
              email: this.email,
              password: this.password,
              returnSecureToken: true
          }).then(result => {
              console.log(result);
          }).catch(e => console.log(e));
      }
  }
}
</script>
