import { StyleSheet, Text, TextInput, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import ViewContainer from "../../components/ViewContainer";
import RectButton from "../../components/RectButton";
import globalStyles from "../../globalStyles";
import styles from "./styles";
import { useState } from "react";
import { createEmailPass } from "../../firebase/auth";
import { User } from "../../types/schema";
import { addUser, getAllUsers } from "../../firebase/firestore/users";

const auth = getAuth();

const SigninScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [users, setUsers] = useState("");

  const handleSignup = async () => {
    const uid = await createEmailPass(email, pass);
    const userToAdd = {
      user_id: uid,
      admin: false,
      audio: [""],
      email: email,
      grants: [""],
      language: "english",
    } as User;
    await addUser(uid, userToAdd);
  }

  const handleGetUsers = async () => {
    const usersFromDatabase = await getAllUsers();
    let uids: string[] = []
    usersFromDatabase.map((element) => {
      uids.push(element.user_id);
    })
    setUsers(uids.toString())
  }

  return (
    <ViewContainer>
      <Text style={globalStyles.h2}>Sign in</Text>
      <TextInput 
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        onChangeText={(pass) => setPass(pass)}
      />
      <RectButton
        text="Sign Up"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => handleSignup}
      />
      <RectButton
        text="Get Users"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => handleGetUsers()}
      />
      <Text style={globalStyles.body1}>{users}</Text>
      <RectButton
        text="Back"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#253C85" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => navigation.navigate("Home")}
      />
    </ViewContainer>
  );
};

export default SigninScreen;

// return (
//   <View style={styles.container}>
//     <Text>Sign in</Text>
//     <Button
//       title="Back"
//       style={styles.button}
//       onPress={() => navigation.navigate("Home")}
//     />
//     <TextInput 
//       placeholder="email"
//       onChangeText={(email) => setEmail(email)}
//     />
//     <TextInput
//       placeholder="password"
//       onChangeText={(pass) => setPass(pass)}
//     />
//     <Button
//       title="Sign Up"
//       style={styles.button}
//       onPress={() => handleSignup()}
//     />
//     <Button
//       title="Get Users"
//       style={styles.button}
//       onPress={() => handleGetUsers()}
//     />
//     <Text>{users}</Text>
//   </View>
// );