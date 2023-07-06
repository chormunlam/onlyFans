import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
//import users from "../../assets/data/users";
//import posts from "../../assets/data/posts";
import { useState, useEffect } from "react";
import UserProfileHeader from "../../src/components/UserProfileHeader";
import Post from "../../src/components/Post";
import { Entypo } from "@expo/vector-icons";
import { DataStore } from "aws-amplify";
import { User, Post as PostModel } from "../../src/models";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [isSub, setSub] = useState(true);
  //const router = useRouter();
  const { id } = useSearchParams();
  //const user = users.find((u) => u.id === id);
  useEffect(() => {
    DataStore.query(User, id).then(setUser);
    DataStore.query(PostModel, (post) => post.userID.eq(id)).then(setPosts);
  }, [id]);

  if (!user) {
    return <Text>User not found!</Text>;
  }

  //console.log(JSON.stringify(user, null, 2));
  console.log(posts);

  if (!isSub) {
    return (
      <View>
        <UserProfileHeader user={user} isSub={isSub} setSub={setSub} />
        <View
          style={{
            backgroundColor: "gainsboro",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Entypo name="lock" size={50} color="gray" />
          <Text
            style={{
              backgroundColor: "royalblue",
              height: 50,
              borderRadius: 25,
              overflow: "hidden",
              justifyContent: "center",
              padding: 15,
              color: "white",
              margin: 20,
            }}
          >
            Subscribe to see user's posts
          </Text>
        </View>
      </View>
    );
  }
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post post={item} />}
      ListHeaderComponent={() => (
        <UserProfileHeader user={user} isSub={isSub} setSub={setSub} />
      )}
    />
  );
};

const styles = StyleSheet.create({});
export default ProfilePage;
