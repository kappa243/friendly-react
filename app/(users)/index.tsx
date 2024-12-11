import {TView} from "@/components/theme/TView";
import {FlatList, Image, StyleSheet} from "react-native";
import {Friend, friends} from "@/constants/TMPfriends";
import {TText} from "@/components/theme/TText";
import TButton from "@/components/theme/TButton";

export default function UsersList() {
  const renderUserListItem = ({item}: {item:Friend}) =>(
    <TView>
      <TView>
        <Image
          source={{uri: item.photo}}
          style = {styles.image}>
        </Image>
      </TView>
      <TText type="title">{item.username}</TText>
      <TButton
        title="navaigate_to_profile">
        Zobacz
      </TButton>
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

  },
  image: {

  }
});