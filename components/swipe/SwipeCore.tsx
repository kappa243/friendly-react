import { DeviceMotion } from "expo-sensors";
import { useCallback, useEffect, useState } from "react";
import { Subscription } from "expo-modules-core/build/EventEmitter";
import SwipeCard from "./SwipeCard";
import { ToastAndroid } from "react-native";
import { UserData } from "@/logic/userData";
import { TView } from "../theme/TView";
import { TText } from "../theme/TText";
import { addFriend } from "@/logic/friendManager";

const SWAP_Y = 0.85;
const RESET_Y = 0.1;

export type SwipeState = "normal" | "swipe_left" | "swipe_right";

export default function SwipeCore({
  users: users_out
}: {
  users: UserData[];
}) {
  const [users] = useState(users_out);

  const [realX, setRealX] = useState(0.0);
  const [childX, setChildX] = useState(0.0);

  const _subscribe = useCallback(() => {
    const sub = DeviceMotion.addListener((data) => {
      if (data?.rotation?.gamma) {
        setRealX(data.rotation.gamma);
      }
    });

    return sub;
  }, []);

  const _unsubscribe = useCallback((sub: Subscription) => {
    sub && sub.remove();
  }, []);

  useEffect(() => {
    DeviceMotion.setUpdateInterval(65);
    const sub = _subscribe();

    return () => {
      _unsubscribe(sub);
    };
  }, [_subscribe, _unsubscribe]);


  const [swipeState, setSwipeState] = useState<SwipeState>("normal");
  const [selectedCard, setSelectedCard] = useState(0);

  useEffect(() => {
    // console.log("data", data);
    const gamma = realX;

    switch (swipeState) {
      case "normal":
        setChildX(gamma);

        if (gamma >= SWAP_Y) {
          setSwipeState("swipe_right");
          console.log("right");

          const text = `Added ${users[selectedCard].name} to friends!`;
          ToastAndroid.show(text, ToastAndroid.SHORT);
          addFriend(users[selectedCard].uid);

          setChildX(0);
        } else if (gamma <= -SWAP_Y) {
          setSwipeState("swipe_left");
          console.log("left");
          setChildX(0);
        }

        break;

      case "swipe_left":
      case "swipe_right":
        if (gamma <= RESET_Y && gamma >= -RESET_Y) {
          setSwipeState("normal");
          console.log("reset");

          setSelectedCard(prevSelectedCard => prevSelectedCard + 1);
        }
        break;
    }
  }, [realX, selectedCard, swipeState, users]);

  return (
    <TView style={[{ width: "100%", height: "100%", position: "relative" }]}>
      {users.map((data, index) => (
        // <TText key={card}>{index === selectedCard ? card : "none"}</TText>
        <SwipeCard key={index} data={data} style={{ zIndex: -index }} x={index === selectedCard ? childX : 0} state={index === selectedCard ? swipeState : "normal"} />
      ))}
      <TView style={{ zIndex: -1000, position: "absolute", width: "100%", height: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TText>No more users!</TText>
      </TView>
    </TView>
  );
}