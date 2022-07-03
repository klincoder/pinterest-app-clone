// Import resources
import React from "react";
import { View } from "react-native";
import tw from "twrnc";

// Import custom files
import CustomText from "./CustomText";
import CustomImage from "./CustomImage";
import { appColors, appFonts, appImages, appStyles } from "../config/data";

// Component
function OnboardingItem({ item, width, currSlide }) {
  // Debug
  //console.log("Debug onboardingItem: ", item.image);

  // Return component
  return (
    <View style={tw`items-center`}>
      {/** Image */}
      <CustomImage
        isLink
        image={item?.image || appImages?.avatar}
        style={{ width, height: "75%", resizeMode: "contain" }}
      />

      {/** Title */}
      <CustomText
        style={[
          tw`mt-2 text-3xl text-center text-[${appColors?.white}]`,
          { fontFamily: appFonts?.medium },
        ]}
      >
        {item?.title}
      </CustomText>

      {/** Description */}
      <CustomText
        style={tw`mt-3 max-w-xs leading-3 text-base text-center text-[${appColors?.lightGrey}]`}
      >
        {item?.description}
      </CustomText>
    </View>
  ); // close return
} // close component

// Export
export default OnboardingItem;
