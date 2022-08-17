import { View, Text, StatusBar, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { theme } from "../constants";
import TouchWithFeed from "../components/TouchWithFeed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SlideToUnlock from "../components/SlideToUnlock";
import { useNavigation, useRoute } from "@react-navigation/native";

const LetsSplit = () => {
  const navigation = useNavigation();
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  const { data } = useRoute().params;

  return (
    <View
      style={{
        backgroundColor: themeMode.blueBlack,
        flex: 1,
      }}
    >
      {/* header  */}
      <View
        style={{
          height: 100,
          backgroundColor: themeMode.pinkLight,
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchWithFeed
            onPress={() => navigation.goBack()}
            size={{ width: 50, height: 20 }}
            icon={
              <Ionicons name="arrow-back" color={themeMode.white} size={24} />
            }
          />
          <View
            style={{
              flexDirection: "row",
            }}
          ></View>
        </View>
        <View
          style={{
            borderRadius: 10,
            height: 65,
            width: 65,
            backgroundColor: themeMode.blueBlack,
            position: "absolute",
            top: 70,
            zIndex: 2,
            left: 60,
          }}
        ></View>
      </View>
      {/* header end  */}

      <ScrollView
        style={{
          paddingHorizontal: 16,
          backgroundColor: themeMode.blueLight,
          borderRadius: 20,
          marginTop: 30,
          paddingTop: 30,
          marginHorizontal: 16,
          overflow: "scroll",
          maxHeight: 600,
        }}
      >
        <RenderPreviewItem left={"Description"} right={data?.description} />
        <RenderPreviewItem
          left={"Split type"}
          right={data?.equal ? "Equal" : "Unequal"}
        />
        <RenderPreviewItem
          left={"Number of person"}
          right={data?.numberOfPerson}
        />
        <RenderPreviewItem left={"Paid by"} right={data?.paidBy.contactName} />
        <RenderPreviewItem left={"Ref id"} right={data?.id} />
        <RenderPreviewItem
          left={"Amount"}
          right={`Ghc ${parseFloat(data?.amount).toFixed(2)}`}
        />
        <RenderPreviewItem
          left={"Amount per person"}
          right={`Ghc ${parseFloat(data?.amountPerPerson).toFixed(2)}`}
        />
        <RenderPreviewItem
          style={{
            marginBottom: 30,
          }}
          left={"Paid for"}
          right={data?.paidFor.map((item) => item.contactName).join(", ")}
        />
      </ScrollView>

      <View
        style={{
          position: "absolute",
          //   backgroundColor: "red",
          width: "100%",
          height: 100,
          bottom: 0,
        }}
      >
        <SlideToUnlock />
      </View>
    </View>
  );
};

const RenderPreviewItem = ({ left, right, style }) => {
  const { darkMode, userData } = useSelector((state) => state.appReducer);
  const themeMode = darkMode ? theme.darkTheme : theme.lightTheme;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        ...style,
        // backgroundColor: `rgb(${Math.floor(Math.random() * 261)},${Math.floor(
        //   Math.random() * 261
        // )},${Math.floor(Math.random() * 261)})`,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Inter_900Black",
          color: themeMode.white,
          flex: 4,
        }}
      >
        {left}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Inter_400Regular",
          color: themeMode.white,
          flex: 8,
          textAlign: "right",
        }}
      >
        {right}
      </Text>
    </View>
  );
};

export default LetsSplit;
