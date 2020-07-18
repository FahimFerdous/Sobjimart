import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Formik } from "formik";
import * as Yup from "yup";

import firebase from "firebase";
import AppTextInput from "../../components/AppTextInput";
import ErrorMessage from "../../components/ErrorMessage";

import { useDispatch, useSelector } from "react-redux";
import * as UserAction from "../../store/action/user";

const validationSchema = Yup.object({
  userName: Yup.string().required().label("User Name"),
  phone: Yup.string().min(11).max(11).required().label("Phone Number"),
  address: Yup.string().required().label("Address"),
});

const UserProfileScreen = (props) => {
  let selectedUser = {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  };
  const dispatch = useDispatch();
  const user = firebase.auth().currentUser;
  const LoadedUser = async () => {
    await dispatch(UserAction.loadUser());
  };
  useEffect(() => {
    LoadedUser();
  }, [dispatch, user]);
  if (user) {
    const emailList = useSelector((state) => {
      const transformedUserList = [];
      for (const key in state.user.users) {
        transformedUserList.push({
          id: state.user.users[key].id,
          name: state.user.users[key].name,
          email: state.user.users[key].email,
          address: state.user.users[key].address,
          phone: state.user.users[key].phone,
        });
      }
      return transformedUserList;
    });

    for (let x = 0; x < emailList.length; x++) {
      if (emailList[x].email === user.email) {
        selectedUser.id = emailList[x].id;
        selectedUser.name = emailList[x].name;
        selectedUser.email = emailList[x].email;
        selectedUser.phone = emailList[x].phone;
        selectedUser.address = emailList[x].address;

        break;
      }
    }
  }

  const UpdateData = (name, phone, address) => {
    const DbRef = firebase.database().ref("Users").child(selectedUser.id);

    DbRef.update({
      name: name,
      phone: phone,
      address: address,
    })
      .then(() => {
        Alert.alert("Update", "Updated Successfully", [
          {
            text: "Ok",
            style: "default",
          },
        ]);
      })
      .catch((err) => {
        const message = err.toString();
        Alert.alert("Update Error", message, [
          {
            text: "Back",
            style: "default",
          },
        ]);
      });
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}>
        <View style={styles.iconContainer}>
          <Ionicons name="ios-arrow-dropleft" size={26} color="#8e8e8e" />
        </View>
      </TouchableOpacity>
      <View style={styles.screen}>
        <View style={{ width: "80%", marginTop: "10%", marginBottom: 70 }}>
          <Image
            source={require("../../assets/sobjimart-2.png")}
            style={{ width: "100%", height: 130 }}
            resizeMode="contain"
          />
        </View>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
          <View>
            <Formik
              initialValues={{
                name: "",
                phone: "",
                address: "",
              }}
              onSubmit={(values, actions) => {
                let name = values.name ? values.name : selectedUser.name;
                let phone = values.phone ? values.phone : selectedUser.phone;
                let address = values.address
                  ? values.address
                  : selectedUser.address;
                UpdateData(name, phone, address);
              }}>
              {({ values, handleChange, setFieldTouched, handleSubmit }) => (
                <>
                  <View style={styles.textbox}>
                    <AppTextInput
                      icon="account"
                      placeholder="Your Name"
                      value={values.name ? values.name : selectedUser.name}
                      onChangeText={handleChange("name")}
                      keyboardType="default"
                      onBlur={() => setFieldTouched("name")}
                    />
                  </View>
                  <View style={styles.textbox}>
                    <AppTextInput
                      placeholder="Phone Number"
                      icon="cellphone"
                      value={values.phone ? values.phone : selectedUser.phone}
                      onChangeText={handleChange("phone")}
                      keyboardType="number-pad"
                      onBlur={() => setFieldTouched("phone")}
                    />
                  </View>
                  <View style={styles.textbox}>
                    <AppTextInput
                      placeholder="Address"
                      icon="home"
                      multiline
                      maxLength={100}
                      numberOfLines={5}
                      value={
                        values.address ? values.address : selectedUser.address
                      }
                      onChangeText={handleChange("address")}
                      keyboardType="default"
                      retrunKeyType="done"
                      onBlur={() => setFieldTouched("address")}
                    />
                  </View>
                  <View style={styles.innerButtonContainer}>
                    <Button
                      title="Update Profile"
                      color="#ff5959"
                      //onPress={submitHandler}
                      onPress={handleSubmit}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    padding: 15,
  },
  textBox: {
    margin: 5,
  },
  iconContainer: {
    paddingTop: 60,
    paddingLeft: 20,
  },
  innerButtonContainer: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#ff5959",
    marginRight: 5,
    overflow: "hidden",
    marginTop: 10,
  },
});
