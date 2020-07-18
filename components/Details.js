import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import CartItem from "../components/CartItem";

export default function Details(props) {
  const [showDetails, setshowDetails] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.headingContainer}>
        <Text style={{ color: "green", fontFamily: "medium" }}>
          Order ID: {props.orderId}
        </Text>
        <Text style={{ color: "green", fontFamily: "medium" }}>
          Date: {props.date}
        </Text>
      </View>
      <View style={styles.nameContainer}>
        <View>
          <Text style={{ color: "#003152", fontFamily: "medium" }}>
            Name: {props.name}
          </Text>
          <Text style={{ color: "#ff5959", fontFamily: "SemiBold" }}>
            Amount: {props.amount}
          </Text>
        </View>
        <View>
          <Text style={{ color: "#003152", fontFamily: "medium" }}>
            Mobile: {props.mobile}
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setshowDetails((prevState) => !prevState);
            }}>
            <View style={{ paddingTop: 5, alignItems: "flex-end" }}>
              <Text
                style={{
                  color: "#ff5959",
                  fontFamily: "SemiBold",
                  textDecorationLine: "underline",
                }}>
                {showDetails ? "Hide Details" : "View Details"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {showDetails && (
        <View style={styles.showDetails}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.prodId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.prodName}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5,
    overflow: "hidden",
    marginVertical: 7,
    padding: 5,
  },
  headingContainer: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  showDetails: {
    width: "100%",
    marginVertical: 5,
  },
  buttonContainer: {
    margin: 10,
  },
});
