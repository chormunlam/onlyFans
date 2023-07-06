import { Text, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { User } from "../models";

const Post = ({ post }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    DataStore.query(User, post.userID).then(setUser);
  }, []);
  return (
    <View style={{ marginVertical: 15 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Image
          src={user?.avatar} //check if this null
          style={{ width: 50, aspectRatio: 1, borderRadius: 50 }}
        />
        <View>
          <Text style={{ fontWeight: "600", marginBottom: 3, fontSize: 16 }}>
            {user?.name}
          </Text>
          <Text style={{ color: "grey" }}>@{user?.handle}</Text>
        </View>
        <View
          style={{
            marginLeft: "auto",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ marginRight: 5, color: "grey" }}>3 hours ag</Text>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color="black"
            style={{ color: "grey" }}
          />
        </View>
      </View>
      <Text style={{ margin: 10, lineHeight: 18 }}>{post.text}</Text>
      {Post.image && (
        <Image src={post.image} style={{ width: "100%", aspectRatio: 1 }} />
      )}
      <View style={{ margin: 10, flexDirection: "row" }}>
        <Entypo
          name="heart-outlined"
          size={22}
          color="black"
          style={{ marginRight: 15 }}
        />
        <MaterialIcons
          name="monetization-on"
          size={22}
          color="black"
          style={{ marginRight: 15 }}
        />
      </View>
      <Text style={{ fontWeight: "500", marginHorizontal: 10 }}>
        {post.likes} Likes
      </Text>
    </View>
  );
};

export default Post;
