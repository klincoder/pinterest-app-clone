// Import resources
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import custom files
import { globalScreenOptions } from "../config/data";
import CreatePinScreen from "./CreatePinScreen";

// Create stack navigator object
const Stack = createStackNavigator();

// Component
function CreatePinNavigator() {
  // Define stackList
  const stackList = [
    {
      name: "CreatePinScreen",
      component: CreatePinScreen,
      options: { headerTitle: "Create Pin" },
    },
  ];

  // Return component
  return (
    <Stack.Navigator
      initialRouteName="CreatePinScreen"
      screenOptions={globalScreenOptions}
    >
      <>
        {/** Loop stackList */}
        {stackList?.map((item, index) => (
          <Stack.Screen
            key={item?.name + index + 1}
            name={item?.name}
            component={item?.component}
            options={item?.options}
            //options={{ show }}
          />
        ))}
      </>
    </Stack.Navigator>
  ); // close return
} // close component

// Export component
export default CreatePinNavigator;
