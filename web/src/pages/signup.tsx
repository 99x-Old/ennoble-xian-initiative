import React from "react";
import { useRouter } from "next/router";
import ScaffoldWrapper from "../components/layouts/ScaffoldWrapper";
import {
  Grid,
  Card,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  makeStyles,
  Box,
  Typography,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import { TextField } from "formik-material-ui";
import TextInputFieldWrapper from "../components/TextInputFieldWrapper";

interface Props {}

const useStyles = makeStyles((theme) => ({
  box: {
    width: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
}));
interface Values {
  email: string;
  password: string;
}

const signup = (props: Props) => {
  const router = useRouter();
  const classes = useStyles();
  return (
    <ScaffoldWrapper>
      <Grid
        xs={12}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="flex-start"
        style={{ minHeight: "100vh", padding: 24 }}
      >
        <Box width="75%">
          <Card variant="outlined" className={classes.box}>
            <Box marginLeft={8} marginRight={8} marginTop={4}>
              <Typography variant="h4">Sign in</Typography>
            </Box>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors: Partial<Values> = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  alert(JSON.stringify(values, null, 2));
                }, 500);
              }}
            >
              {({ submitForm, isSubmitting }) => (
                <Form>
                  <TextInputFieldWrapper
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  marginLeft={4}
                  marginRight={4}
                  />
                  <TextInputFieldWrapper
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  marginLeft={4}
                  marginRight={4}
                  />
                  <Box marginLeft={8} marginRight={8} marginTop={4}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Card>
        </Box>
      </Grid>
    </ScaffoldWrapper>
  );
};

export default signup;
