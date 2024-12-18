import {TView} from "@/components/theme/TView";
import {FlatList, Image, StyleSheet} from "react-native";
import {TText} from "@/components/theme/TText";
import TButton from "@/components/theme/TButton";
import {getUserRef} from "@/logic/userData";
import {addFriend, useFriendList, useUserList} from "@/logic/friendManager";
import {useEffect, useState} from "react";
import {UserID} from "@/logic/auth";
import {useLockingFunction} from "@/hooks/useLockingHandle";

type UserDataImage = {
  uid: UserID;
  name: string;
  email: string;
  image: string
}

async function getUserDataImage(uid?: UserID): Promise<UserDataImage | null> {
  const ref = getUserRef(uid);

  const snapshot = await ref.once("value");
  const res = snapshot.val();

  if (res)
    res.uid = snapshot.key!;

  return res;
}

export default function UsersList() {
  const {action} = useLockingFunction();

  const users = useUserList();
  const friends = useFriendList();

  const [usersData, setUsersData] = useState<UserDataImage[]>([]);
  useEffect(() => {
    if (!users) {
      setUsersData([]);
      return;
    }
    let otherUsers: string[];
    if (!friends) {
      otherUsers = users;
    }
    else{
      otherUsers = users.filter((uid) => !friends.includes(uid));
    }
    Promise.all(otherUsers.map((uid) => getUserDataImage(uid)))
      .then((results) => {
        setUsersData(results.filter((user) => user !== null) as UserDataImage[]);
      });
  }, [friends, users]);

  const renderUserListItem = ({item}: {item:UserDataImage}) =>(
    <TView style={styles.item}>
      <TView>
        <Image
          source={{uri: item.image}}
          style = {styles.image}>
        </Image>
      </TView>
      <TText type="title">{item.name}</TText>
      <TText type="title">{}</TText>
      <TButton title="Zobacz"/>
      <TButton title="Dodaj" onPress={() => action(() => addFriend(item.uid))}/>
    </TView>
  );

  return (<TView>
    <FlatList style={styles.list}
      data={usersData}
      renderItem={renderUserListItem}
      keyExtractor={(item)=>(item.uid)}/>
  </TView>);
}

const styles = StyleSheet.create({
  list:{

  },
  item: {
    padding: 10,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
  },
});