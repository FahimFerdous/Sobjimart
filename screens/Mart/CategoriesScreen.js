import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import CartCounter from "../../components/CartCounter";
import { CATEGORIES } from "../../data/CategoryData";

const CategoriesScreen = (props) => {
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
  const LoadCategoryHandler = (itemData) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Products", {
            category: itemData.item.name,
          });
        }}>
        <View style={styles.screen}>
          <ImageBackground
            source={{ uri: itemData.item.imageUrl }}
            style={styles.imageBG}>
            <Text style={styles.title}>{itemData.item.name}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item, index) => item.id}
        renderItem={LoadCategoryHandler}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  screen: {
    height: 200,
    width: "100%",
    backgroundColor: "#cc5",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBG: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 5,
    paddingVertical: 10,
    textAlign: "center",
  },
});
