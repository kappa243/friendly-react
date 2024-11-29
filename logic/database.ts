import { firebase } from "@react-native-firebase/database";

const db_url = "https://friendly-react-default-rtdb.europe-west1.firebasedatabase.app";

export function getDatabase() {
  const ref = firebase
    .app()
    .database(db_url);

  return ref;
}