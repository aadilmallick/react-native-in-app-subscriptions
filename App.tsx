import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import DemoScreen from "./screens/DemoScreen";
import PaywallScreen from "./screens/PaywallScreen";
import SubscriptionInfoScreen from "./screens/SubscriptionInfoScreen";

export type RootStackParamList = {
  Home: undefined;
  Paywall: undefined;
  DemoScreen: undefined;
  Subscription: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarStyle: "dark",
          statusBarTranslucent: true,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Paywall"
          component={PaywallScreen}
          options={{
            presentation: "transparentModal",
          }}
        />
        <Stack.Screen
          name="DemoScreen"
          component={DemoScreen}
          options={{
            presentation: "transparentModal",
          }}
        />
        <Stack.Screen name="Subscription" component={SubscriptionInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
