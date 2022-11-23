import { StyleSheet } from "react-native";
import React from "react";

import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import DatePicker from "../DatePicker";
import { getTime } from "../../globalFunctions/global";

function AppFormDatePicker({ name, placeholder }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <DatePicker
        onSelectDate={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedDate={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormDatePicker;

const styles = StyleSheet.create({});
