// Import resources
import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";

// Import custom files
import CustomSafeView from "../components/CustomSafeView";
import useLoggedInUser from "../hooks/useLoggedInUser";
import useCustomSpinnerState from "../hooks/useCustomSpinnerState";
import MansonryList from "../components/MansonryList";
import routes from "./routes";
import { pinsList } from "../config/data";
import { internetConnAtom } from "../recoil/atoms";

// Component
function HomeScreen() {
  // Define isMounted
  const isMounted = useRef(null);

  // Define user
  const { username, userNetInfo } = useLoggedInUser();

  // Define spinner
  const spinner = useCustomSpinnerState();

  // Define internet conn
  const internetConn = useRecoilValue(internetConnAtom);

  // Define navigation
  const navigation = useNavigation();

  // Debug
  //console.log("Debug homeScreen: ", userNetInfo);

  // Return component
  return (
    <CustomSafeView style={tw`px-4 pt-2`}>
      {/** MAIN CONTAINER */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** SECTION - ALL PINS MANSONRY LIST */}
        <View style={tw`pt-5`}>
          <MansonryList data={pinsList} detailsRoute={routes.PIN_DETAILS} />
        </View>
      </ScrollView>
    </CustomSafeView>
  ); // close return
} // close component

// Export
export default HomeScreen;
