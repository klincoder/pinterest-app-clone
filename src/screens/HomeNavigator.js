// Import resources
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Import custom files
import HomeScreen from "../screens/HomeScreen";
import CreatePinNavigator from "./CreatePinNavigator";
import ProfileNavigator from "../screens/ProfileNavigator";
import CustomIcon from "../components/CustomIcon";
import { appColors } from "../config/data";

// Create bottom nav object
const Tab = createMaterialBottomTabNavigator();

// Component
function HomeNavigator() {
  // Define tabScreenList
  const tabScreenList = [
    {
      name: "HomeScreen",
      component: HomeScreen,
      iconType: "antDesign",
      iconName: "pushpin",
      label: "Pins",
    },
    {
      name: "CreatePinNavigator",
      component: CreatePinNavigator,
      iconType: "antDesign",
      iconName: "pluscircle",
      label: "Create Pin",
    },
    {
      name: "ProfileNavigator",
      component: ProfileNavigator,
      iconType: "fontAwesome5",
      iconName: "user-alt",
      label: "Profile",
    },
  ];

  // Return component
  // Screens for visible bottom tab
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      shifting={false}
      sceneAnimationEnabled={false}
      activeColor={appColors?.primary}
      inactiveColor={appColors?.black}
      labeled={false}
      barStyle={{
        color: appColors?.black,
        backgroundColor: appColors?.white,
        borderTopWidth: 2,
        borderTopColor: appColors?.lightGrey,
        //paddingBottom: 10,
        // borderRadius: "50%",
        ///marginBottom: 15,
        // marginHorizontal: 10,
      }}
    >
      {/** Loop tabScreenList */}
      {tabScreenList?.map((item, index) => (
        <Tab.Screen
          key={`tabs-${index + 1}`}
          name={item?.name}
          component={item?.component}
          options={{
            tabBarLabel: item?.label,
            tabBarIcon: ({ focused, color }) => (
              <CustomIcon
                type={item?.iconType}
                icon={item?.iconName}
                size={24}
                color={focused ? appColors?.primary : color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  ); // close return
} // close component

// Export component
export default HomeNavigator;
