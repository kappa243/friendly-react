import { Text, View } from "react-native";
import {UserView} from "@/components/user_profile/UserProfile"



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
    UserView()
  );
}
