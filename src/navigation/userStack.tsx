// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import TranslationScreen from "../screens/TranslationScreen/Translation";
import HomeScreen from "../screens/HomeScreen/Home";
import AudioScreen from "../screens/AudioScreen/Audio";
import SigninScreen from "../screens/SigninScreen/Signin";
import GrantsScreen from "../screens/GrantsScreen/Grants";
import { RootStackParamList } from "../types/navigation";

const UserStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Audio" component={AudioScreen} />
        <Stack.Screen name="Grants" component={GrantsScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Translation" component={TranslationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;