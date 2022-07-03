// Import resources
import React, { useRef, useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

// Import custom files
import CustomText from "./CustomText";
import KeyboardAvoidWrapper from "./KeyboardAvoidWrapper";
import CustomImage from "./CustomImage";
import CustomButton from "./CustomButton";
import CustomIcon from "./CustomIcon";
import CustomTextInputForm from "./CustomTextInputForm";
import { handlePickImage } from "../config/functions";
import { appColors } from "../config/data";

// Component
function FormCreatePin() {
  // Define navigation
  const navigation = useNavigation();

  // Define isMounted
  const isMounted = useRef(null);

  // Define state
  const [selectedImage, setSelectedImage] = useState(null);
  const isSelectedImage = selectedImage ? true : false;

  // Debug
  //console.log("Debug formCreatePin: ",)

  // FORM CONFIG
  // Initial values
  const initialValues = {
    pinImage: "",
    pinTitle: "",
  };

  // Validation
  const validate = Yup.object().shape({
    pinImage: Yup.string().required("Required"),
    pinTitle: Yup.string().required("Required").min(3, "Too short"),
  });

  // Submit form
  const onSubmit = async (values, { setSubmitting }) => {
    // Debug
    // console.log("Debug submitForm: ", JSON.stringify(values));
    console.log("Debug submitForm: ", values);
    // Set submitting
    setSubmitting(false);
  }; // close submit fxn

  // Return component
  return (
    <KeyboardAvoidWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validate}
      >
        {({
          values,
          errors,
          isValid,
          isSubmitting,
          setFieldValue,
          handleSubmit,
        }) => (
          <>
            {/** Debug */}
            {/* {console.log("Debug formValues: ", errors)} */}

            {/** Pin image */}
            <View style={tw`mb-3`}>
              {/** Selected image */}
              {isSelectedImage && (
                <CustomImage
                  image={{ uri: selectedImage }}
                  style={[tw`my-5 w-auto h-full`, { height: 300 }]}
                  resizeMode="contain"
                />
              )}

              {/** Pick image button */}
              <CustomButton
                isTouchable
                style={tw`p-3 bg-[${appColors?.lightGrey}]`}
                onPress={async () => {
                  const getSelectedImg = await handlePickImage();
                  setSelectedImage(getSelectedImg);
                  setFieldValue("pinImage", selectedImage);
                  //console.log("Debug selectedImage1: ", selectedImage);
                }}
              >
                <View style={tw`flex-row justify-center`}>
                  <CustomIcon
                    type="antDesign"
                    icon="pluscircleo"
                    size={32}
                    style={tw`mr-3`}
                  />
                  <CustomText style={tw`text-lg mt-1`}>Choose Image</CustomText>
                </View>
              </CustomButton>
            </View>

            {/** If isSelectedImage show form input */}
            {isSelectedImage && (
              <>
                {/** Pin desc */}
                <CustomTextInputForm
                  name="pinTitle"
                  leftIconType="feather"
                  leftIconName="edit"
                  placeholder="Pin Title"
                />

                {/** Submit */}
                <CustomButton
                  isPaper
                  onPress={handleSubmit}
                  stylePaper={tw`mt-3`}
                  disabled={!isValid || isSubmitting || !isSelectedImage}
                >
                  Submit
                </CustomButton>
              </>
            )}
          </>
        )}
      </Formik>
    </KeyboardAvoidWrapper>
  ); // close return
} // close component

// Export
export default FormCreatePin;
