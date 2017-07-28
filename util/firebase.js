import Firebase from 'firebase'
let firebaseApp = null

if (!Firebase.apps.length) {
  const init = {
    // Populate your firebase configuration data here.
    apiKey: "AIzaSyCgv64cEVxnvFwdLuZT_URIEImyTmDJjTE",
        authDomain: "salon-b177d.firebaseapp.com",
        databaseURL: "https://salon-b177d.firebaseio.com",
        projectId: "salon-b177d",
        storageBucket: "salon-b177d.appspot.com",
        messagingSenderId: "570290189192"
  };
  firebaseApp = Firebase.initializeApp(init);
}


// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.


export const db = firebaseApp.database();
export const dbAuth = firebaseApp.auth();
