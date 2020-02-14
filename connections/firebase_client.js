const firebase = require('firebase/app');
require('firebase/auth');
require('dotenv').config();

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectID: process.env.FIREBASE_PROJECT_ID
}

firebase.initializeApp(config);

module.exports = firebase;