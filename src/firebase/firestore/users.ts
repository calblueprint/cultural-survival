import  { db } from "../firebaseApp";
import  { collection } from "firebase/firestore";
import { User } from "../../types/schema";

const userCollection = collection(db, "users");