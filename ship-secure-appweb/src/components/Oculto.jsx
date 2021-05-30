import React from "react"; //rafc el hideen para oculta la lista
import { withWidth, Typography, Hidden, Button } from "@material-ui/core";

const Oculto = (props) => {
  return (
    <div>
      <Typography variant="h1" color="initial">
        Ancho : {props.width}
      </Typography>
      <Hidden xsDown>
        <Button variant="contained" color="primary">
          xs
        </Button>
      </Hidden>
    </div>
  );
};

export default withWidth()(Oculto);
