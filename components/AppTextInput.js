import React from "react";

import { StyleSheet, View, TextInput } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppTextInput(props) {
  return (
    <View style={{ ...styles.container, ...styles }}>
      <View>
        <MaterialCommunityIcons
          name={props.icon}
          color="#a3a3a3"
          size={22}
          style={styles.icon}
        />
      </View>
      <View style={styles.textinput}>
        <TextInput
          placeholder={props.placeholder}
          style={styles.text}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    borderRadius: 25,
    padding: 5,
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
    padding: 5,
  },
  textinput: {
    width: "100%",
    borderRadius: 25,
  },
  text: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#282828",
  },
});
