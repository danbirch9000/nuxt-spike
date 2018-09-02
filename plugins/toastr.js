import Vue from "vue";
import VueToastr from "@deveodk/vue-toastr";
import "@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css";

Vue.use(VueToastr, {
  defaultPosition: "toast-top-right",
  defaultType: "info",
  defaultTimeout: 2000
});
/*
* // Make a success toastr
this.$toastr('success', 'i am a toastr success', 'hello')
// Make a error toastr
this.$toastr('error', 'i am a toastr error', 'hello')
// Make a warning toastr
this.$toastr('warning', 'i am a toastr warning', 'hello')
// Make a info toastr
this.$toastr('info', 'i am a toastr info', 'hello')

this.$toastr('add', {
  title: 'Heyy', // Toast Title
  msg: 'I am a custom property toastr' // Message
  clickClose: false, // Click Close Disable
  timeout: 1000, // Timeout in ms
  position: 'toast-bottom-full-width', // Toastr position
  type: 'info', // Toastr type
  closeOnHover: true, // On mouse over stop timeout can be boolean; default true
  clickClose: false, // On click toast close can be boolean; default false
  // Available callbacks
  onCreated: () => console.log('toast was created'),
  onClicked: () => console.log('toast was clicked'),
  onClosed: () => console.log('toast was closed'),
  onMouseOver: () => console.log('toast was moused over'),
  onMouseOut: () => console.log('mouse left the toast')
})

*/
