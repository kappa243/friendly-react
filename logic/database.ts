import { firebase } from "@react-native-firebase/database";
import { useMemo } from "react";

const db_url = "https://friendly-react-default-rtdb.europe-west1.firebasedatabase.app";

const db = firebase.app().database(db_url);

export function getDatabase() {
  const ref = firebase
    .app()
    .database(db_url);

  return ref;
}

export function getDBRef(path: string) {
  return db.ref(path);
}

export function useDBRef(path: string) {
  return useMemo(() => {
    return getDBRef(path);
  }, [path]);
}
