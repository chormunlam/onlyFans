# onlyFans Clone

This project is an onlyFans clone, built using React Native for the front end and AWS Amplify for the back end.

HomePage using react native,

![Homepage Image](https://github.com/chormunlam/onlyFans/assets/71049920/0f26484a-5302-4405-a19d-2b01297b19fb)

Final homepage:
![image-20230707070847899](/Users/chormunlam/Library/Application Support/typora-user-images/image-20230707070847899.png)

## Homepage Features

- sets up the UI.

- handles user authentication.

- fetches user data from AWS Amplify DataStore.

- renders the user interface with a list of users using a custom `UserCard` component.

  - UserCard: clickable and redirect to their profile page.

  - ![image-20230707072838418](/Users/chormunlam/Library/Application Support/typora-user-images/image-20230707072838418.png)

    - Import Statements:

      - The component imports various components from `react-native`, including `ImageBackground`, and `Pressable`.
      - It also imports the `Link` component from `expo-router` to handle navigation.

    - Function Component:

      - The component is a function component named `UserCard`, which accepts a `user` prop from parent(homepage).

      - The `user` prop represents user data passed from the parent component.

        ```jsx
        //parent
        <FlatList
          data={users}
          renderItem={({ item }) => <UserCard user={item} />}
          showsVerticalScrollIndicator={false}
        />
        ```

    - Rendering:

      - The component renders a `Link` component from `expo-router` to enable navigation to a specific user's page. The `href` prop specifies the destination path, which includes the `user` object's `id` property.

        ```jsx
        <Link href={`/user/${user.id}`} asChild>
              <Pressable>
                <ImageBackground
                //...codes
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
            </Link>
        ```

      - Inside the `Link` component, there's a `Pressable` component that wraps the content of the user card.

      - The `Pressable` component allows interaction with the user card, such as onPress events.

      - The `ImageBackground` component serves as the background for the user card. It displays the `user` object's `coverImage` property.

      - Inside the `ImageBackground`, there's an `overlay` view that creates a semi-transparent overlay using an absolute positioning technique (`...StyleSheet.absoluteFill`).

      - The user's avatar image is displayed using the `Image` component, with the source set to the `user` object's `avatar` property.

      - A `View` component is used to display the user's name and handle.

      - Two `Text` components display the user's name and handle, respectively.

## Profile Page

Call [id].js in app folder, the id is for dynamic routing using dynamic parameter that can be any value. The profile page includes features such as:

- Render the usr's profile header
- Fetches user and post data
- Conditional(subscription status) rendering for viewing posts or a locked page(if not subscription)
- Display their posts

![image-20230707074319871](/Users/chormunlam/Library/Application Support/typora-user-images/image-20230707074319871.png)![image-20230707074337971](/Users/chormunlam/Library/Application Support/typora-user-images/image-20230707074337971.png)

- Notable imports include `View`, `Text`, `StyleSheet`, `FlatList` from `react-native`, and `useRouter`, `useSearchParams` from `expo-router`.

  The `useSearchParams` hook retrieves the `id` parameter from the URL search parameters. It is then used to fetch the user data and posts data specific to that `id` from AWS Amplify DataStore.

- Mostly aws backend:

  - The `useEffect` hook is used to fetch the user and posts data from AWS Amplify DataStore based on the `id` parameter.

  - The fetched user data is stored in the `user` state using the `setUser` function, and the fetched posts data is stored in the `posts` state using the `setPosts` function

    ```jsx
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [isSub, setSub] = useState(true);
    //const router = useRouter();
    const { id } = useSearchParams();
    ```

  - The user data is fetched using the `DataStore.query` method, passing the `User` model and the `id` parameter.

  - The post data is fetched using the `DataStore.query` method, filtering the `PostModel` by the `userID` field matching the `id` parameter.

    ```jsx
    seEffect(() => {
      DataStore.query(User, id).then(setUser); //form aws Model
      DataStore.query(PostModel, (post) => post.userID.eq(id)).then(setPosts);
    }, [id]);
    ```

- Rendering:

  - If the `isSub` state is `false`, it renders a view indicating that the user's posts are only visible to subscribers.

  - If the isSub state is true, it renders a FlatList component to display the user's posts.

    - The `FlatList` is populated with the `posts` state as the data source.

    - Each post is rendered using the `Post` component.,// Postfile([id.js]) page pass the post to Post.js

      ```jsx
      useEffect(() => {
        DataStore.query(User, post.userID).then(setUser);
      }, []);
      ```

      The `DataStore.query` method queries the `User` model with the `post.userID` as the identifier. Once the user data is fetched, the `setUser` function is called to update the `user` state variable. The empty dependency array (`[]`) ensures that this effect runs only once when the component mounts. No dependency, so no re-run again.

      ```jsx
      useEffect(() => {
        if (post.image) {
          Storage.get(post.image).then(setImageUri);
        }
      }, [post.image]);
      ```

      for fetching the URI of the post's image (if available). If `post.image` exists, the `Storage.get` method provided by AWS Amplify is used to fetch the image's URI. Once the URI is obtained, the `setImageUri` function is called to update the `imageUri` state variable. This effect runs whenever the value of `post.image` changes.

    - The `ListHeaderComponent` prop is used to render the `UserProfileHeader` component, which displays the user's profile information.

      ![Profile Page Image](https://github.com/chormunlam/onlyFans/assets/71049920/bc797d1e-6e73-4766-a0ea-dddce16901b7)

## newPost page

- rendering a form to create a new post.
  ![New Post Image](https://github.com/chormunlam/onlyFans/assets/71049920/ccc1bc2f-3d34-48df-aba6-d5c2175a3050)
- Features:
  - Image uploading with Expo Image Picker
  - Rendering text and images on the screen

* Import `Crypto` from Amplify and Expo libraries.//for uniq id #

  ```jsx
  import * as Crypto from "expo-crypto";
  ```

* Posting Functionality:

  - The `onPost` function is called when the "Post" button is pressed.

  - It uploads the selected image using the `uploadImage` function and obtains an `imageKey` for storing the image in AWS S3.

    ```jsx
    const onPost = async () => {
      console.warn("Post: ", text);
      const imageKey = await uploadImage();
      //console.log(JSON.stringify(user, null, 2));
      //we see the sub id is inside the attributes,
      //console.log(user.attributes.sub);
      await DataStore.save(
        new Post({
          text,
          likes: 0,
          userID: user.attributes.sub,
          image: imageKey,
        })
      ); //we got the user id relation in our post table
      setText(""); //but we need to get user id form sign in layer
      setImage("");
    };

    async function uploadImage() {
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        const fileKey = `${Crypto.randomUUID()}.png`;
        await Storage.put(fileKey, blob, {
          contentType: "image/jpeg", // contentType is optional
        });
        return fileKey;
      } catch (err) {
        console.log("Error uploading file:", err);
      }
    }
    ```

  - Then, it uses the `DataStore.save` method to save a new `Post` object with the `text`, `likes`, `userID`, and `image` properties.

  - The `text` and `image` state variables are cleared after the post is saved.

* Image Handling:

  - The `pickImage` function is called when the user taps the "image" icon.

  - It launches the image library using `ImagePicker.launchImageLibraryAsync` from Expo's ImagePicker library.

  - The selected image's URI is stored in the `image` state variable.

  - To install the Image Picker Expo, visit https://docs.expo.dev/versions/latest/sdk/imagepicker/

    ```jsx
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
    ```

* Rendering:

  - The component renders a form for creating a new post.
  - It includes a back button, a title, a text input for composing the post, and an "image" icon for selecting an image.
  - If an image is selected, it is displayed using the `Image` component.
  - The "Post" button triggers the `onPost` function when pressed.

## AWS Backend

To integrate AWS Amplify as a backend service, follow the steps outlined [here](https://ui.docs.amplify.aws/react-native/getting-started/installation).

To install necessary dependencies, use:

```bash
npx expo install @aws-amplify/ui-react-native aws-amplify react-native-safe-area-context @react-native-async-storage/async-storage @react-native-community/netinfo
```

## Installation and Configuration

To set up the project and its dependencies:

1. Run the following command to install dependencies:

```bash
npx expo install @aws-amplify/ui-react-native aws-amplify react-native-safe-area-context @react-native-async-storage/async-storage @react-native-community/netinfo
```

To configure AWS Amplify:

```jsx
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
```

More about Amplify Authenticator can be found https://ui.docs.amplify.aws/react-native/connected-components/authenticator

Once properly configured, AWS Amplify can emit events, indicating the successful configuration of the Auth module, seen as logs like

LOG {"channel":"auth","payload":{"event":"configured","data":null,"message":"The Auth category has been configured successfully"},"source":"Auth","patternInfo":[]}

## Data Persistence

Data persistence, such as saving user data to a database, is achieved using AWS Amplify's API module and GraphQL. Here's a sample mutation to create a user:

```json
mutation createUser($input: CreateUserInput!){
  createUser(input:$input){
id
name
handle
bio
subscriptionPrice
}
}
```

let i test to do input on the new post page: and print the uesr with authenatcation. it console out sth like :
WARN Post: Fdfd

```ouput
LOG {"Session": null, "attributes": {"email": "chormunlam@yahoo.com.hk", "email_verified": true, "name": "Chormun Lam", "nickname": "chormun", "sub": "64c87488-70e1-703e-ff3d-629462ee602c"}, "authenticationFlowType": "USER_SRP_AUTH", "client": {"endpoint": "https://cognito-idp.us-east-1.amazonaws.com/", "fetchOptions": {}}, "keyPrefix": "CognitoIdentityServiceProvider.587pnvtuco1omi1ck1jnpb4sja", "pool": {"advancedSecurityDataCollectionFlag": true, "client": {"endpoint": "https://cognito-idp.us-east-1.amazonaws.com/", "fetchOptions": [Object]}, "clientId": "587pnvtuco1omi1ck1jnpb4sja", "storage": [Function MemoryStorage], "userPoolId": "us-east-1_J6XCYb7AE", "wrapRefreshSessionCallback": [Function anonymous]}, "preferredMFA": "NOMFA", "signInUserSession": {"accessToken": {"jwtToken": "eyJraWQiOiJxa3R5S0lHTTJFZllzSnhOZlRxQ0RFOG9IQWhwZnNsaU9SSHRQSXYrRlJnPSIsImFsZyI6IlJTMjU2In0.


```

```json
//too messy , let me do
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


```

To check user.id

```
console.warn("Post: ", text);
//console.log(JSON.stringify(user, null, 2));
//we see the sub id is inside the attributes,
console.log(user.attributes.sub);

// LOG 64c87488-70e1-703e-ff3d-629462ee602c
await DataStore.save(new Post({ text, likes: 0, userID:user.attributes.sub }));
```

and now we got saved post and need to linked with user.
bug again:

```output
LOG [{"_deleted": null, "_lastChangedAt": 1688684104307, "_version": 1, "createdAt": "2023-07-06T22:55:04.281Z", "id": "a278c489-27d4-472d-a24a-ef3d582f4f83", "image": null, "likes": 0, "text": "Hello , this is testing first post form the simulator. ", "updatedAt": "2023-07-06T22:55:04.281Z", "userID": "64c87488-70e1-703e-ff3d-629462ee602c"}]
ERROR TypeError: Cannot read property 'avatar' of undefined

This error is located at: in Post
no user...
let add some condition on the Post.js, make the avatoat , username, handler is null or not:
post.User?.avatar
```

## Set up the aws Storage

only sign in use can view , uplaod and delete

do git push , the pull the amiply, now we got Storage,

Successfully pulled backend environment staging from the cloud.
✅
✅ GraphQL schema compiled successfully.

Edit your schema at /Users/chormunlam/Desktop/onlyFans/amplify/backend/api/OnlyFans/schema.graphql or place .graphql files in a directory at /Users/chormunlam/Desktop/onlyFans/amplify/backend/api/OnlyFans/schema
Successfully generated models. Generated models can be found in /Users/chormunlam/Desktop/onlyFans/src
Post-pull status:

​ Current Environment: staging

┌──────────┬───────────────────────────┬───────────┬───────────────────┐
│ Category │ Resource name │ Operation │ Provider plugin │
├──────────┼───────────────────────────┼───────────┼───────────────────┤
│ Api │ OnlyFans │ No Change │ awscloudformation │
├──────────┼───────────────────────────┼───────────┼───────────────────┤
│ Auth │ OnlyFans │ No Change │ awscloudformation │
├──────────┼───────────────────────────┼───────────┼───────────────────┤
│ Storage │ s3onlyfansstorage1de8113a │ No Change │ awscloudformation │
└──────────┴───────────────────────────┴───────────┴───────────────────┘
