import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import CartCounter from "../../components/CartCounter";
import { useSelector, useDispatch } from "react-redux";
import * as CartAction from "../../store/action/cart";

const ProductDetailsScreen = (props) => {
  //Header Start
  props.navigation.setOptions({
    headerRight: () => (
      <View>
        <CartCounter />
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="cart"
            iconName="ios-cart"
            onPress={() => {
              props.navigation.navigate("CartDetail");
            }}
          />
        </HeaderButtons>
      </View>
    ),
  });
  //Header End

  const [isItemAdded, setisItemAdded] = useState(false);
  const Allproduct = useSelector((state) => state.product.products);
  const Cart = useSelector((state) => state.cart.counterItem);

  const id = props.route.params.id;
  const selectedProduct = Allproduct.find((item) => item.id === id);
  let count = 0;
  Cart.forEach((item) => {
    item.id === id && count++;
  });
  useEffect(() => {
    if (count != 0) {
      setisItemAdded(true);
    }
  }, []);

  const dispatch = useDispatch();
  const AddButtonHandler = useCallback(() => {
    dispatch(CartAction.addToCart(selectedProduct));
    setisItemAdded(true);
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: selectedProduct.imageUrl }}
          />
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.label}>Unit Price:</Text>
          <Text style={styles.price}>{selectedProduct.unitPrice} BDT</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.label} numberOfLines={2}>
            Minimum Order:
          </Text>
          <Text style={styles.price}>{selectedProduct.minOrder} KG</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.label} numberOfLines={2}>
            Last Storage Date:
          </Text>
          <Text style={styles.price}>{selectedProduct.storedDate}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label} numberOfLines={2}>
            Product Details:
          </Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </View>
        {!isItemAdded && (
          <View style={styles.buttonCOntainer}>
            <Button
              title="Add to Cart"
              color="#ff5959"
              onPress={AddButtonHandler}
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
            <View style={{ margin: 10 }}>
              <Text style={{ fontFamily: "SemiBold", fontSize: 18 }}>
                {count}
              </Text>
            </View>
            <View style={styles.addRemoveButton}>
              <Button
                title="-"
                color="#ff5959"
                onPress={() => {
                  dispatch(CartAction.addToCart(selectedProduct));
                }}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 10,
  },
  imageContainer: {
    height: 300,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  priceContainer: {
    flexDirection: "row",
    marginVertical: 10,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: "2%",
  },
  label: {
    fontFamily: "medium",
    fontSize: 18,
    width: "60%",
    color: "#38433c",
  },
  price: {
    fontFamily: "SemiBold",
    fontSize: 20,
    width: "40%",
    color: "#252c28",
  },
  details: {
    marginVertical: 10,
    color: "#38433c",
    marginLeft: "2%",
  },
  description: {
    fontFamily: "regular",
    fontSize: 14,
    color: "#252c28",
  },
  buttonCOntainer: {
    margin: 10,

    alignItems: "center",
  },
  counterContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addRemoveButton: {
    padding: 5,
    width: 50,
  },
});
