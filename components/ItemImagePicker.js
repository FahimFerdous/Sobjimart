import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ItemImagePicker = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.screen}>
        <MaterialCommunityIcons
          name="camera"
          color="#a3a3a3"
          size={22}
          style={styles.icon}
        />
        <Text style={styles.text}>Capture an Image</Text>
      </View>
      {props.imageUrl && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Image
            source={{ uri: props.imageUrl }}
            style={{
              width: "100%",
              height: 220,
              borderRadius: 25,
              overflow: "hidden",
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",
    borderRadius: 25,
    padding: 5,
    marginVertical: 5,
  },
  text: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#282828",
    paddingTop: 6,
    paddingLeft: 5,
  },
  icon: {
    marginRight: 10,
    padding: 5,
  },
});

export default ItemImagePicker;
