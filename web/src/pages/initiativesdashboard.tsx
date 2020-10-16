import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ScaffoldWrapper from "../components/layouts/ScaffoldWrapper";
import {
  Grid,
  makeStyles,
  Box,
  Breadcrumbs,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Theme,
  createStyles,
} from "@material-ui/core";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import { purple, indigo, grey } from "@material-ui/core/colors";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import Link from "next/link";
import AddInitiativeDialog from "../components/dialogs/AddInitiativeDialog";

interface Props {}

interface InitiativeYear {
  initiative_year: Date;
  initiative_display_year: string;
  initiative_roll_out?: Date;
  initiative_completion?: Date;
  initiative_display_duration?: string;
  isActive: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    placeholderTitle: {
      color: indigo[600],
      fontWeight: "bold",
    },
    placeholderSubTitle: {
      color: indigo[300],
    },
    toolbar: {
      backgroundColor: "#fafafa",
      color: indigo[800],
    },
    customLink: {
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
        color: indigo[800],
        cursor: "pointer",
      },
    },
  })
);

const initiativesdashboard = (props: Props) => {
  const router = useRouter();
  const { pid } = router.query;

  const classes = useStyles();

  const [isYearsEmpty, setYearsEmpty] = useState(true);
  const [isShowingAddInitiativeYear, setAddInitiativeYear] = useState(false);

  useEffect(() => {}, []);

  const showAddInitiativeYearDialog = () => {
    setAddInitiativeYear(true);
  };

  const handleAddInitiativeYearClose = (showAlert: boolean) => {
    setAddInitiativeYear(false);
    // setCustomAlertProps(
    //   showAlert
    //     ? ({
    //         showAlert: true,
    //         message: "Succesfully added Initiative Year!",
    //         alertType: "success",
    //       } as CustomAlertProps)
    //     : defaultCustomAlertProps
    // );
    // if (showAlert) {
    //   getListOfInitiatives();
    // }
  };

  const placeholder = () => {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Box marginTop={8}>
            <Box
              display="flex"
              flex={1}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              onClick={showAddInitiativeYearDialog}
            >
              <AddCircleOutlineRoundedIcon
                style={{ fontSize: 200, color: grey[300] }}
              />
            </Box>
            <Box
              marginTop={2}
              display="flex"
              flex={1}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" className={classes.placeholderTitle}>
                Looks like there's nothing here.
              </Typography>
              <Typography variant="h6" className={classes.placeholderSubTitle}>
                Click on the plus icon to get started
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const initiativesDashboard = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppBar position="static" elevation={0}>
            <Toolbar disableGutters={true} className={classes.toolbar}>
              <Typography variant="h5" className={classes.title}>
                {pid && pid}
              </Typography>
              <IconButton color="inherit">
                <PostAddOutlinedIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <ScaffoldWrapper showBackdrop={false}>
      <div className={classes.root}>
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          marginBottom={2}
          marginTop={2}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/dashboard">
              <Typography className={classes.customLink}>Dashboard</Typography>
            </Link>
            <Link className={classes.customLink} href="/initiatives">
              <Typography className={classes.customLink}>
                Initiatives
              </Typography>
            </Link>
            <Typography color="textPrimary">{pid && pid}</Typography>
          </Breadcrumbs>
          {isYearsEmpty ? placeholder() : initiativesDashboard()}
          {/* <Alerts
            showAlert={customAlertProps.showAlert}
            alertType={customAlertProps.alertType}
            message={customAlertProps.message}
          /> */}
          <AddInitiativeDialog
            open={isShowingAddInitiativeYear}
            onClose={handleAddInitiativeYearClose}
          />
        </Box>
      </div>
    </ScaffoldWrapper>
  );
};

export default initiativesdashboard;
