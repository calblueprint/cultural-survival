import { getAuth, 
  createUserWithEmailAndPassword , 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut } from "firebase/auth";

const auth = getAuth();
export const createEmailPass = async ( email: string, password: string ): Promise<string> => {
  let uid = "";
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      uid = user.uid;
      return uid;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
  return "";
}

export const signInEmailPass = async ( email: string, password: string ) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        console.error(error);
        throw error;
    });
}

export const useSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        console.error(error);
        throw error;
        // An error happened.
    });
}

export const authObserver = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const uid = user.uid;
        } else {
            // User is signed out
            console.log("No user signed in.");
            // ...
        }
    });
}
