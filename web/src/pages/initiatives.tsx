import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ScaffoldWrapper from "../components/layouts/ScaffoldWrapper";
import {
  Grid,
  Paper,
  makeStyles,
  Box,
  Breadcrumbs,
  Typography,
  Divider,
  Container,
  IconButton,
  AppBar,
  Toolbar,
  Theme,
  createStyles,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardActionArea,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  withStyles,
  Badge,
  Menu,
  MenuItem,
} from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import { purple, indigo, grey } from "@material-ui/core/colors";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AddInitiativeYearDialog, {
  FormData,
} from "../components/dialogs/AddInitiativeYearDialog";
import _ from "lodash";
import { fetch, FetchProps } from "../api/apiFetcher";
import Alerts, { CustomAlertProps } from "../components/dialogs/Alerts";
import { FETCHTYPE } from "../constants/apiConstants";
import { isErrorMessage } from "../api/apiParser";
import { getYear, format } from "date-fns";
import Link from "next/link";
import BreadcrumbsWrapper from "../components/BreadcrumbsWrapper";

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
    initiativeYearCard: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const initiatives = (props: Props) => {
  const router = useRouter();
  const classes = useStyles();

  const [isFetching, setIsFetching] = useState(false);
  const [isYearsEmpty, setYearsEmpty] = useState(false);

  const [isShowingAddInitiativeYear, setAddInitiativeYear] = useState(false);
  const [initiativeYears, setInitiativeYears] = useState([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let defaultCustomAlertProps = {
    showAlert: false,
    message: "",
    alertType: "info",
  } as CustomAlertProps;
  const [customAlertProps, setCustomAlertProps] = useState<CustomAlertProps>(
    defaultCustomAlertProps
  );

  const showAddInitiativeYearDialog = () => {
    setAddInitiativeYear(true);
    setCustomAlertProps(defaultCustomAlertProps);
  };

  const handleAddInitiativeYearClose = (showAlert: boolean) => {
    setAddInitiativeYear(false);
    setCustomAlertProps(
      showAlert
        ? ({
            showAlert: true,
            message: "Succesfully added Initiative Year!",
            alertType: "success",
          } as CustomAlertProps)
        : defaultCustomAlertProps
    );
    if (showAlert) {
      getListOfInitiatives();
    }
  };

  const getListOfInitiatives = async () => {
    setIsFetching(true);
    try {
      const response = await fetch({
        type: FETCHTYPE.GET,
        url: "/initiativeYear",
      } as FetchProps);
      if (isErrorMessage(response)) {
        setCustomAlertProps({
          showAlert: true,
          message: response?.message,
          alertType: "error",
        } as CustomAlertProps);
      } else {
        setYearsEmpty(_.isEmpty(response.data[0]));
        setCustomAlertProps(defaultCustomAlertProps);
        let currentInitiativeYears = initiativeYears;
        currentInitiativeYears = [];
        response.data?.forEach((item) => {
          let formatedInitiativeYear = {} as InitiativeYear;
          formatedInitiativeYear.initiative_year = item.initiative_year;
          formatedInitiativeYear.isActive =
            getYear(new Date(item.initiative_year)) === 2020 ? true : false;
          formatedInitiativeYear.initiative_display_year = "Initiatives - ".concat(
            format(new Date(item.initiative_year), "yyyy")
          );
          let rollOut =
            item?.initiative_roll_out &&
            format(new Date(item.initiative_roll_out), "MMM Mo, yyyy");
          let completion =
            item?.initiative_completion &&
            format(new Date(item.initiative_completion), "MMM Mo, yyyy");

          let initiative_display_duration;
          if (!_.isEmpty(rollOut) && !_.isEmpty(completion)) {
            initiative_display_duration = rollOut
              .concat(" - ")
              .concat(completion);
          } else if (!_.isEmpty(rollOut) && _.isEmpty(completion)) {
            initiative_display_duration = rollOut;
          } else {
            initiative_display_duration = completion;
          }
          formatedInitiativeYear.initiative_display_duration = initiative_display_duration;
          currentInitiativeYears.push(formatedInitiativeYear);
        });
        setInitiativeYears(currentInitiativeYears);
      }
    } catch (err) {}
    setIsFetching(false);
  };

  useEffect(() => {
    getListOfInitiatives();
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    alert("test");
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

  const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
      badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation: "$ripple 1.2s infinite ease-in-out",
          border: "1px solid currentColor",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    })
  )(Badge);

  const getAvatar = (showBadge) => {
    return showBadge ? (
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot"
      >
        <Avatar>
          <CalendarTodayIcon />
        </Avatar>
      </StyledBadge>
    ) : (
      <Avatar>
        <CalendarTodayIcon />
      </Avatar>
    );
  };

  const initiativesDashboard = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppBar position="static" elevation={0}>
            <Toolbar disableGutters={true} className={classes.toolbar}>
              <Typography variant="h5" className={classes.title}>
                Initiatives
              </Typography>
              <IconButton onClick={showAddInitiativeYearDialog} color="inherit">
                <CalendarTodayIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid item xs={12}>
            <List component="nav" aria-label="secondary mailbox folders">
              {initiativeYears?.map((row) => (
                <Card className={classes.initiativeYearCard}>
                  <CardContent>
                    <ListItem key={row.initiative_year} alignItems="flex-start">
                      <ListItemAvatar>{getAvatar(row.isActive)}</ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography variant="h5" color="textPrimary">
                              {row.initiative_display_year}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textSecondary"
                            >
                              {row?.initiative_display_duration}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Link
                          href={
                            "/initiativesdashboard?pid=" +
                            row.initiative_display_year
                          }
                        >
                          <IconButton
                            edge="end"
                            aria-label="view-initiatives"
                            // onClick={() => {
                            //   router.push(
                            //     "/initiativesdashboard?pid=" +
                            //       row.initiative_display_year
                            //   );
                            // }}
                          >
                            <PostAddOutlinedIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          edge="end"
                          aria-label="more"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          elevation={2}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem divider onClick={handleClose}>
                            Edit
                          </MenuItem>{" "}
                          <MenuItem divider onClick={handleClose}>
                            Make Active
                          </MenuItem>
                          <MenuItem onClick={handleClose}>Archive</MenuItem>
                        </Menu>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    { name: "Initiatives", href: "" },
  ];

  return (
    <ScaffoldWrapper showBackdrop={isFetching}>
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
          <BreadcrumbsWrapper links={links} />
          {isYearsEmpty ? placeholder() : initiativesDashboard()}
          <Alerts
            showAlert={customAlertProps.showAlert}
            alertType={customAlertProps.alertType}
            message={customAlertProps.message}
          />
          <AddInitiativeYearDialog
            open={isShowingAddInitiativeYear}
            onClose={handleAddInitiativeYearClose}
          />
        </Box>
      </div>
    </ScaffoldWrapper>
  );
};

export default initiatives;
