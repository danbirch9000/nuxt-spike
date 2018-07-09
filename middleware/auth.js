export default function(context) {
  if (!context.store.getters.IS_AUTHENTICATED) {
    context.redirect("/");
  }
}
