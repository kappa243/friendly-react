import TButton from "@/components/theme/TButton";
import { TText } from "@/components/theme/TText";
import { signOut } from "@/logic/auth";

export default function Test() {

  return (
    <>
      <TText>Hello!</TText>
      <TButton title="Sign out" onPress={signOut} />
    </>
  );
}