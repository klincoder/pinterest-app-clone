// Import resources
import React, { useEffect, useState } from "react";
import { Image, useWindowDimensions, View } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

// Import custom files
import routes from "../screens/routes";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import CustomImage from "./CustomImage";
import CustomIcon from "./CustomIcon";
import { appColors, appFonts } from "../config/data";

// Component
export default function MansonryList({ data, detailsRoute }) {
  // Define final details route
  const finalDetailsRoute = detailsRoute || routes.HOME;

  // Define screen width
  const screenWidth = useWindowDimensions()?.width;

  // Define number of col
  const numCol = Math.ceil(screenWidth / 250);

  // Debug
  //console.log("Debug mansonryList: ", { screenWidth, numCol });

  // Return component
  return (
    <View style={tw`flex-row`}>
      {/** Determine colums to show based on numCol */}
      {Array.from(Array(numCol))?.map((_, colIndex) => (
        // Col view
        <View key={colIndex + 1} style={tw`flex-1`}>
          {/** Loop data + calc indices */}
          {data
            ?.filter((_, index) => index % numCol === colIndex)
            ?.map((item) => (
              <MansonryItem
                key={item?.id}
                rowData={item}
                detailsRoute={finalDetailsRoute}
              />
            ))}
        </View>
      ))}
    </View>
  ); // close return
} // close component

/*********************
  MANSONRY ITEM COMPONENT
**********************/
function MansonryItem({ rowData, detailsRoute }) {
  // Define row data
  const rowID = rowData?.id;
  const rowImage = rowData?.image;
  const rowTitle = rowData?.title;

  // Define state
  const [imgRatio, setImgRatio] = useState(1);

  // Define navigation
  const navigation = useNavigation();

  // Debug
  //console.log("Debug mansonryItem: ", detailsRoute);

  // SIDE EFFECTS
  // CALCULATE IMAGE RATIO
  useEffect(() => {
    // If empty args return
    if (!rowImage) return;
    // Get image size
    Image.getSize(rowImage, (width, height) => setImgRatio(width / height));
  }, [rowImage]);

  // Return component
  return (
    <CustomButton
      isTouchable
      onPress={() => navigation.navigate(detailsRoute, { rowID })}
    >
      {/** Pin item container */}
      <View style={tw`w-full p-1`}>
        <View>
          {/** Image */}
          <CustomImage
            isLink
            image={rowImage}
            style={[tw`rounded-3xl`, { width: "100%", aspectRatio: imgRatio }]}
          />
          {/** Bookmark icon */}
          <CustomIcon
            type="antDesign"
            icon="hearto"
            size={20}
            style={tw`absolute p-2 right-3 bottom-3 rounded-full bg-[${appColors?.lightGrey}]`}
            onPress={() => console.log("Bookmark clicked 2!")}
          />
        </View>

        {/** Title */}
        <CustomText
          numberOfLines={2}
          style={[tw`m-2 text-base`, { fontFamily: appFonts?.regular2 }]}
        >
          {rowTitle}
        </CustomText>
      </View>
    </CustomButton>
  ); // close return
} // close component
