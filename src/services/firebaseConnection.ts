import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxd5TZl-mlogfmqP9507Xcw6HeJIywX5Q",
  authDomain: "webcarros-ed7f1.firebaseapp.com",
  projectId: "webcarros-ed7f1",
  storageBucket: "webcarros-ed7f1.appspot.com",
  messagingSenderId: "289807895978",
  appId: "1:289807895978:web:75969c023e00c0b5db2fd3",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
