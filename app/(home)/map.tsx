import {LatLng, LeafletView, MapMarker} from "react-native-leaflet-view";
import React, {useEffect, useState} from "react";
import {TView} from "@/components/theme/TView";
import {getUserData, UserData, useUserData} from "@/logic/userData";
import {useFriendList} from "@/logic/friendManager";
import {ActivityIndicator} from "react-native";

export default function Map() {
  const [mapCenterPosition, setMapCenterPosition]: LatLng = useState({
    lat: 50.0469432,
    lng: 19.997153435836697
  });

  const userData = useUserData();
  const friends = useFriendList();

  const [friendsData, setFriendsData] = useState<UserData[]>([]);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  useEffect(() => {
    if (!friends) {
      setFriendsData([]);
      return;
    }

    Promise.all(friends.map((uid) => getUserData(uid)))
      .then((results) => {
        setFriendsData(results.filter((user) => user !== null) as UserData[]);
      });

  }, [friends]);
  useEffect(() => {
    setMarkers(friendsData.map(friend =>  {
      return {
        position: mapCenterPosition,
        icon: "https://img.icons8.com/?size=100&id=19326&format=png&color=000000",
        size: [32,32],
        title: friend.name
      };
    }));
  }, [friendsData, mapCenterPosition]);
  return (
    <TView 
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      {!userData ? <ActivityIndicator size="large" /> :
        <>
          <LeafletView
            mapCenterPosition={mapCenterPosition}
            mapMarkers={markers}
          />
        </>
      }
    </TView>
  );
}