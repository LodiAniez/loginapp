export default function ({ app, route, redirect }) {
	console.log(route.path)
	if (route.path !== '/auth/signin') {
		if (!app.$fire.auth.currentUser) {
			return redirect('/auth/signin')
		}
	} else if (route.path === '/auth/signin') {
		if (app.$fire.auth.currentUser) {
			console.log("USER IS LOGGED IN")
			return redirect('/')
		} else {
			console.log("USER IS NOT LOGGED IN")
		}
	}
}
