import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Switch,
  ActivityIndicator,
} from "react-native";

import ModalView from "../../components/ModalView";
import { useDispatch, useSelector } from "react-redux";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";

import * as ProductAcion from "../../store/action/product";

import ItemList from "../../components/ItemList";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.switchTitle}>{props.label}</Text>
      <Switch
        style={styles.switchView}
        value={props.state}
        trackColor={{ true: "#ff5959" }}
        thumbColor={"#ccc"}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const UpdateProductsScreen = (props) => {
  const [modalLoaded, setmodalLoaded] = useState(false);
  const [isVegetables, setisVegetables] = useState(false);
  const [isFruits, setIsFruits] = useState(false);
  const [isFishMeat, setIsFishMeat] = useState(false);
  //Header Start
  props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="filter"
          iconName="ios-funnel"
          onPress={() => {
            setmodalLoaded(true);
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-list"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  });
  //Header End

  const [isLoading, setisLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);

  const products = useSelector((state) => state.product.filteredProducts);
  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      Vegetables: isVegetables,
      Fruits: isFruits,
      FishMeat: isFishMeat,
    };
    dispatch(ProductAcion.setFilter(appliedFilters));
    setmodalLoaded(false);
  }, [dispatch, isVegetables, isFruits, isFishMeat]);

  const loadedProduct = async () => {
    setisRefreshing(true);
    await dispatch(ProductAcion.loadProducts());
    setisRefreshing(false);
  };
  useEffect(() => {
    setisLoading(true);
    loadedProduct();
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
      <View>
        <ModalView
          isVisible={modalLoaded}
          title="Apply Filter"
          onPress={saveFilters}>
          <FilterSwitch
            label="Vegetables"
            state={isVegetables}
            onChange={(newValue) => {
              setisVegetables(newValue);
            }}
          />
          <FilterSwitch
            label="Fruits"
            state={isFruits}
            onChange={(newValue) => {
              setIsFruits(newValue);
            }}
          />
          <FilterSwitch
            label="Fish & Meat"
            state={isFishMeat}
            onChange={(newValue) => {
              setIsFishMeat(newValue);
            }}
          />
        </ModalView>
      </View>
      {/* {products.map((prod) => (
        <ItemList
          key={prod.id}
          product={prod}
          update={() => {
            props.navigation.navigate("AddProductScreen", {
              prodId: prod.id,
            });
          }}
        />
      ))} */}
      <FlatList
        onRefresh={loadedProduct}
        refreshing={isRefreshing}
        data={products}
        keyExtractor={(item, index) => item.id}
        renderItem={(itemData) => (
          <ItemList
            product={itemData.item}
            update={() => {
              props.navigation.navigate("AddProductScreen", {
                prodId: itemData.item.id,
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default UpdateProductsScreen;

const styles = StyleSheet.create({
  filterContainer: {
    marginLeft: 20,
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 5,
    paddingBottom: 10,
  },
  switchTitle: {
    fontFamily: "regular",
    fontSize: 16,
    marginRight: 50,

    width: "60%",
  },
});
