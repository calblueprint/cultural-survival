import { getAuth, 
  createUserWithEmailAndPassword , 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut } from "firebase/auth";

const auth = getAuth();
export const createEmailPass = ( email: string, password: string ) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return user;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
}

export const signInEmailPass = ( email: string, password: string ) => {
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
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            console.log("No user signed in.");
            // ...
        }
    });
}
