import {Friend, friends} from "@/constants/TMPfriends";
import {TView} from "@/components/theme/TView";
import {FlatList, StyleSheet} from "react-native";

export function UsersList() {
  const renderUserListItem = ({item}: {item:Friend}) =>(
    <TView>

    </TView>
  );
  return (<TView>
    <FlatList style={styles.item}
      data={friends}
      renderItem={renderUserListItem}
      keyExtractor={(item)=>(item.id)}/>
  </TView>);
}

const styles = StyleSheet.create({
  item: {

  }
});