import React, { useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from "react-native";

import ModalView from "./ModalView";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function PickerItem(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.pickerItem}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default function AppTextInput(props) {
  const [isModalVisible, setisModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setisModalVisible(true);
        }}>
        <View style={{ ...styles.container, ...styles }}>
          <MaterialCommunityIcons
            name={props.icon}
            color="#a3a3a3"
            size={22}
            style={styles.icon}
          />

          <Text style={styles.text}>
            {props.selectedItem ? props.selectedItem : props.placeHolder}
          </Text>

          <MaterialCommunityIcons
            name="chevron-down"
            color="#a3a3a3"
            size={22}
            style={styles.icon}
          />
        </View>
      </TouchableWithoutFeedback>

      <ModalView
        isVisible={isModalVisible}
        title="Select Category"
        onPress={() => setisModalVisible(false)}>
        <View style={styles.modalView}>
          <FlatList
            data={props.Items}
            keyExtractor={(item) => item.value}
            renderItem={(itemData) => (
              <PickerItem
                text={itemData.item.label}
                onPress={() => {
                  props.onSelectItem(itemData.item);
                  setisModalVisible(false);
                }}
              />
            )}
          />
        </View>
      </ModalView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    flexDirection: "row",

    borderRadius: 25,
    padding: 5,
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
    padding: 5,
  },

  text: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#282828",
    paddingTop: 6,
    paddingLeft: 5,
    flex: 1,
  },
  pickerItem: {
    fontFamily: "medium",
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  modalView: {
    height: 150,
  },
});
