const pkg = require("./package");

module.exports = {
  mode: "spa",

  /*
  ** Headers of the page
  */
  head: {
    title: "saveswift - keep track of your savings goals",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    script: [
      { src: "/assets/js/plugins/nouislider.min.js" },
      { src: "https://www.gstatic.com/firebasejs/5.4.1/firebase.js" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:400,500,700"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#3B8070" },

  /*
  ** Global CSS
  */
  css: ["@/assets/styles.scss"],

  env: {
    isDev: process.env.NODE_ENV !== "production"
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/highcharts",
    "~/plugins/dialog",
    "~/plugins/money.filter",
    "~/plugins/filters",
    { src: "~/plugins/ga.js", ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios"
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: ["axios"],
    /*
    ** You can extend webpack config here
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    }
  },
  env: {
    fbAPIKey: "AIzaSyD_sLyw1k_eOwnZ48UjPjgLzUpzN7sz5R8"
  }
};
