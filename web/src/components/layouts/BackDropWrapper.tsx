import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: indigo[900],
    },
  })
);

const BackDropWrapper = (props) => {
  const classes = useStyles();
  return (
      <Backdrop className={classes.backdrop} open={props.showBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
  );
};

export default BackDropWrapper;
