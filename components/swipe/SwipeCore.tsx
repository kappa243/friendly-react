import { DeviceMotion } from "expo-sensors";
import { useCallback, useEffect, useState } from "react";
import { Subscription } from "expo-modules-core/build/EventEmitter";
import SwipeCard from "./SwipeCard";
import { View } from "react-native";

const SWAP_Y = 0.85;
const RESET_Y = 0.1;


const CARDS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export type SwipeState = "normal" | "swipe_left" | "swipe_right";

export default function SwipeCore() {
  const [realX, setRealX] = useState(0.0);

  const [cards, setCards] = useState(CARDS);
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
  }, [realX, swipeState]);

  return (
    <View style={[{ width: "100%", height: "100%", position: "relative" }]}>
      {cards.map((card, index) => (
        // <TText key={card}>{index === selectedCard ? card : "none"}</TText>
        <SwipeCard key={index} style={{ zIndex: -index }} x={index === selectedCard ? childX : 0} state={index === selectedCard ? swipeState : "normal"} />
      ))}
      {/* <SwipeCard x={rotation.sensor} state={swipeState} /> */}
      {/* <SwipeCard style={{ zIndex: -2 }} x={0} state={"normal"} /> */}
    </View>
  );
}