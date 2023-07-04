import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router";

import { StyleSheet } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const UserProfileHeader = ({ user, isSub, setSub }) => {
  const router = useRouter();

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
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",

            marginTop: -50,
          }}
        >
          <Image src={user.avatar} style={styles.Image} />
          <FontAwesome name="share-square-o" size={24} color="royalblue" />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "600", marginVertical: 5 }}>
          {user.name}
        </Text>
        <Text
          style={{
            marginBottom: 10,
            color: "gray",
          }}
        >
          @{user.handle}
        </Text>
        <Text style={{ lineHeight: 20 }}>{user.bio}</Text>

        <Text style={{ color: "gray", marginTop: 20, fontWeight: "bold" }}>
          Subscription
        </Text>

        <Pressable
          onPress={() => setSub(!isSub)}
          style={[
            styles.button,
            { backgroundColor: isSub ? "white" : "royalblue" },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isSub ? "royalblue" : "white" },
            ]}
          >
            {isSub ? "Subscribed" : "Subscribe"}
          </Text>
          <Text
            style={[
              styles.buttonText,
              { color: isSub ? "royalblue" : "white" },
            ]}
          >
            {user.subscriptionPrice === 0
              ? "FOR FREE"
              : `$${user.subscriptionPrice}/month`}
          </Text>
        </Pressable>
      </View>
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
  Image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
  button: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    borderRadius: 50,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: { color: "royalblue", fontWeight: "600" },
});
export default UserProfileHeader;
