import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function OrderConfirmationScreen(props) {
  const OrderId = props.route.params.code;
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Thank you!</Text>
      <Text style={styles.text}>Your Order is Confirmed</Text>
      <Text style={styles.code}>Order ID is : {OrderId}</Text>
      <Button
        title="Continue Shopping!"
        color="#ff5959"
        onPress={() => {
          props.navigation.navigate("Categories");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#141414",
  },
  code: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: "#ff5959",
    margin: 10,
  },
});
