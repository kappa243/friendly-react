import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';

export default function Motion() {
    const [data, setData] = useState<DeviceMotionMeasurement | null>(null);
    const [subscription, setSubscription] = useState<any>(null);
    const [rotationHistory, setRotationHistory] = useState<number[]>([]);
    const historySize = 50;
    const samplingInterval = 100
    const rapidChangeThreshold = 0.5;
    const returnThreshold = 0.2;
  
    const subscribe = () => {
      setSubscription(
        DeviceMotion.addListener((deviceMotionData: DeviceMotionMeasurement) => {
          setData(deviceMotionData);
  
          const currentBeta = deviceMotionData.rotation?.beta ?? 0;
          updateRotationHistory(currentBeta);
          //doesRotationChangedRapidly();
        })
      );
  
      DeviceMotion.setUpdateInterval(samplingInterval);
    };
  
    const unsubscribe = () => {
      if (subscription) {
        subscription.remove();
        setSubscription(null);
      }
    };
  
    useEffect(() => {
      subscribe();
      return () => unsubscribe();
    }, []);
  
    const updateRotationHistory = (newBeta: number) => {

      setRotationHistory((prevHistory) => {
        const newHistory = [...prevHistory, newBeta];
        if (newHistory.length > historySize) {
          newHistory.shift(); 
        }
        //console.log(newHistory)
        doesRotationChangedRapidly(newHistory)
        return newHistory;
      });
    };
  
    const getRotationStatistics = (history: number[]) => {
      if (history.length === 0) return { first: 0, last: 0, min: 0, max: 0 };
  
      const first = history[0];
      const last = history[history.length - 1];
      const min = Math.min(...history);
      const max = Math.max(...history);
  
      return { first, last, min, max };
    };
  
    const doesRotationChangedRapidly = (historyList: number[]) => {
      if (historyList.length < 2) return; 
  
      const { first, last, min, max } = getRotationStatistics(historyList);  
      if (Math.abs(first - last) < returnThreshold) {
        if (first - min > rapidChangeThreshold) {
          alert(`Reject move ${first.toFixed(2)} | ${min.toFixed(2)} | ${last.toFixed(2)}`);
          setRotationHistory([0])
        } else if (max - first > rapidChangeThreshold) {
          alert(`Accept move ${first.toFixed(2)} | ${max.toFixed(2)} | ${last.toFixed(2)}`);
          setRotationHistory([0])
        }
      }
    };

  const { acceleration } = data || {};
  const { rotation } = data || {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Acceleration:</Text>
      <Text style={styles.text}>x: {acceleration?.x?.toFixed(2) ?? 'None'}</Text>
      <Text style={styles.text}>y: {acceleration?.y?.toFixed(2) ?? 'None'}</Text>
      <Text style={styles.text}>z: {acceleration?.z?.toFixed(2) ?? 'None'}</Text>

      <Text style={styles.text}>Rotation:</Text>
      <Text style={styles.text}>alpha: {rotation?.alpha?.toFixed(2) ?? 'None'}</Text>
      <Text style={styles.text}>beta: {rotation?.beta?.toFixed(2) ?? 'None'}</Text>
      <Text style={styles.text}>gamma: {rotation?.gamma?.toFixed(2) ?? 'None'}</Text>

      <View style={styles.buttonContainer}>
        <Button onPress={subscribe} title="Start" />
        <Button onPress={unsubscribe} title="Stop" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
