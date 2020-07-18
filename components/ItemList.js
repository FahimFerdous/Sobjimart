import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

const ItemList = (props) => {
  const generateList = (product) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: product.imageUrl }} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.labelName}>{product.name}</Text>
          <Text style={styles.labelDate}>
            Last Update: {product.storedDate}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.labelQuantity}>
            In Stock: {product.totalQuantity}Kg
          </Text>
          <View style={styles.button}>
            <Button title="UPDATE" color="#ff5959" onPress={props.update} />
          </View>
        </View>
      </View>
    );
  };
  return <View>{generateList(props.product)}</View>;
};

export default ItemList;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 5,
    height: 65,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    height: "100%",
    justifyContent: "center",
    width: "20%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  nameContainer: {
    marginVertical: 5,
    marginLeft: 15,
    width: "38%",
    justifyContent: "flex-start",
  },
  labelName: {
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  labelDate: {
    fontFamily: "regular",
  },
  labelQuantity: {
    fontFamily: "medium",
  },
  buttonContainer: {
    width: "40%",
    marginRight: 5,

    flex: 1,
  },
  button: {
    marginRight: 5,
    marginTop: 5,
  },
});
