import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import { useSelector } from "react-redux";
import InFolder from "../screens/InFolder";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  InFolder: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const index = () => {
  const { isAuthenticated } = useSelector((state: any) => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "Home" : "SignIn"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="InFolder"
          component={InFolder}
          options={{ headerShown: true, title: "Files" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
