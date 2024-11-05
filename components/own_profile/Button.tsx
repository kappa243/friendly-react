import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function UserProfileButton({ title, onPress }) {
  return (
    <TouchableOpacity style={stylesButton.button} onPress={onPress}>
      <Text style={stylesButton.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const stylesButton = StyleSheet.create({
  button: {
    backgroundColor: '#098fb6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});