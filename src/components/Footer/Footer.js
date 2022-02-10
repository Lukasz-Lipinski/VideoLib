import { NavLink } from "..";
import React from "react";
import HomepageFooter from "./HomepageFooter";
import OtherSiteFooter from "./OtherSiteFooter";

function Footer(props) {
  const { isHomepage, links, number } = props;

  const iterateList = React.useCallback((list, listName) => {
    return list.map((link, index) => (
      <li key={`${listName}--link---${index}`}>
        <NavLink {...link} />
      </li>
    ));
  }, []);

  return (
    <>
      {isHomepage ? (
        <HomepageFooter
          links={links}
          number={number}
          iterateList={iterateList}
        />
      ) : (
        <OtherSiteFooter
          links={links}
          number={number}
          iterateList={iterateList}
        />
      )}
    </>
  );
}

export default Footer;
