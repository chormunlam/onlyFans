import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import users from "../../assets/data/users";
import posts from "../../assets/data/posts";
import { useState } from "react";
import UserProfileHeader from "../../src/components/UserProfileHeader";
import Post from "../../src/components/Post";

const ProfilePage = () => {
  const [isSub, setSub] = useState(false);
  const router = useRouter();
  const { id } = useSearchParams();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return <Text>User not found!</Text>;
  }
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        ListHeaderComponent={() => (
          <UserProfileHeader user={user} isSub={isSub} setSub={setSub} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default ProfilePage;
