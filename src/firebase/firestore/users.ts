import  { db } from "../firebaseApp";
import  { collection, getDoc, doc, getDocs, DocumentReference, addDoc} from "firebase/firestore";
import { User } from "../../types/schema";

const userCollection = collection(db, "users");

const getUsers = async (id: string) => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    return await parseUser(docSnap);
}

const getAllUsers = async () => {
    const collectionRef = collection(db, 'users');
    const promises: Promise<User>[] = [];
    const docSnap = await getDocs(collectionRef);
    docSnap.forEach((user) => {
        promises.push(parseUser(user))
    })
    const users = await Promise.all(promises);
    return users;
}

const addUser = async (user: User) => {
    const collectionRef = collection(db, 'users');
    await addDoc(collectionRef, user);
}

const parseUser = async (doc: any) => {
    const user_id = doc.id.toString();
    const data = doc.data();
    const user = {
        admin: data.admin,
        audio: data.audio,
        email: data.email,
        grants: data.grants,
        language: data.language
    }
    return user as User;
}