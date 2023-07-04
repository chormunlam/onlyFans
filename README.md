![image](https://github.com/chormunlam/onlyFans/assets/71049920/0f26484a-5302-4405-a19d-2b01297b19fb)

- use Link to go to new post page
  ![image](https://github.com/chormunlam/onlyFans/assets/71049920/ccc1bc2f-3d34-48df-aba6-d5c2175a3050)
  what i learn in the new post page:
- ues expo image pick
- renter the text and image on the screen

need to install image picker expo

https://docs.expo.dev/versions/latest/sdk/imagepicker/

import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import \* as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
const [image, setImage] = useState(null);

const pickImage = async () => {
// No permissions request is necessary for launching the image library
let result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.All,
allowsEditing: true,
aspect: [4, 3],
quality: 1,
});

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

};

return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Button title="Pick an image from camera roll" onPress={pickImage} />
{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
</View>
);
}

![image](https://github.com/chormunlam/onlyFans/assets/71049920/bc797d1e-6e73-4766-a0ea-dddce16901b7)

this is profile page:
Learned:

- use margin negative
- use chatgpt to geneater bio for onlyfans......
- use condition to let user view the post or go to locked page

![image](https://github.com/chormunlam/onlyFans/assets/71049920/e6ecaaa9-7acb-485b-a2b6-70a1bd2f6105)

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
