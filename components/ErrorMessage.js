import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ErrorMessage({ error, visible }) {
  if (!visible || !error) {
    return null;
  } else {
    return (
      <View>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "SemiBold",
    fontSize: 12,
    color: "red",
  },
});
