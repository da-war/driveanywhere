import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import DropDown from "../DropDown";
import ErrorMessage from "./ErrorMessage";
const AppFormDropdown = ({ data, placeholder = "Select Item", name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <DropDown
        data={data}
        placeholder={placeholder}
        onSelectItem={(item) => setFieldValue(name, item)}
        value={values[name]}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormDropdown;

const styles = StyleSheet.create({});
