export default function(context) {
  console.log("[Middleware] Check Auth");
  context.store.dispatch("INIT_AUTH", context.req);
}
