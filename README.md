# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)

---

![image](https://github.com/chormunlam/onlyFans/assets/71049920/1b8c0430-6947-4be2-a5b5-827bad368c0e)
this is the homepage. and what l learned here,
is render the component(function), and pass the prop form index.js (parent) to child (UserCard), and

- desturct the prop.user as {user}
- use FlatList to render list of item (array) to the screen.
  <FlatList data={users} renderItem={({item})=><UserCard user={item} />/>

still little confuse about css like

- where to put the overlay
- why overflow need to be hidden when we do BoarderRadius.

for the profile header, learned Link and useRouter hook:
router using Link, and onPress={() => router.back()}
