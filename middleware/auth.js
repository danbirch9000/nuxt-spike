export default function(context) {
  console.log("[Middleware] Just Auth");
  if (!context.store.getters.IS_AUTHENTICATED) {
    context.redirect("/auth");
  }
}
