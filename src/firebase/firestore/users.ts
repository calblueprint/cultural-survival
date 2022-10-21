import  { db } from "../firebaseApp";
import  { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "../../types/schema";

const userCollection = collection(db, "users");

export const getLanguage = async (user_id: string): Promise<String> => {
    try {
        const docRef = doc(db, "language", user_id)
        const docSnap = await getDoc(docRef);
        return await (await parseUser(docSnap)).language
    } catch (e) {
      console.warn(e);
      throw e;
    }
  }

export const setLanguage = async (user_id: string, user_language: string): Promise<void> => {

    const docRef = doc(db, "language", user_id)
    const data = {
        language: user_language
    }
    await updateDoc(docRef, data)
}

  


const parseUser = async (doc: any) => {
    const user_id = doc.id.toString();
    const data = doc.data();
    const user = {
        user_id: user_id,
        admin: data.admin,
        audio: data.audio,
        email: data.email,
        grants: data.grants,
        language: data.language
    }
    return user as User;
}