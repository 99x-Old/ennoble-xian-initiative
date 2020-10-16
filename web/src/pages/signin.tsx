import React from "react";
import { useRouter } from "next/router";
import ScaffoldWrapper from "../components/layouts/ScaffoldWrapper";
import {
  Grid,
  Card,
  makeStyles,
  Box,
  Typography,
  Divider,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import { TextField } from "formik-material-ui";
import TextInputFieldWrapper from "../components/TextInputFieldWrapper";

interface Props {}

const useStyles = makeStyles((theme) => ({
  box: {
    padding: 24,
  },
  insets: {
    marginLeft: 16,
    marginRight: 16,
  },
}));
interface Values {
  email: string;
  password: string;
}

const signin = (props: Props) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <ScaffoldWrapper>
      <Box
        className={classes.box}
        display="flex"
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        <Card variant="elevation" className={classes.box}>
          <Box
            display="flex"
            flex={1}
            alignItems="center"
            justifyContent="flex-start"
            marginBottom={4}
            marginTop={2}
            marginLeft={4}
            marginRight={4}
          >
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
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                // alert(JSON.stringify(values, null, 2));
                router.push("/dashboard")
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
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  marginTop={6}
                  marginBottom={2}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Sign In
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box
            display="flex"
            marginTop={6}
            marginLeft={2}
            marginRight={2}
            flexDirection="column"
          >
            <Divider variant="middle" />
            <Box
              display="flex"
              marginLeft={8}
              marginRight={8}
              marginTop={2}
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box flexGrow={1}>
                <Typography variant="subtitle1">
                  Don't have an account yet ?
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </ScaffoldWrapper>
  );
};

export default signin;
