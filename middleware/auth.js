export default function({ app, route, redirect, store }) {
  if (route.path !== "/auth/signin") {
    if (route.path !== "/auth/create-account" && !store.state.user) {
      return redirect("/auth/signin");
    }
  } else if (route.path === "/auth/signin") {
    if (!store.state.user) {
    } else {
      return redirect("/");
    }
  }
}
