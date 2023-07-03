import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import users from "../assets/data/users";
import UserCard from "../src/components/UserCard";

//const user = users[1];

export default function Page() {
  return (
    <View style={styles.container}>
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
  },
});
