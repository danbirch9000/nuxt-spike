<template>
  <div :class="{'menu-active': menuState}" class="body-container">
    <nav>
      <a class="navbar-brand" @click.prevent="navigateHome()" >
        <img src="/assets/images/saveswiftlogo.png">
      </a>
      <a v-if="isLoggedIn()" class="burger-menu" @click="toggleMenu()" />
      <div v-if="isLoggedIn()" :class="{'active': menuState}" class="menu">
        <ul>
          <nuxt-link to="/goals" tag="li" active-class="active"><a>Goals</a></nuxt-link>
          <nuxt-link to="/accounts" tag="li" active-class="active"><a>Accounts</a></nuxt-link>
          <li active-class="active" @click="logout"><a>Logout</a></li>
        </ul>
      </div>
    </nav>
    <nuxt/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    ...mapState({
      menuState: state => state.appModule.menuOpen
    }),
    homepageUrl() {
      return this.isLoggedIn() ? "/goals" : "/";
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    },
    toggleMenu() {
      this.$store.commit("TOGGLE_MENU");
    },
    isLoggedIn() {
      return this.$store.getters.IS_AUTHENTICATED;
    },
    navigateHome() {
      this.$router.push(this.homepageUrl);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/colors";
@import "../assets/mixins";

.body-container {
  position: relative;
  left: 0;
  @include transition;
  &.menu-active {
    left: 200px;
    @include transition;
    @media (min-width: 700px) {
      left: 0;
    }
  }
}

nav {
  text-align: center;
  position: relative;
  padding: 5px 0;
  border-bottom: 1px #e5e5e5 solid;
  background-color: $white;
  @media (min-width: 700px) {
    height: 70px;
  }
}
div.menu {
  position: absolute;
  top: 0;
  left: -200px;
  width: 200px;
  background-color: $lightgrey;
  height: 100vh;
  border-right: 1px #e5e5e5 solid;
  @media (min-width: 700px) {
    position: relative;
    height: auto;
    background-color: inherit;
    left: 0;
    width: auto;
    display: inline-block;
    float: left;
    margin-left: 0;
    top: -4px;
    border: none;
    border-left: 1px $lightgrey solid;
    margin-left: 20px;
    padding-left: 20px;
  }
  ul {
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: left;
    li {
      border-bottom: 1px #e5e5e5 solid;
      a {
        font-size: 14px;
        text-decoration: none;
        color: #292929;
        padding: 14px 10px;
        display: block;
      }
      cursor: pointer;
      &:hover {
        background-color: darken(#f4f4f4, 5%);
      }
      @media (min-width: 700px) {
        float: left;
        padding: 10px;
        border: none;
      }
    }
  }
}

a.navbar-brand {
  width: 155px;
  display: inline-block;
  @media (min-width: 700px) {
    float: left;
    width: 195px;
    top: 7px;
    position: relative;
    left: 8px;
  }
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
  @media (min-width: 700px) {
    display: none;
  }
}
</style>
