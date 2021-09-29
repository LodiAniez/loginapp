export default function ({ app, route, redirect }) {
	if (route.path !== '/auth/signin') {
		if (!app.$fire.auth.currentUser) {
			return redirect('/auth/signin')
		}
	} else if (route.path === '/auth/signin') {
		if (!app.$fire.auth.currentUser) {
			console.log("USER IS NOT LOGGED IN")
		} else {
			console.log("USER IS LOGGED IN")
			return redirect('/')
		}
	}
}