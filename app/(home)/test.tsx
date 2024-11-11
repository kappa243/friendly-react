import TButton from "@/components/theme/TButton";
import { TText } from "@/components/theme/TText";
import { signOut } from "@/logic/auth";
import { firebase } from "@react-native-firebase/database";

export default function Test() {

  return (
    <>
      <TText>Hello!</TText>
      <TButton title="Sign out" onPress={signOut} />
      <TButton title="test" onPress={() => {
        const reference = firebase
          .app()
          .database("https://friendly-react-default-rtdb.europe-west1.firebasedatabase.app");

        reference.ref("/test").set("test");


      }} />
    </>
  );
}