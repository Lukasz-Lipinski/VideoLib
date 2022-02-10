import React from "react";
import MyContext from "../../context/index";

import { NavLink } from "../";

function Signup() {
  const { classes } = React.useContext(MyContext);

  const { signup } = classes;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={signup} onSubmit={handleSubmit}>
      <span className={`${signup}--emailAddress`}>
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" />
      </span>
      <NavLink href="/signup/regform" label="Get Started &rsaquo;" />
    </form>
  );
}

export default Signup;
