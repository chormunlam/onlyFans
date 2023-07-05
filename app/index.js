import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { FlatList } from "react-native-gesture-handler";
//import users from "../assets/data/users";
import UserCard from "../src/components/UserCard";
import { Link } from "expo-router";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { User } from "../src/models";

//const user = users[1];

export default function Page() {
  const { signOut } = useAuthenticator();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    DataStore.query(User)
      .then(setUsers)
      .catch((error) => console.error("DataStore query error:", error));
  }, []);

  return (
    <View style={styles.container}>
      <Link href={"/newPost"}>New Post</Link>
      <Text onPress={() => signOut()}>Sign Out</Text>
      {/* <UserCard user={users[0]} /> */}
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
  },
});
