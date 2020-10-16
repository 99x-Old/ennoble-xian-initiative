import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: "100vh",
    },
  })
);

const ContainerGridWrapper = (props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        {props.children}
      </Grid>
    </Grid>
  );
};

export default ContainerGridWrapper;
