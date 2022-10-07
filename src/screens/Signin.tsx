import { StyleSheet, Text, View, TextInput } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import React, { useState } from "react"
import { createEmailPass } from "../firebase/auth";
import { addUser } from "../firebase/firestore/users";
import { User } from "../types/schema"

const SigninScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View style={styles.container}>
      <Text>Sign in</Text>
      <Button
        title="Back"
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      />
      <TextInput 
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        onChangeText={(pass) => setPass(pass)}
      />
      <Button
        title="Sign Up"
        style={styles.button}
        onPress={async () => {
          const uid = await createEmailPass(email, pass);
          console.log(uid)
          const userToAdd = {
            user_id: uid,
            admin: false,
            audio: [""],
            email: email,
            grants: [""],
            language: "english",
          } as User;
          console.log(uid)
          addUser(uid, userToAdd);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
});

export default SigninScreen;