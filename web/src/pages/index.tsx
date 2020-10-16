import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { deepPurple, grey } from "@material-ui/core/colors";

import ScaffoldWrapper from "../components/layouts/ScaffoldWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: deepPurple[800],
    },
    heroParentContainer: {
      marginTop: theme.spacing(-2),
    },
    heroContainer: {
      marginTop: theme.spacing(10),
    }
    ,heroImage: {
      width: "100%",
      height: "40%",
    },
    heroTitle: {
      fontWeight: "bold",
      letterSpacing: 1,
      color: grey[50],
    },
    heroSubTitle: {
      fontWeight: 100,
      letterSpacing: 1,
      color: grey[400],
      marginBottom: theme.spacing(2),
    },
  })
);

const showCurve = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#FAFAFA"
        fill-opacity="1"
        d="M0,256L80,224C160,192,320,128,480,133.3C640,139,800,213,960,234.7C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
  );
};

const Index = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <ScaffoldWrapper fullWidth={true} appBarElevation={-1}>
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          className={classes.heroParentContainer}
        >
          <Grid item xs={12} className={classes.heroContainer}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Container maxWidth="sm">
                  <Typography
                    variant="h4"
                    align={"left"}
                    gutterBottom
                    className={classes.heroTitle}
                  >
                    Hey there Xian! Are you looking to join an Initiative ?
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align={"left"}
                    gutterBottom
                    className={classes.heroSubTitle}
                  >
                    Dive into the 99x Initiatives App - XianIn to explore all
                    the initiatives happenning at 99x.
                  </Typography>
                </Container>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Container maxWidth="sm">
                  <img src="/undraw_work_time.png" alt="my image" className={classes.heroImage}/>
                </Container>
              </Grid>
            </Grid>
          </Grid>
          {showCurve()}
        </Grid>
      </div>
    </ScaffoldWrapper>
  );
};

export default Index;
