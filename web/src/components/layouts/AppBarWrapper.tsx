import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Theme,
  createStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useRouter } from "next/router";

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
  offset: theme.mixins.toolbar,
}),
);

const AppBarWrapper = (props) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <React.Fragment>
      <AppBar position="fixed" elevation={props.appBarElevation ? props.appBarElevation : 3}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            Xian In
          </Typography>
          {
            router.pathname == "/signin" ||  router.pathname == "/" ? <Button color="inherit" onClick={()=> router.push("/signin")}>Sign In</Button> : null
          }
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </React.Fragment>
  );
};

export default AppBarWrapper;
