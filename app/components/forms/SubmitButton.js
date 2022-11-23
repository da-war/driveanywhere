import React from "react";
import { useFormikContext } from "formik";
import AppButton from "../AppButton";

function SubmitButton({ title, color, textColor, icon, style }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      color={color}
      textColor={textColor}
      icon={icon}
      style={style}
    />
  );
}

export default SubmitButton;
