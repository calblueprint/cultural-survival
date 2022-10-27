import React from "react";
import "./src/firebase/firebaseApp";
import RootNavigation from "./src/navigation";
import { AppProvider, UserProvider, useUser } from "@realm/react";
import appId from "./app.json";
import baseUrl from "./app.json";
import { View, ActivityIndicator } from "react-native";

export default function App() {
  return <RootNavigation />;
}
