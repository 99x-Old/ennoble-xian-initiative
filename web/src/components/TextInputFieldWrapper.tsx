import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import { Field } from "formik";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      width: "100%",
    },
  })
);

const TextInputFieldWrapper = ({
  component,
  name,
  type,
  label,
  marginLeft,
  marginRight,
}) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      marginTop={1}
      marginBottom={1}
      marginRight={marginRight}
      marginLeft={marginLeft}
    >
      <Field
        className={[classes.box]}
        component={component}
        name={name}
        type={type}
        label={label}
      />
    </Box>
  );
};

export default TextInputFieldWrapper;
