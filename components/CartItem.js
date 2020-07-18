import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} - </Text>
        <Text style={styles.mainText}> {props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{props.amount.toFixed(2)}</Text>
        {props.touchable && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={props.onRemove}>
            <Ionicons name="ios-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1.5,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginBottom: 10,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "medium",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "SemiBold",
    fontSize: 16,
  },

  deleteButton: {
    marginLeft: 20,
  },
});
