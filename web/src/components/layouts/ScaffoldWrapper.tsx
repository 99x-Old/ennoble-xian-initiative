import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import AppBarWrapper from "./AppBarWrapper";
import ContainerGridWrapper from "./ContainerGridWrapper";
import Skeleton from "@material-ui/lab/Skeleton";
import BackDropWrapper from "./BackDropWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    skeletonContainer: {
      marginTop: 16,
    },
  })
);

const ScaffoldWrapper = (props) => {
  const classes = useStyles();

  const showChildrenAsSkeleton = () => {
    return (
      <Container className={classes.skeletonContainer}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" height={150} />
      </Container>
    );
  };

  return (
    <ContainerGridWrapper>
      <BackDropWrapper showBackdrop={props.showBackdrop} />
      <AppBarWrapper appBarElevation={props.appBarElevation}/>
      <div className={classes.root}>
        {!props.fullWidth ? (
          <Grid container spacing={2}>
            <Grid item xs={1} md={2} lg={3} />
            <Grid item xs={10} md={8} lg={6}>
              {!props.showBackdrop ? props.children : null}
            </Grid>
            <Grid item xs={1} md={2} lg={3} />
          </Grid>
        ) : (
          <Grid item xs={12}>
            {!props.showBackdrop ? props.children : null}
          </Grid>
        )}
      </div>
    </ContainerGridWrapper>
  );
};

export default ScaffoldWrapper;
