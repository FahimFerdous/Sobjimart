import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import * as CartAction from "../../store/action/cart";

import CartItem from "../../components/CartItem";

const CartScreen = (props) => {
  const CartItemTotal = useSelector((state) => state.cart.totalAmount);

  const cartItem = useSelector((state) => {
    const transformedCartItem = [];
    for (const key in state.cart.item) {
      transformedCartItem.push({
        prodId: key,
        prodName: state.cart.item[key].prodName,
        quantity: state.cart.item[key].quantity,
        prodPrice: state.cart.item[key].prodPrice,
        sum: state.cart.item[key].sum,
      });
    }
    return transformedCartItem.sort((a, b) => (a.prodId > b.prodId ? 1 : -1));
  });
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <FlatList
        data={cartItem}
        keyExtractor={(item) => item.prodId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.prodName}
            amount={itemData.item.sum}
            touchable
            onRemove={() => {
              dispatch(CartAction.removeFromCart(itemData.item.prodId));
            }}
          />
        )}
      />
      <View style={styles.summary}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Total: </Text>
          <Text style={styles.amount}>Tk. {CartItemTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.checkout}>
          <View style={styles.buttonCOntainer}>
            <Button
              color="#ff5959"
              title="CheckOut"
              onPress={() => {
                props.navigation.navigate("OrderDetails");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: { margin: 10 },
  summary: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryText: {
    fontFamily: "medium",
    fontSize: 18,
    paddingLeft: 10,
  },
  amount: {
    color: "#1c9e73",
    fontFamily: "SemiBold",
    fontSize: 18,
    marginRight: 10,
  },
  checkout: {
    alignItems: "center",
    paddingTop: 10,
  },
  buttonCOntainer: {
    borderRadius: 15,
    borderColor: "#ff5959",
    borderWidth: 1,
    overflow: "hidden",
  },
});
