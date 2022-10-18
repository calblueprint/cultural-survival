import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>

      <Button
        title="Sign Out"
        style={styles.button}
        onPress={() => signOut(auth)}
      />
      
      <Button
        title="Audio"
        style={styles.button}
        onPress={() => navigation.navigate("Audio")}
      />
      <Button
        title="Grants"
        style={styles.button}
        onPress={() => navigation.navigate("Grants")}
      />
      <Button
        title="Translation"
        style={styles.button}
        onPress={() => navigation.navigate("Translation")}
      />
            <Button
              title="Sign In"
              style={styles.button}
              onPress={() => navigation.navigate("Signin")}
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

export default HomeScreen;