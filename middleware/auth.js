export default context => {
  context.store.dispatch("IS_AUTHENTICATED");
  if (!context.store.state.userModule.authenticated) {
    context.store.dispatch("LOGOUT");
  }

  if (
    context.store.state.userModule.authenticated &&
    context.route.fullPath === "/"
  ) {
    context.redirect("/goals");
  }
};
