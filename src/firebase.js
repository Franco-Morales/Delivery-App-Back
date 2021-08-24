import * as admin from 'firebase-admin';
admin.initializeApp({
  credential: admin.credential.cert(process.env.FIREBASE_KEY),
  databaseURL: 'https://delivery-app2021.firebaseio.com'
});

export default admin;
