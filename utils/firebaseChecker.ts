import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

/**
 * Utility function to check Firebase connection
 */
export const checkFirebaseConnection = async (): Promise<boolean> => {
  try {
    // Try to get a collection - this will fail if there's a connection issue
    await getDocs(collection(db, "test-connection"));
    console.log("Firebase connection successful");
    return true;
  } catch (error) {
    console.error("Firebase connection failed:", error);
    return false;
  }
};

/**
 * Check if Firebase is properly initialized
 */
export const isFirebaseInitialized = (): boolean => {
  return !!db;
};
