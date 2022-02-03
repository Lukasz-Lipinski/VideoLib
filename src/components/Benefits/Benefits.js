import React from "react";
import MyContext from "../../context";

function Benefits(props) {
  const { children } = props;
  const { classes } = React.useContext(MyContext);

  const { benefits } = classes;

  return <ul className={benefits}>{children}</ul>;
}

export default Benefits;
