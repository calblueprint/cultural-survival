import  { db } from "../firebaseApp";
import  { collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc} from "firebase/firestore";
import { Audio } from "../../types/schema";

const audioCollection = collection(db, "audio");

/* Returns audio based on specific audio ID */
export const getAudio = async(audio_id : string) : Promise <Audio>  => {
    const docRef = doc(db, "audio", audio_id)
    const docSnap = await getDoc(docRef);
    return await parseAudio(docSnap)
};

export const getAllAudio = async(): Promise <Audio[]> => {
    const itemsRef = audioCollection;
    const promises: Promise<Audio>[] = [];
    const docSnap = await getDocs(itemsRef);
    docSnap.forEach((audio) => {
        promises.push(parseAudio(audio))
    })
    const audios = await Promise.all(promises);
    return audios
}


export const addAudio = async (audio: Audio) : Promise<void> => {
    const itemsRef = collection(db, "audio");
    await addDoc(itemsref, audio)
}



const parseAudio = async (doc) => {
    const audio_id = doc.id.toString();
    const data = doc.data();
    const audio = {
        audio_id: data.audio_id,
        audio_file : data.audio_file,
        authors: data.authors,
        description : data.description, 
        title : data.title
    };
    return audio as Audio; 
};