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
const newPost = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();
  const onPost = () => {
    console.warn("Post", text);
  };
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
