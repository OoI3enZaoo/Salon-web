import Firebase from 'firebase'
let firebaseApp

let app = null;
if (Firebase.apps.length > 0) {

  app = Firebase.app();
}else{

   app = Firebase.initializeApp({
       apiKey: "AIzaSyCgv64cEVxnvFwdLuZT_URIEImyTmDJjTE",
         authDomain: "salon-b177d.firebaseapp.com",
         databaseURL: "https://salon-b177d.firebaseio.com",
         projectId: "salon-b177d",
         storageBucket: "salon-b177d.appspot.com",
         messagingSenderId: "570290189192"
        });
}


// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.


export const db = app.database();
export const dbAuth = app.auth();
