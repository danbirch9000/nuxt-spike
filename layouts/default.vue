<template>
  <div class='body-container' :class="{'menu-active': menuState}">
    <nav>
      <a class="navbar-brand" href="/"><img src="/assets/images/saveswiftlogo.png" /></a>
      <a class="burger-menu" @click="toggleMenu()"></a>
      <div :class="{'active': menuState}" class="menu">
        <ul>
          <nuxt-link to="/" tag="li" active-class="active"><a>Home</a></nuxt-link>
          <nuxt-link to="/goals" tag="li" active-class="active"><a>Goals</a></nuxt-link>
          <nuxt-link to="/accounts" tag="li" active-class="active"><a>Accounts</a></nuxt-link>
          <li @click="logout" active-class="active"><a>Logout</a></li>
        </ul>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data(){
    return{
      menuOpen: false
    }
  },
  computed: {
    ...mapState({
    menuState: state => state.appModule.menuOpen
  })
  },
  methods: {
    logout(){
      this.$store.dispatch("LOGOUT");
      this.$router.push("/auth");
    },
    toggleMenu(){
      this.$store.commit('TOGGLE_MENU');
    }
  }
}
</script>

<style style lang="scss" scoped>
.body-container {
  position: relative;
  left: 0;
  -webkit-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  &.menu-active {
    left: 200px;
  -webkit-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  }
}
a {
  font-size: 14px;
  text-decoration: none;
  color: #292929; 
}
nav {
  text-align: center;
  position: relative;
  padding: 5px 0; 
  border-bottom: 1px #e5e5e5 solid;
}
div.menu{
  position: absolute;
  top: 0;
  left: -200px;
  width: 200px;
  background-color: #f4f4f4;
  height: 100vh;
  border-right: 1px #e5e5e5 solid;
}
ul {
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: left;
  li {
    border-bottom: 1px #e5e5e5 solid;
    padding: 15px 10px;
    cursor: pointer;
    &:hover {
      background-color: darken(#f4f4f4, 5%);
    }
  }
}
a.navbar-brand{
  width: 155px;
  display: inline-block;
  img {
    width: 100%;
  }
}
a.burger-menu {
  display: inline-block;
    width: 25px;
    height: 25px;
    background-size: 24px;
    background-repeat: no-repeat;
    position: absolute;
    top: 11px;
    left: 11px;
    background-position-y: 1px;
    cursor: pointer;
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABkCAMAAACCTv/3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA5ubmSUUG+gAAAAJ0Uk5T/wDltzBKAAAAPklEQVR42uzYQQ0AAAgDseHfNC4IyVoD912WAACUm3uampqampqamq+aAAD+IVtTU1NTU1NT0z8EAFBsBRgAX+kR+Qam138AAAAASUVORK5CYII=);
}

</style>

