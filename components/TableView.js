import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TableView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{props.productName}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text>x</Text>
        <Text style={styles.quantity}> {props.quantity}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>= {props.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  nameContainer: {
    width: "70%",
  },
  name: { fontFamily: "medium", fontSize: 14 },
  quantityContainer: {
    flexDirection: "row",
    width: "10%",
  },
  quantity: {
    fontFamily: "SemiBold",
    fontSize: 14,
  },
  priceContainer: {
    justifyContent: "flex-end",
    width: "20%",
  },
  price: {
    fontFamily: "medium",
    fontSize: 16,
    textAlign: "right",
  },
});
