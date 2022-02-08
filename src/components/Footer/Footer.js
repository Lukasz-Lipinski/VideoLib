import { NavLink } from "..";
import React from "react";

function Footer(props) {
  const { isHomepage, links } = props;

  const leftList = links.slice(0, 5);
  const middleList = links.slice(5, 9);
  const rightList = links.slice(9, links.length - 1);

  const iterateList = React.useCallback((list, listName) => {
    return list.map((link, index) => (
      <li key={`${listName}--link---${index}`}>
        <NavLink {...link} />
      </li>
    ));
  }, []);

  if (isHomepage) {
    return (
      <footer className={`footer`}>
        <div className={`footer--leftList`}>
          <ul>{iterateList(leftList, "leftList")}</ul>
        </div>

        <div className={`footer--middleList`}>
          <ul>{iterateList(middleList, "middleList")}</ul>
        </div>

        <div className={`footer--rightList`}>
          <ul>{iterateList(rightList, "rightList")}</ul>
        </div>
      </footer>
    );
  } else {
    return (
      <footer>
        <h1>Footer</h1>
      </footer>
    );
  }
}

export default Footer;
