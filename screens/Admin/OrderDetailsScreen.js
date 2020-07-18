import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import * as OrderAction from "../../store/action/order";

import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";

import Details from "../../components/Details";

export default function OrderDetailsScreen(props) {
  //Header Start
  props.navigation.setOptions({
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
  const [isRfreshing, setisRfreshing] = useState(false);
  const orders = useSelector((state) => state.order.adminOrder);
  const dispatch = useDispatch();

  const LoadedOrders = async () => {
    setisRfreshing(true);
    await dispatch(OrderAction.adminOrder());
    setisRfreshing(false);
  };
  useEffect(() => {
    setisLoading(true);
    LoadedOrders();
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
    <View style={styles.screen}>
      <FlatList
        onRefresh={LoadedOrders}
        refreshing={isRfreshing}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <Details
            orderId={itemData.item.orderId}
            date={itemData.item.date}
            name={itemData.item.userName}
            mobile={itemData.item.phone}
            amount={itemData.item.totalAmount}
            items={itemData.item.items}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 10,
  },
});
