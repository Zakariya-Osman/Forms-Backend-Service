import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJe5u9qsWnnzggIZqYEFbsHnXIqLuBagw",
  authDomain: "forms-assig-ee14a.firebaseapp.com",
  projectId: "forms-assig-ee14a",
  storageBucket: "forms-assig-ee14a.firebasestorage.app",
  messagingSenderId: "1054820430486",
  appId: "1:1054820430486:web:9a85a4413704c3609d48b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add entries to Firebase
const addEntry = async (collectionName: string, data: any) => {
  try {
    // Add timestamp to the data
    const dataWithTimestamp = {
      ...data,
      createdAt: serverTimestamp(),
    };

    // Add the document to the specified collection
    const docRef = await addDoc(
      collection(db, collectionName),
      dataWithTimestamp
    );
    console.log(`Document written with ID: ${docRef.id}`);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export { db, addEntry };
