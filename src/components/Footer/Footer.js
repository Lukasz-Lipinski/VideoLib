import { NavLink } from "..";
import React from "react";

function Footer(props) {
  const { isHomepage, links, number } = props;

  const iterateList = React.useCallback((list, listName) => {
    return list.map((link, index) => (
      <li key={`${listName}--link---${index}`}>
        <NavLink {...link} />
      </li>
    ));
  }, []);

  if (isHomepage) {
    const leftList = links.slice(0, 5);
    const middleList = links.slice(5, 9);
    const rightList = links.slice(9, links.length - 1);
    return (
      <footer className={`footer`}>
        <p>Questions? Call {number}</p>

        <div className="links">
          <div className={`footer--leftList`}>
            <ul>{iterateList(leftList, "leftList")}</ul>
          </div>

          <div className={`footer--middleList`}>
            <ul>{iterateList(middleList, "middleList")}</ul>
          </div>

          <div className={`footer--rightList`}>
            <ul>{iterateList(rightList, "rightList")}</ul>
          </div>
        </div>
      </footer>
    );
  } else {
    const leftList = links.slice(0, 2);
    const middleList = links.slice(5, 7);
    const rightList = links.slice(links.length - 4, links.length - 1);

    return (
      <footer className={`footer`}>
        <p>Questions? Call {number}</p>
        <div className="links">
          <div className={`footer--leftList`}>
            <ul>{iterateList(leftList, "leftList")}</ul>
          </div>

          <div className={`footer--middleList`}>
            <ul>{iterateList(middleList, "middleList")}</ul>
          </div>

          <div className={`footer--rightList`}>
            <ul>{iterateList(rightList, "rightList")}</ul>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
