import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const CartCounter = (props) => {
  const Cart = useSelector((state) => state.cart.counterItem);
  const counter = Cart ? Cart.length : 0;

  if (counter != 0) {
    return (
      <View style={styles.counterContainer}>
        <Text style={{ color: "white", fontFamily: "SemiBold" }}>
          {counter}
        </Text>
      </View>
    );
  }

  return <View></View>;
};

export default CartCounter;

const styles = StyleSheet.create({
  counterContainer: {
    backgroundColor: "rgba(255,89,89,0.8)",
    borderRadius: 12,
    position: "absolute",
    height: 23,
    width: 23,
    right: 20,
    bottom: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
});
