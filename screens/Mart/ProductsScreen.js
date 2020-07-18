import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";
import { Item, HeaderButtons } from "react-navigation-header-buttons";

import { useSelector, useDispatch } from "react-redux";
import * as ProductAction from "../../store/action/product";
import * as CartAction from "../../store/action/cart";
import CartCounter from "../../components/CartCounter";
import HeaderButton from "../../components/HeaderButton";

import Card from "../../components/Card";

const ProductsScreen = (props) => {
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

  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);

  const product = useSelector((state) => state.product.products);
  const cat = props.route.params.category;

  const FilterdItems = product.filter(
    (item) => item.category.indexOf(cat) >= 0
  );
  const dispatch = useDispatch();

  const loadProducts = async () => {
    setisRefreshing(true);
    await dispatch(ProductAction.loadProducts());
    setisRefreshing(false);
  };
  useEffect(() => {
    setisLoading(true);
    loadProducts();
    setisLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff5959" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={FilterdItems}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <Card
            imageUrl={itemData.item.imageUrl}
            name={itemData.item.name}
            prodId={itemData.item.id}
            minimumOrder={itemData.item.minOrder}
            unitPrice={itemData.item.unitPrice}
            onSelect={() => {
              props.navigation.navigate("ProductDetails", {
                id: itemData.item.id,
                title: itemData.item.name,
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({});
