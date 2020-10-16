import React from "react";
import { useRouter } from "next/router";
import ScaffoldWrapper from "../components/layouts/ScaffoldWrapper";
import {
  Grid,
  Paper,
  makeStyles,
  Box,
  Typography,
  Divider,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Link from 'next/link'

interface Props {}

const useStyles = makeStyles((theme) => ({
  box: {
    padding: 24,
  },
  insets: {
    marginLeft: 16,
    marginRight: 16,
  },
  root: {
    flexGrow: 1,
  },
  cardRoot: {
    maxWidth: 345,
  },
}));

const dashboard = (props: Props) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <ScaffoldWrapper>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <React.Fragment>
              <Grid item xs={4}>
                <Card className={classes.cardRoot}>
                  <Link href="/initiatives">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Initiatives"
                        height="140"
                        image="/initiative_card.jpg"
                        title="Initiatives"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Initiatives
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.cardRoot}>
                  <CardActionArea onClick={() => router.push("/signup")}>
                    <CardMedia
                      component="img"
                      alt="Performance"
                      height="140"
                      image="/performance_card.jpg"
                      title="Performance"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Performance
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.cardRoot}>
                  <CardActionArea onClick={() => router.push("/signup")}>
                    <CardMedia
                      component="img"
                      alt="Monitor"
                      height="140"
                      image="/monitor_card.jpg"
                      title="Monitor"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Monitor
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </div>
    </ScaffoldWrapper>
  );
};

export default dashboard;
