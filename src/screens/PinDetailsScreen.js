// Import resources
import React, { useEffect, useState } from "react";
import { ScrollView, View, Image } from "react-native";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import CustomText from "../components/CustomText";
import CustomIconMsg from "../components/CustomIconMsg";
import CustomIcon from "../components/CustomIcon";
import CustomImage from "../components/CustomImage";
import { appColors, appFonts, pinsList } from "../config/data";

// Component
function PinDetailsScreen() {
  // Define route
  const route = useRoute();

  // Define rowData
  const rowData = pinsList?.find(({ id }) => id === route.params.rowID);
  const rowImage = rowData?.image;
  const rowTitle = rowData?.title;

  // Define state
  const [imgRatio, setImgRatio] = useState(1);

  // Define navigation
  const navigation = useNavigation();

  // Define insets
  const insets = useSafeAreaInsets();

  // Debug
  //console.log("Debug pinDetailsScreen: ",);

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
    <CustomSafeView
      style={tw`bg-[${rowData ? appColors?.black : appColors?.white}]`}
    >
      {/** SECTION - PIN DETAILS */}
      {/** If empty rowData */}
      {!rowData ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <CustomIconMsg />
        </View>
      ) : (
        <ScrollView
          style={tw`flex-1 h-full rounded-t-3xl bg-[${appColors?.white}]`}
          showsVerticalScrollIndicator={false}
        >
          {/** Image */}
          <CustomImage
            isLink
            image={rowImage}
            style={[
              tw`rounded-t-3xl`,
              { width: "100%", aspectRatio: imgRatio },
            ]}
          />

          {/** Title */}
          <CustomText
            numberOfLines={3}
            style={[
              tw`text-center p-2 text-xl`,
              { fontFamily: appFonts?.medium },
            ]}
          >
            {rowTitle}
          </CustomText>
        </ScrollView>
      )}

      {/** Go back button */}
      <CustomIcon
        type="ionIcons"
        icon="chevron-back"
        size={28}
        onPress={() => navigation.goBack()}
        style={[
          tw`absolute left-5 text-white p-1 rounded-full bg-[${appColors?.primary}]`,
          { top: insets?.top + 20 },
        ]}
      />
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default PinDetailsScreen;
