import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import users from "../../assets/data/users";
import { StyleSheet } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
const ProfilePage = () => {
  const router = useRouter();
  const { id } = useSearchParams();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return <Text>User not found!</Text>;
  }

  return (
    <View>
      <ImageBackground source={{ uri: user.coverImage }} style={styles.cover}>
        <View style={styles.overlay} />
        <SafeAreaView
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            onPress={() => router.back()}
            name="arrow-back"
            size={28}
            color="white"
            style={{ marginRight: 10 }}
          />
          <View>
            <Text style={{ color: "white" }}>{user.name}</Text>
            <Text style={{ color: "white" }}>
              1.4k Posts · 65.3k Likes · 15.3K Fans
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <Text>ProfilePage: {user.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: 200,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
export default ProfilePage;
