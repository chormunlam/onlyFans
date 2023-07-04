import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import users from "../../assets/data/users";
import { StyleSheet } from "react-native-web";

import { useState } from "react";
import UserProfileHeader from "../../src/components/UserProfileHeader";
const ProfilePage = () => {
  const [isSub, setSub] = useState(false);
  const router = useRouter();
  const { id } = useSearchParams();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return <Text>User not found!</Text>;
  }

  return <UserProfileHeader user={user} isSub={isSub} setSub={setSub} />;
};

const styles = StyleSheet.create({});
export default ProfilePage;
