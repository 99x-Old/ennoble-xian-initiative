import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const getBreadcrumb = (links) => {
  const classes = useStyles();
  return links.map((link, i, arr) =>
    arr.length - 1 === i ? (
      <Typography color="textPrimary">{link.name}</Typography>
    ) : (
      <Link className={classes.customLink} href={link.href}>
        <Typography className={classes.customLink}>{link.name}</Typography>
      </Link>
    )
  );
};

const BreadcrumbsWrapper = ({ links }) => {
  //   const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {getBreadcrumb(links)}
      {/* <Link href="/dashboard">
  <Typography className={classes.customLink}>Dashboard</Typography>
</Link>
<Link className={classes.customLink} href="/initiatives">
  <Typography className={classes.customLink}>Initiatives</Typography>
</Link>
<Typography color="textPrimary">{pid && pid}</Typography> */}
    </Breadcrumbs>
  );
};

export default BreadcrumbsWrapper;
