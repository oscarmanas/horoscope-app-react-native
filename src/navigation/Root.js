import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import HoroscopeScreen from "../screens/HoroscopeScreen/Index";

export default function RootNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FEEAE6",
          },
          headerTintColor: "#442C2E",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HoroscopeScreen"
          component={HoroscopeScreen}
          options={{ headerTitle: "Horoscope" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
