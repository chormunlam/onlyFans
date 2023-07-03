import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import users from "../assets/data/users";

//const user = users[1];

function UserCard({ user }) {
  //const user = props.user;
  //const { user } = props;
  return (
    <ImageBackground source={{ uri: user.coverImage }} style={styles.userCard}>
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
          {user.handle}
        </Text>
      </View>
    </ImageBackground>
  );
}

export default function Page() {
  return (
    <View style={styles.container}>
      <UserCard user={users[0]} />
      <UserCard user={users[1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
