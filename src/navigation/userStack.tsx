// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen/Home";
import AudioScreen from "../screens/AudioScreen/Audio";
import SigninScreen from "../screens/SigninScreen/Signin";
import GrantsScreen from "../screens/GrantsScreen/Grants";
import SplashScreen from "../screens/SplashScreen/Splash";
import Login1Screen from "../screens/Login1Screen/Login1";
import Login2Screen from "../screens/Login2Screen/Login2";
import Login3Screen from "../screens/Login3Screen/Login3";
import { RootStackParamList } from "../types/navigation";

const UserStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Audio" component={AudioScreen} />
        <Stack.Screen name="Grants" component={GrantsScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Login1" component={Login1Screen} />
        <Stack.Screen name="Login2" component={Login2Screen} />
        <Stack.Screen name="Login3" component={Login3Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
