import { Keyboard, KeyboardAvoidingView, StyleProp, TouchableWithoutFeedback, ViewStyle } from "react-native";
import { TView } from "../theme/TView";
import { StyleSheet } from "react-native";

export type KeyboardDismissViewProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function KeyboardDismissView({ children, style }: KeyboardDismissViewProps) {
  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TView style={[styles.view, style]}>
          {children}
        </TView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1
  },
  view: {
    flex: 1,
    padding: 10,
    justifyContent: "center"
  }
});

KeyboardDismissView.displayName = "KeyboardDismissView";

export default KeyboardDismissView;