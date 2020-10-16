import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle, Color } from "@material-ui/lab";
import { Snackbar, colors } from "@material-ui/core";

export interface CustomAlertProps {
  alertType?: Color;
  message: String;
  showAlert: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const Alerts = (props: CustomAlertProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.showAlert);
  }, [props]);

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={props.alertType} onClose={handleClose}>
          <AlertTitle>
            {props.alertType &&
              props.alertType[0].toUpperCase() + props.alertType.slice(1)}
          </AlertTitle>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Alerts;
