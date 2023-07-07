import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Image,
} from "react-native";
import { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DataStore, Storage } from "aws-amplify";
import { Post } from "../src/models";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import * as Crypto from "expo-crypto";

const newPost = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const { user } = useAuthenticator();
  const router = useRouter();

  const onPost = async () => {
    console.warn("Post: ", text);
    const imageKey = await uploadImage();
    //console.log(JSON.stringify(user, null, 2));
    //we see the sub id is inside the attributes,
    //console.log(user.attributes.sub);
    await DataStore.save(
      new Post({ text, likes: 0, userID: user.attributes.sub, image: imageKey })
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //only image
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={28}
          color="black"
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontWeight: "500", fontSize: 20 }}>New Post</Text>
      </View>

      <TextInput
        placeholder="compose new post.."
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={3}
      />
      <View style={{ marginVertical: 15 }}>
        <EvilIcons onPress={pickImage} name="image" size={24} color="black" />
      </View>

      {/* only render if image slected */}
      {image && <Image src={image} style={{ width: "100%", aspectRatio: 1 }} />}
      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
};

export default newPost;
