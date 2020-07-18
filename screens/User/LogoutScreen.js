import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, AsyncStorage } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import Fire from "../../Firebase";
import AuthContext from "../../context/auth-context";

const LogoutScreen = (props) => {
  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem("mail");
      await AsyncStorage.removeItem("pass");
    } catch (err) {}
  };
  const authContext = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);
  return (
    <View style={styles.screen}>
      <Spinner
        visible={isLoading}
        textContent={"Logging Out..."}
        textStyle={styles.spinner}
      />
      <Text style={styles.text}>Do you Want to Logout?</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.innerButtonContainer}>
          <Button
            title="Logout"
            color="#ff5959"
            //onPress={submitHandler}
            onPress={() => {
              setisLoading(true);
              Fire.shared.UserLogOut();
              removeUser();
              authContext.setUser(false);
              setisLoading(false);
            }}
          />
        </View>
        <View style={styles.innerButtonContainer2}>
          <Button
            title="cancel"
            color="#003152"
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    fontFamily: "medium",
    fontSize: 16,
  },
  spinner: {
    color: "#FFF",
    fontFamily: "medium",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerButtonContainer: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#ff5959",
    width: "50%",
    marginRight: 5,
    overflow: "hidden",
  },
  innerButtonContainer2: {
    borderWidth: 1,
    borderRadius: 30,

    borderColor: "#003152",
    width: "50%",
    overflow: "hidden",
  },
});
