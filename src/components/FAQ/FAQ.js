import React from "react";

import MyContext from "../../context";

function FAQ({ children }) {
  const { classes } = React.useContext(MyContext);

  const { FAQ } = classes;

  return <ul className={FAQ}>{children}</ul>;
}

export default FAQ;
