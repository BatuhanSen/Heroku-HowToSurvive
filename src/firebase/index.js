import firebase from 'firebase/app';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6Z--SEEA0UmsCyR-q9BZ9k427yTmG7no",
    authDomain: "firabase-react-upload.firebaseapp.com",
    projectId: "firabase-react-upload",
    storageBucket: "firabase-react-upload.appspot.com",
    messagingSenderId: "78389421257",
    appId: "1:78389421257:web:447f500f594205cc74d918",
    measurementId: "G-L0CJD3EV7J"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };
