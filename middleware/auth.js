export default function(context) {
  if (!context.store.getters.IS_AUTHENTICATED) {
    console.log("redirecting from auth middleware");
    context.redirect("/");
  }
}
