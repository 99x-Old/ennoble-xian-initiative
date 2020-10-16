import React, { useState } from "react";
import "date-fns";
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  getYear,
  addYears,
  isBefore,
  formatISO,
} from "date-fns";
import _ from "lodash";
import BackDropWrapper from "../layouts/BackDropWrapper";
import { fetch, FetchProps } from "../../api/apiFetcher";
import Alerts, { CustomAlertProps } from "./Alerts";
import { FETCHTYPE } from "../../constants/apiConstants";
import { isErrorMessage } from "../../api/apiParser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      flex: 1,
      minWidth: "100%",
      marginBottom: theme.spacing(2),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

export interface FormData {
  year: number;
  rollOut?: Date;
  completion?: Date;
}

interface AddInitiativeProps {
  open: boolean;
  onClose: (showAlert: boolean) => void;
}

const AddInitiativeDialog = (props: AddInitiativeProps) => {
  const classes = useStyles();
  const { onClose, open } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));


  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const handleClose = async () => {
    onClose(false);
  };

  const handleSubmit = async () => {

  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      fullScreen={fullScreen}
      aria-labelledby="simple-dialog-title"
    >
      <DialogTitle id="simple-dialog-title">Let's add an Initiative</DialogTitle>
      <DialogContent className={classes.root}>
        <BackDropWrapper showBackdrop={isFetching} />
        {/* <Alerts
          showAlert={customAlertProps.showAlert}
          alertType={customAlertProps.alertType}
          message={customAlertProps.message}
        /> */}
        <Grid container direction="row" alignItems="center" spacing={3}>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          autoFocus
          disabled={isAddButtonDisabled}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInitiativeDialog;
