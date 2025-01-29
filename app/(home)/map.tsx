import {LatLng, LeafletView, MapMarker} from "react-native-leaflet-view";
import React, {useContext, useEffect, useState} from "react";
import {TView} from "@/components/theme/TView";
import {getUserData, UserData, useUserData} from "@/logic/userData";
import {useFriendList} from "@/logic/friendManager";
import {ActivityIndicator} from "react-native";
import {LocationContext} from "@/components/LocationProvider";

export default function Map() {
  const location = useContext(LocationContext);
  const [mapCenterPosition, setMapCenterPosition]: LatLng = useState({
    lat: location.coords.latitude,
    lng: location.coords.longitude
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
    setMapCenterPosition({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    });
  }, [location]);

  useEffect(() => {
    const friendMarkers = friendsData.filter((friend) => friend.location)
      .map(friend =>  {
        return {
          position: {
            lat: friend.location!.coords.latitude,
            lng: friend.location!.coords.longitude,
          },
          icon: "https://img.icons8.com/?size=100&id=19326&format=png&color=000000",
          size: [32,32],
          title: friend.name
        };
      });
    friendMarkers.push({
      position: {
        lat: location!.coords.latitude,
        lng: location!.coords.longitude,
      },
      icon: "https://img.icons8.com/?size=100&id=19326&format=png&color=000000",
      size: [32,32],
      title: "You"
    });
    setMarkers( friendMarkers);
  }, [friendsData, location, mapCenterPosition]);
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