import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Modal from "react-native-modal";

import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "./HeaderButton";

export default function ModalView(props) {
  return (
    <View>
      <Modal
        isVisible={props.isVisible}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        animationOutTiming={600}
        backdropOpacity={0.7}>
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, ...styles }}>
            <View style={styles.headerContainer}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>{props.title}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Save"
                    iconName="ios-checkmark"
                    onPress={props.onPress}
                  />
                </HeaderButtons>
              </View>
            </View>
            {props.children}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    padding: 5,
    flexDirection: "row",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1c9e73",
  },
  headerTextContainer: {
    margin: 5,
  },
  headerText: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "white",
  },
  buttonContainer: {
    paddingLeft: 50,
  },
});
