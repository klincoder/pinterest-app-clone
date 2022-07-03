// Import resources
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Platform, ScrollView, View } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import FormCreatePin from "../components/FormCreatePin";
import { appColors } from "../config/data";

// Component
function CreatePinScreen() {
  // Define navigation
  const navigation = useNavigation();

  // Define isMounted
  const isMounted = useRef(null);

  // Debug
  //console.log("Debug createPinScreen: ",);

  // SIDE EFFECTS
  // SET SCREEN OPTIONS
  useLayoutEffect(() => {
    // Set screen options
    navigation.setOptions({
      headerShadowVisible: false,
      headerStyle: { backgroundColor: appColors?.white },
      headerTitleStyle: { color: appColors?.black },
    });
  }, [navigation]);

  // SIDE EFFCETS
  // REQUEST PHOTO GALLERY PERMISSION
  useEffect(() => {
    // On mount
    isMounted.current = true;
    // IIFE
    (async () => {
      // If platform != web
      if (Platform.OS != "web") {
        // Get permission status
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        // If status !== granted
        if (status !== "granted") {
          // Alert err
          alert("Permission denied");
          //alert.showAlert("Access to your camera was denied. Try again.");
        } // close if status
      } // close if platform
    })();
    // Clean up
    return () => (isMounted.current = false);
  }, []);

  // Return component
  return (
    <CustomSafeView style={tw`px-4`}>
      {/** MAIN CONTAINER */}
      <ScrollView contentContainerStyle={tw`flex-1 justify-center`}>
        {/** Form */}
        <FormCreatePin />
      </ScrollView>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default CreatePinScreen;
