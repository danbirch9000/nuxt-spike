export default function(context) {
  context.store.dispatch("INIT_AUTH", context.req);
}
