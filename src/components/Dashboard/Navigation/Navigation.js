import { useContext } from "react";
import { VscBell } from "react-icons/vsc";

import { Logo, Card, Searcher } from "../../";
import MyContext from "../../../context/index";
import NavLink from "../../ui/NavLink/NavLink";

export default function DashboardNavigation({ profile }) {
  const { profileName, bgColor, kidSecurity } = profile;
  const myctx = useContext(MyContext);

  const { nav } = myctx.content.userProfiles;

  return (
    <nav className="dashboard-nav">
      <div className="dashboard-nav-left">
        <Logo />
        <ul>
          <li>
            <NavLink
              label={"Main site"}
              href={`/dashboard/userAccount/${profileName}`}
            />
          </li>
          {nav.map((link, index) => (
            <li key={`dashborad-nav-link-${index}`}>
              <NavLink
                href={`${link.href}${profileName}/${link.label}`}
                label={link.label}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard-nav-right">
        <span>
          <Searcher />
        </span>
        <span>
          <VscBell />
        </span>
        <span className="dashboard-nav-right-avatar">
          <Card bgColor={bgColor} kidSecurity={kidSecurity} />
          <p>&uarr;</p>
        </span>
      </div>
    </nav>
  );
}
