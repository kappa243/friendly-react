import {LocationObject} from "expo-location";
import {createContext, Context} from "react";

export const defaultLocation: LocationObject = {
  coords: {
    latitude: 50.0469432,
    longitude: 19.997153435836697,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  },
  timestamp: 0,
  mocked: true
};

export const LocationContext: Context<LocationObject> = createContext(defaultLocation);

