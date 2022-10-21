import  { db } from "../firebaseApp";
import  { collection, getDocs , doc, getDoc, addDoc, deleteDoc, updateDoc} from "firebase/firestore";
import { Grant } from "../../types/schema";


const grantsCollection = collection(db, "grants"); 

/**
 * Returns the grant data from firestore with the given grantId
 */
export const getGrant = async (grantId: string): Promise<Grant> => {
  try {
    const docRef = doc(db, "grants", grantId);
    const docSnap = await getDoc(docRef);
    return await parseGrant(docSnap);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/** 
 * Returns all the grants from firestore
*/
export const getAllGrants = async (): Promise<Grant[]> => {
  try {
    const itemsRef = collection(db, "grants");
    const promises: Promise<Grant>[] = [];
    const docSnap = await getDocs(itemsRef);
    docSnap.forEach((grant) => {
      promises.push(parseGrant(grant))

    })
    const grants = await Promise.all(promises);
    return grants;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Adds the given grant data to firestore
 */
export const addGrant = async (grant: Grant): Promise<void> => {
  try {
    const itemsRef = collection(db, "grants");
    await addDoc(itemsRef, grant)
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Deletes the grant from firestore with the given grantId
 */
export const deleteGrant = async (grantId: string): Promise<void> => {
  try {
    const docRef = doc(db, "grants", grantId);
    await deleteDoc(docRef)

  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Updates the grant's title to be the new given title 
 */
export const updateGrantTitle = async (grantId: string, newTitle: string): Promise<void> => {
  const docRef = doc(db, "grants", grantId);
  // This data object changes the fields that are different from the entry in backend!
  const data = {
      title: newTitle
  }
  await updateDoc(docRef, data)
}


const parseGrant = async (doc : any) => {
  const grant_id = doc.id.toString();
  const data = doc.data();
  
  const grant = {
    grant_id: grant_id, 
    category: data.category,
    countries: data.countries,
    deadline: data.deadline,
    description: data.description,
    subject: data.subject,
    title: data.title,
  }

  return grant as Grant;
};
