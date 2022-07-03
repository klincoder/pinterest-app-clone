// Import resources
import React, { useLayoutEffect, useRef } from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import useLoggedInUser from "../hooks/useLoggedInUser";
import CustomIcon from "../components/CustomIcon";
import CustomImage from "../components/CustomImage";
import CustomText from "../components/CustomText";
import CustomDivider from "../components/CustomDivider";
import MansonryList from "../components/MansonryList";
import routes from "./routes";
import { appColors, appImages, appFonts, pinsList } from "../config/data";
import Logout from "../components/Logout";

// Component
function ProfileScreen() {
  // Define isMounted
  const isMounted = useRef(null);

  // Define user
  const { userID, username, userFullName, userAvatar } = useLoggedInUser();

  // Define navigation
  const navigation = useNavigation();

  // Debug
  //console.log("Debug profileScreen: ",);

  // SIDE EFFECTS
  // SET SCREEN OPTIONS
  useLayoutEffect(() => {
    // On mount
    isMounted.current = true;
    // Set screen options
    navigation.setOptions({
      headerShadowVisible: false,
      headerTitleAlign: "left",
      headerStyle: tw`bg-[${appColors?.white}]`,
      headerTitleStyle: {
        color: appColors?.black,
        fontFamily: appFonts?.medium,
      },
      //headerRightContainerStyle: tw`flex-1`,
      headerRight: () => (
        <View style={tw`flex-row items-center justify-between pr-5 w-[35]`}>
          <CustomIcon type="feather" icon="share" size={24} />
          <CustomIcon type="entypo" icon="dots-three-horizontal" size={24} />
          {/* <CustomIcon type="antDesign" icon="pluscircle" size={24} /> */}
          <Logout
            isIcon
            iconSize={24}
            iconStyle={tw`text-black`}
            //buttonStyle={tw`self-end`}
          />
        </View>
      ),
    });
    // Clean up
    return () => (isMounted.current = false);
  }, [navigation]);

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** MAIN CONTAINER */}
      <ScrollView style={tw`flex-1 pt-10`} showsVerticalScrollIndicator={false}>
        {/** SECTION - AVATAR */}
        <View style={tw`items-center justify-center mb-5`}>
          {/** Image */}
          <CustomImage
            isLink
            image={userAvatar || appImages?.logo}
            style={{ width: 150, height: 150, borderRadius: 200 }}
          />

          {/** Name */}
          <CustomText
            style={[tw`text-2xl pt-3`, { fontFamily: appFonts?.medium }]}
          >
            {userFullName}
          </CustomText>

          {/** Followers */}
          <CustomText
            style={[tw`text-base pt-2`, { fontFamily: appFonts?.regular2 }]}
          >
            1,084 followers | 234 Followings
          </CustomText>
        </View>

        {/** Divider */}
        <CustomDivider />

        {/** SECTION - USER PINS */}
        <View style={tw`mt-5 mb-15`}>
          <MansonryList data={pinsList} detailsRoute={routes.PIN_DETAILS} />
        </View>
      </ScrollView>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default ProfileScreen;
