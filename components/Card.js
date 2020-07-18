import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  Button,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as CartAction from "../store/action/cart";

const Card = (props) => {
  const prodId = props.prodId;
  const Allproduct = useSelector((state) => state.product.products);
  const selectedProduct = Allproduct.find((item) => item.id === prodId);
  const Cart = useSelector((state) => state.cart.counterItem);
  const [isItemAdded, setisItemAdded] = useState(false);

  const dispatch = useDispatch();
  let count = 0;

  Cart.forEach((item) => {
    item.id === prodId && count++;
  });

  useEffect(() => {
    if (count != 0) {
      setisItemAdded(true);
    }
  }, []);

  const AddItemHandler = () => {
    dispatch(CartAction.addToCart(selectedProduct));
    setisItemAdded(true);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.touchable}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#CCC")}
          useForeground
          delayPressIn={0}
          onPress={props.onSelect}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image style={styles.Image} source={{ uri: props.imageUrl }} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {props.name}
              </Text>
              <Text style={styles.minOrder}>
                Min Order : {props.minimumOrder} Kg
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>BDT: {props.unitPrice}</Text>
              {!isItemAdded && (
                <View style={styles.buttonContainer}>
                  <Button
                    title="Buy"
                    color="#ff5959"
                    onPress={AddItemHandler}
                  />
                </View>
              )}
              {isItemAdded && (
                <View style={styles.counterContainer}>
                  <View style={styles.addRemoveButton}>
                    <Button
                      title="+"
                      color="#ff5959"
                      onPress={() => {
                        dispatch(CartAction.addToCart(selectedProduct));
                      }}
                    />
                  </View>
                  <View style={{ margin: 5 }}>
                    <Text style={{ fontFamily: "medium", fontSize: 16 }}>
                      {count}
                    </Text>
                  </View>
                  <View style={styles.addRemoveButton}>
                    <Button
                      title="-"
                      color="#ff5959"
                      onPress={() => {
                        dispatch(CartAction.removeFromCart(selectedProduct.id));
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  screen: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5,
  },

  container: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
  },
  imageContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    height: "85%",
    width: "27%",
  },
  Image: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    marginTop: 8,
    width: "40%",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
    color: "#252c28",
  },
  minOrder: {
    fontFamily: "regular",
    marginTop: 5,
    color: "#38433c",
  },
  priceContainer: {
    width: "33%",

    margin: 10,
    flex: 1,
  },
  price: {
    fontFamily: "medium",
    fontSize: 18,
    color: "#38433c",
  },
  buttonContainer: {
    marginTop: 10,
    marginRight: 5,
  },
  counterContainer: {
    marginRight: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addRemoveButton: {
    padding: 5,
  },
});
