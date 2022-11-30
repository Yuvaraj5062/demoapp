import React from "react";
import TestImg from "../../testImage/simpsons_header-h_2018.jpg";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Button } from "bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderRadius: 50,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const BlogsTemplate = ({ blogsToRender }) => {
  const classes = useStyles();
  return (
    <>
      {blogsToRender.map((blog, index) => (
        <div className="col-md-4 mb-10">
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={TestImg}
              title="Paella dish"
            />
            <CardContent className="p-0">
              <Typography
                align="center"
                variant="h5"
                className="m-2"
                color="textSecondary"
                component="h5"
              >
                My blog
              </Typography>
              <Typography
                align="center"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center mb-3">
              <Button className="btn btn-primary w-50 rounded-pill ml-3">
                Approve
              </Button>
              <Button className="btn btn-outline-primary w-50 rounded-pill m-3">
                Reject
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </>
  );
};

export default BlogsTemplate;
