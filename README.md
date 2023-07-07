# OnlyFans Clone

This is a clone of the popular content-sharing platform, OnlyFans, built using React Native and AWS Amplify.

![Homepage Image](https://github.com/chormunlam/onlyFans/assets/71049920/0f26484a-5302-4405-a19d-2b01297b19fb)

## Installation and Configuration

To set up the project and its dependencies:

1. Clone the repository
2. Run the following command to install dependencies:

```bash
npx expo install @aws-amplify/ui-react-native aws-amplify react-native-safe-area-context @react-native-async-storage/async-storage @react-native-community/netinfo
```

To configure AWS Amplify:
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

Install core-js for data querying:
npm install core-js //otherwise wont work..

AWS Amplify Authentication

We used AWS Amplify for authentication. This was set up in the RootLayout function like so:
import { Stack } from "expo-router";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

Amplify.configure(awsExports);

export default function RootLayout() {
return (
<Authenticator.Provider>
<Authenticator>
<Stack screenOptions={{ headerShown: false }} />;
</Authenticator>
</Authenticator.Provider>
);
}
More about Amplify Authenticator can be found https://ui.docs.amplify.aws/react-native/connected-components/authenticator

Profile Page

Profile pages include features like negative margin utilization and bio generation using ChatGPT.
https://github.com/chormunlam/onlyFans/assets/71049920/bc797d1e-6e73-4766-a0ea-dddce16901b7
Learning
Understanding and application of React Native component rendering and prop passing
Utilization of FlatList for list rendering
Confusion around CSS: like overlay positioning and the necessity of hidden overflow with border radius.

New Post Creation

The application allows the creation of new posts, and utilizes the Expo Image Picker for image uploading.

To install the Image Picker Expo, visit https://docs.expo.dev/versions/latest/sdk/imagepicker/
const pickImage = async () => {
// No permissions request is necessary for launching the image library
let result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.All,
allowsEditing: true,
aspect: [4, 3],
quality: 1,
});

    console.log(result);

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }

};

Data Persistence

Data persistence, such as saving user data to a database, is achieved using AWS Amplify's API module and GraphQL. Here's a sample mutation to create a user:

mutation createUser($input: CreateUserInput!){
  createUser(input:$input){
id
name
handle
bio
subscriptionPrice
}
}

AWS Amplify provides a scalable backend for applications with authentication functionality, APIs, storage, and more.

Once properly configured, AWS Amplify can emit events, indicating the successful configuration of the Auth module, seen as logs like:
LOG {"channel":"auth","payload":{"event":"configured","data":null,"message":"The Auth category has been configured successfully"},"source":"Auth","patternInfo":[]}

let i test to do input on the new post page: and print the uesr with authenatcation. it console out sth like :
WARN Post: Fdfd
LOG {"Session": null, "attributes": {"email": "chormunlam@yahoo.com.hk", "email_verified": true, "name": "Chormun Lam", "nickname": "chormun", "sub": "64c87488-70e1-703e-ff3d-629462ee602c"}, "authenticationFlowType": "USER_SRP_AUTH", "client": {"endpoint": "https://cognito-idp.us-east-1.amazonaws.com/", "fetchOptions": {}}, "keyPrefix": "CognitoIdentityServiceProvider.587pnvtuco1omi1ck1jnpb4sja", "pool": {"advancedSecurityDataCollectionFlag": true, "client": {"endpoint": "https://cognito-idp.us-east-1.amazonaws.com/", "fetchOptions": [Object]}, "clientId": "587pnvtuco1omi1ck1jnpb4sja", "storage": [Function MemoryStorage], "userPoolId": "us-east-1_J6XCYb7AE", "wrapRefreshSessionCallback": [Function anonymous]}, "preferredMFA": "NOMFA", "signInUserSession": {"accessToken": {"jwtToken": "eyJraWQiOiJxa3R5S0lHTTJFZllzSnhOZlRxQ0RFOG9IQWhwZnNsaU9SSHRQSXYrRlJnPSIsImFsZyI6IlJTMjU2In0.

too messy , let me do
console.log(JSON.stringify(user, null, 2));
WARN Post: Aaa
LOG {
"username": "64c87488-70e1-703e-ff3d-629462ee602c",
"pool": {
"userPoolId": "us-east-1_J6XCYb7AE",
"clientId": "587pnvtuco1omi1ck1jnpb4sja",
"client": {
"endpoint": "https://cognito-idp.us-east-1.amazonaws.com/",
"fetchOptions": {}
},
"advancedSecurityDataCollectionFlag": true
},
"Session": null,
"client": {
"endpoint": "https://cognito-idp.us-east-1.amazonaws.com/",
"fetchOptions": {}
},
"signInUserSession": {
"idToken": {
"jwtToken": "eyJra

console.warn("Post: ", text);
//console.log(JSON.stringify(user, null, 2));
//we see the sub id is inside the attributes,
console.log(user.attributes.sub);

// LOG 64c87488-70e1-703e-ff3d-629462ee602c
await DataStore.save(new Post({ text, likes: 0, userID:user.attributes.sub }));

and now we got saved post and need to linked with user.
bug again:
LOG [{"_deleted": null, "_lastChangedAt": 1688684104307, "_version": 1, "createdAt": "2023-07-06T22:55:04.281Z", "id": "a278c489-27d4-472d-a24a-ef3d582f4f83", "image": null, "likes": 0, "text": "Hello , this is testing first post form the simulator. ", "updatedAt": "2023-07-06T22:55:04.281Z", "userID": "64c87488-70e1-703e-ff3d-629462ee602c"}]
ERROR TypeError: Cannot read property 'avatar' of undefined

This error is located at: in Post
no user...
let add some condition on the Post.js, make the avatoat , username, handler is null or not:
post.User?.avatar

## now set up the aws Storage

only sign in use can view , uplaod and delete
