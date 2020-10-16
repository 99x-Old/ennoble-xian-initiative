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

interface AddInitiativeYearProps {
  open: boolean;
  onClose: (showAlert: boolean) => void;
}

interface DateSelection {
  date?: Date;
  hasError?: boolean;
  errorMessage?: String;
}

const AddInitiativeYearDialog = (props: AddInitiativeYearProps) => {
  const classes = useStyles();
  const { onClose, open } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [selectedYear, setSelectedYear] = useState(null);
  const [rollingOutDate, setRollingOutDate] = useState<DateSelection | null>({
    date: null,
  });
  const [completionDate, setCompletionDate] = useState<DateSelection | null>({
    date: null,
  });
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  let defaultCustomAlertProps = {
    showAlert: false,
    message: "",
    alertType: "info",
  } as CustomAlertProps;
  const [customAlertProps, setCustomAlertProps] = useState<CustomAlertProps>(
    defaultCustomAlertProps
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedYear(event.target.value as string);
    setIsAddButtonDisabled(false);
    setCustomAlertProps(defaultCustomAlertProps);
    cleanUpDateSelections();
  };

  const handleRollingOutDateChange = (date: Date | null) => {
    setRollingOutDate(validateDateSelection(date));
    setCompletionDate(validateDateSelection(date));
  };

  const handleCompletionDateChange = (date: Date | null) => {
    let checkedDate = checkIfCompletionDateisBeforeRollOutDate(date);
    if (_.isEmpty(checkedDate)) {
      setCompletionDate(validateDateSelection(date));
    } else {
      setCompletionDate(checkedDate);
    }
  };

  const checkIfCompletionDateisBeforeRollOutDate = (selectedDate) => {
    let validatedDate = {} as DateSelection;
    if (isBefore(selectedDate, rollingOutDate.date)) {
      validatedDate.hasError = true;
      validatedDate.errorMessage =
        "Please select a date before the roll out date!";
      validatedDate.date = null;
      return validatedDate;
    }
  };

  const validateDateSelection = (selectedDate) => {
    let validatedDate = {} as DateSelection;
    if (getYear(selectedDate) !== selectedYear) {
      validatedDate.hasError = true;
      validatedDate.errorMessage = "Date is outside the selected Year! ";
      validatedDate.date = null;
    } else {
      validatedDate.hasError = false;
      validatedDate.errorMessage = "";
      validatedDate.date = selectedDate;
    }
    return validatedDate;
  };

  const handleClose = async () => {
    cleanUpState();
    onClose(false);
  };

  const handleSubmit = async () => {
    const formData: FormData = {
      year: selectedYear,
      rollOut: rollingOutDate.date,
      completion: completionDate.date,
    };

    setIsFetching(true);
    const response = await fetch({
      type: FETCHTYPE.POST,
      url: "/initiativeYear",
      data: { formData },
    } as FetchProps);
    if (isErrorMessage(response)) {
      updatAlertProps({
        showAlert: true,
        message: response?.message,
        alertType: "error",
      } as CustomAlertProps);
    } else {
      console.log(response);
      console.log(response.data);
      updatAlertProps({
        showAlert: true,
        message: "succesfully added",
        alertType: "success",
      } as CustomAlertProps);
      cleanUpState();
      onClose(true);
    }
    setIsFetching(false);
  };

  const cleanUpState = () => {
    cleanUpDateSelections();
    setSelectedYear(null);
    setIsAddButtonDisabled(true);
    updatAlertProps(defaultCustomAlertProps);
  };

  const cleanUpDateSelections = () => {
    setRollingOutDate({ date: null });
    setCompletionDate({ date: null });
  };

  const updatAlertProps = (alertProps: CustomAlertProps) => {
    setCustomAlertProps(alertProps);
  };

  const getMenuItems = () => {
    let years = [];
    for (let index = 0; index <= 3; index++) {
      years.push(getYear(addYears(new Date(), index)));
    }
    return years.map((year, index) => <MenuItem value={year}>{year}</MenuItem>);
  };

  //function which passes a date-picker
  const getKeyboardDatePicker = (
    id,
    label,
    dataForPicker: DateSelection,
    onChange
  ) => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.formControl}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id={id}
          label={label}
          autoOk={true}
          disabled={!_.isNumber(selectedYear)}
          value={dataForPicker.date}
          onChange={onChange}
          error={dataForPicker.hasError}
          helperText={dataForPicker.errorMessage}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    );
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      fullScreen={fullScreen}
      aria-labelledby="simple-dialog-title"
    >
      <DialogTitle id="simple-dialog-title">Let's add an Year</DialogTitle>
      <DialogContent className={classes.root}>
        <BackDropWrapper showBackdrop={isFetching} />
        <Alerts
          showAlert={customAlertProps.showAlert}
          alertType={customAlertProps.alertType}
          message={customAlertProps.message}
        />
        <Grid container direction="row" alignItems="center" spacing={3}>
          <Grid item sm={5} xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="initiative-year-label">Year</InputLabel>
              <Select
                labelId="initiative-year-label"
                id="initiative-year"
                value={selectedYear}
                onChange={handleChange}
                label="Year"
              >
                {getMenuItems()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={7} xs={12} direction="column">
            {getKeyboardDatePicker(
              "rolling-out-date",
              "Roll Out",
              rollingOutDate,
              handleRollingOutDateChange
            )}
            {getKeyboardDatePicker(
              "completion-date",
              "Completion",
              completionDate,
              handleCompletionDateChange
            )}
          </Grid>
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

export default AddInitiativeYearDialog;
