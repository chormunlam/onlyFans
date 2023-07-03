import { StyleSheet, Text, View, Image } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        {/*I mage */}
        <Image
          src="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png"
          style={styles.userImage}
        />
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
            Elon Musk
          </Text>
          <Text>@eleonmusk</Text>
        </View>
      </View>
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
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
});
