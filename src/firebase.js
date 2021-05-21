import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(require(require('os').homedir()+"/Downloads/delivery-app2021-firebase-adminsdk-eb75w-b5e7177fa8.json")),
  databaseURL: 'https://delivery-app2021.firebaseio.com'
});

export default admin;
