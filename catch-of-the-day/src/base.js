import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDQeQeVy-ai7wbtzfQyW-c-Kkpw-8vhYWw",
  authDomain: "catch-of-the-day-hbk.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-hbk.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebase };
export default base;
