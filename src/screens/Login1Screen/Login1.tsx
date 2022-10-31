import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import ViewContainer from "../../components/ViewContainer";
import RectButton from "../../components/RectButton";
import globalStyles from "../../globalStyles";
import styles from "./styles";
import Icon from "../../../assets/icons";
import { TextInput } from "react-native-gesture-handler";

const Login1Screen = ({ navigation }: any) => {
  const { user } = useAuthentication();
  const handleLogin = () => {
    navigation.navigate("Login2");
  };
  const handleSignup = () => {
    navigation.navigate("Signup1");
  };
  return (
    <ViewContainer>
      <Text style={globalStyles.h2}>Welcome to Cultural Survival.</Text>
      <Text style={globalStyles.body1}>
        Advancing Indigenous Peoples' Rights & Cultures Worldwide.
      </Text>
      <RectButton
        text="Login"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#A8A8A8" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => handleLogin()}
      />
      <RectButton
        text="Sign Up"
        buttonStyle={{ marginTop: "5%", backgroundColor: "#A8A8A8" }}
        textStyle={{ color: "#FFF" }}
        onPress={() => handleSignup()}
      />
    </ViewContainer>
  );
};

export default Login1Screen;
