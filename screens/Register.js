import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../constants";
import Input from "../components/Input";
import Button3D from "../components/Button3D";
import { registerUser } from "../store/actions/authActions";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { darkMode } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;

  const dispatch = useDispatch();
  // const {} = useSelector(() => {})

  const handleRegister = () => {
    if (fullName && email && password) {
      dispatch(
        registerUser(
          email.toLowerCase().trim(),
          password.trim(),
          fullName,
          phone.trim()
        )
      );
      setFullName("");
      setPhone("");
      setEmail("");
      setPassword("");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <View
      style={{
        backgroundColor: themeMode.blueLight,
        flex: 1,
      }}
    >
      <ScrollView>
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
            Register
          </Text>
        </View>
        <Input
          value={fullName}
          onChangeText={setFullName}
          placeholder={"Full name"}
          bottom={20}
        />
        <Input
          value={phone}
          onChangeText={setPhone}
          placeholder={"Phone number"}
          bottom={20}
        />
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
        <TouchableOpacity onPress={handleRegister}>
          <Button3D text={"Regiter"} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Register;
