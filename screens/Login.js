import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import Input from "../components/Input";
import Button3D from "../components/Button3D";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  return (
    <View
      style={{
        backgroundColor: themeMode.blueLight,
        flex: 1,
      }}
    >
      <View
        style={{
          height: 60,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: themeMode.white,
            fontSize: 30,
            fontFamily: "Inter_900Black",
          }}
        >
          Login
        </Text>
      </View>
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder={"Email"}
        bottom={20}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder={"Password"}
        bottom={20}
      />
      <TouchableOpacity>
        <Button3D text={"Login"} />
      </TouchableOpacity>
      <View
        style={{
          height: 60,
          justifyContent: "center",
          alignItems: 'flex-start'
        }}
      >
        <TouchableOpacity style={{
            paddingVertical: 5,
            justifyContent: "center"
        }}>
          <Text style={{
            fontFamily: "Inter_400Regular",
            fontSize: 18,
            color: themeMode.blueLighter
          }}>Forgotten password? reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
