import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
//const user = users[1];

export default function UserCard({ user }) {
  //const user = props.user;
  //const { user } = props;
  return (
    <Link href={`/user/${user.id}`} asChild>
      <Pressable>
        <ImageBackground
          source={{ uri: user.coverImage }}
          style={styles.userCard}
        >
          <View style={styles.overlay} />
          {/*I mage */}
          <Image src={user.avatar} style={styles.userImage} />
          {/*Image */}
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "400",
                marginBottom: 5,
              }}
            >
              @{user.handle}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: "gray",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 5,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // position: "absolute",
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    ...StyleSheet.absoluteFill,
  },
});
