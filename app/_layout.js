import React from "react";
import { API, Amplify, DataStore, Hub } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { User } from "../src/models";

Amplify.configure(awsExports);

const CreateUserMuataion = `
mutation createUser($input: CreateUserInput!){
  createUser(input:$input){
    id
    name
    handle
    bio
    subscriptionPrice
  }
}`;

export default function RootLayout() {
  useEffect(() => {
    const removeListener = Hub.listen("auth", async (data) => {
      if (data.payload.event === "signIn") {
        const userInfo = data.payload.data.attributes;
        console.log(JSON.stringify(userInfo, null, 2));
        //DataStore.save(new User({id:userInfo.sub, name:userInfo.name}));
        //let do it anothr way...
        //save user to database:
        const newUser = {
          id: userInfo.sub,
          name: userInfo.name,
          handle: userInfo.nickname,
          subscriptionPrice: userInfo.subscriptionPrice,
        };
        await API.graphql({
          query: CreateUserMuataion,
          variables: { input: newUser },
        });
        console.log("user saved in database");
      }
    });
    return () => {
      //cleanup fucntion}},[])
      removeListener();
    };
  }, []);
  return (
    <Authenticator.Provider>
      <Authenticator>
        {/* Replace the following with your desired navigation component */}
        <Stack screenOptions={{ headerShown: false }} />
      </Authenticator>
    </Authenticator.Provider>
  );
}
