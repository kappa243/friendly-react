import { Text, View } from "react-native";
import {UserView} from "@/components/user_profile/UserProfile"
import {OwnProfileView} from "@/components/own_profile/OwnProfile"


export default function Index() {
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>Hello world!</Text>
    // </View>

    // for testing without navigation 
    <OwnProfileView/>
    //<UserView/>
  );
}
