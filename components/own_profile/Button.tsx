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
    backgroundColor: '#2f2c2a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 0,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ece0d7',
    fontSize: 16,
    fontWeight: '600',
  },
});