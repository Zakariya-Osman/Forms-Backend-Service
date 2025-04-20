import { addEntry } from "@/firebase/config";
import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const COLLECTION_NAME = "employees";

/**
 * Adds a new employee to the Firebase database
 * @param employeeData - The employee data to add
 * @returns Promise with the result of the operation
 */
export const addEmployee = async (employeeData: any) => {
  try {
    console.log("Attempting to add employee:", employeeData);
    const result = await addEntry(COLLECTION_NAME, employeeData);

    console.log("Add employee result:", result);

    if (!result.success) {
      console.error("Failed to add employee:", result.error);
      throw new Error(String(result.error) || "Failed to add employee");
    }

    return result;
  } catch (error) {
    console.error("Error in employeeService.addEmployee:", error);
    throw error;
  }
};

export interface Employee {
  id?: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
}

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Employee)
    );
  } catch (error) {
    console.error("Error getting employees: ", error);
    throw error;
  }
};

export const getEmployee = async (id: string): Promise<Employee | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Employee;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting employee: ", error);
    throw error;
  }
};

export const updateEmployee = async (
  id: string,
  employee: Partial<Employee>
): Promise<void> => {
  try {
    const employeeRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(employeeRef, employee);
  } catch (error) {
    console.error("Error updating employee: ", error);
    throw error;
  }
};

export const deleteEmployee = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting employee: ", error);
    throw error;
  }
};
