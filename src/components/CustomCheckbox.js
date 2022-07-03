// Import resources
import React from "react";
import { Checkbox } from "react-native-paper";

// Import custom files
import CustomListItem from "./CustomListItem";
import CustomButton from "./CustomButton";
import { appColors } from "../config/data";

// Component
function CustomCheckbox({
  name,
  label,
  leftIconType,
  leftIconName,
  checked,
  onPress,
  ...rest
}) {
  // Debug
  //console.log("Debug customCheckbox: ",)

  // Return component
  return (
    <CustomButton isTouchable onPress={onPress}>
      <CustomListItem
        {...rest}
        title={label}
        rightContent={() => (
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            color={appColors?.primary}
          />
        )}
      />
    </CustomButton>
  ); // close return
} // close component

// Export
export default CustomCheckbox;
