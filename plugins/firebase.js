import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyB_nRNvBuLq-8OU3JBSkn-eK2j3gJbVAcw",
	authDomain: "loginapp-9fbc4.firebaseapp.com",
	projectId: "loginapp-9fbc4",
	storageBucket: "loginapp-9fbc4.appspot.com",
	messagingSenderId: "544342006578",
	appId: "1:544342006578:web:6ff478d27b058bf005152b",
	measurementId: "G-VSF25LGGBZ"
}

const apps = getApps()
const firebaseApp = apps.length ? apps[0] 
										  : initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp, {})
export { db }