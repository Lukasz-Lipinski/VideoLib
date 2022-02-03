import React, { useContext } from "react";

import { useRouter } from "next/router";
import { NavLink } from "..";

import MyContext from "../../context";

function Navigation({ isHomePage }) {
  const { links, classes } = useContext(MyContext);
  const { pathname } = useRouter();

  const { nav } = classes;

  return (
    <nav className={nav}>
      {links.map((link, index) => {
        if (isHomePage) return <NavLink key={`nav-link-${index}`} {...link} />;
        else if (!isHomePage && `/${link.href}` !== pathname)
          return <NavLink key={`nav-link-${index}`} {...link} />;
      })}
    </nav>
  );
}

export default Navigation;
