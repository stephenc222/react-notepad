import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBgBGBc9o4YAQbhAUgINt0sISHt0RHZY3Y",
  authDomain: "react-notepad-80c34.firebaseapp.com",
  databaseURL: "https://react-notepad-80c34.firebaseio.com",
  projectId: "react-notepad-80c34",
  storageBucket: "react-notepad-80c34.appspot.com",
  messagingSenderId: "4062664049"
})

export default firebaseApp