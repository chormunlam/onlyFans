import React from "react";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { Stack } from "expo-router";

Amplify.configure(awsExports);

export default function RootLayout() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        {/* Replace the following with your desired navigation component */}
        <Stack screenOptions={{ headerShown: false }} />
      </Authenticator>
    </Authenticator.Provider>
  );
}
