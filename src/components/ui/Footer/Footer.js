import React from "react";

import HomepageFooter from "./HomepageFooter";
import OtherSiteFooter from "./OtherSiteFooter";

function Footer(props) {
  const { isHomepage, links, number } = props;

  return (
    <>
      {isHomepage ? (
        <HomepageFooter links={links} number={number} />
      ) : (
        <OtherSiteFooter links={links} number={number} />
      )}
    </>
  );
}

export default Footer;
