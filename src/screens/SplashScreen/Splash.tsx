import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import ViewContainer from "../../components/ViewContainer";
import RectButton from "../../components/RectButton";
import globalStyles from "../../globalStyles";
import styles from "./styles";
import Icon from "../../../assets/icons";

const SplashScreen = ({ navigation }: any) => {
  const { user } = useAuthentication();

  return (
    <ViewContainer>
      <Icon type="grants_icon" />
      <Text>This is a test screen!</Text>
    </ViewContainer>
  );
};

export default SplashScreen;
