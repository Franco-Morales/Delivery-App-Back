import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://delivery-app2021.firebaseio.com'
});

export default admin;
