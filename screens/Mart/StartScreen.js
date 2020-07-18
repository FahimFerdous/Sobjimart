import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Animated,
} from "react-native";

const StartScreen = (props) => {
  const opacity = useState(new Animated.Value(0))[0];
  function FadeLogo() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  useEffect(() => {
    FadeLogo();
    setTimeout(() => {
      props.navigation.navigate("Categories");
    }, 5000);
  });

  return (
    <ImageBackground
      imageStyle={{ resizeMode: "cover" }}
      style={{ width: "100%", height: "100%" }}
      source={require("../../assets/icon.png")}>
      <View style={styles.screen}>
        <Animated.View style={[{ opacity }]}>
          <Image
            style={styles.imageBg}
            source={require("../../assets/icon.png")}
          />
          <Text style={styles.text}>Fresh Vegetables, Anytime</Text>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.4)",
  },
  imageBg: {
    alignItems: "center",
  },
  text: {
    fontFamily: "bold",
    fontSize: 20,
    color: "white",
    paddingTop: "40%",
  },
});
