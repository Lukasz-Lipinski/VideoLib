import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import { VscBell } from "react-icons/vsc";

import { Logo, Card, Searcher } from "../../";
import MyContext from "../../../context/index";
import NavLink from "../../ui/NavLink/NavLink";

export default function DashboardNavigation({ profile }) {
  const router = useRouter();
  const { query } = router;

  const account = useMemo(() => {
    if (query.hasOwnProperty("account")) return ({ account } = query);
    if (query.hasOwnProperty("genre")) {
      const [account, _] = query.genre;
      return account;
    }
  }, [query]);

  const { profileName, bgColor, kidSecurity } = profile;
  const myctx = useContext(MyContext);

  const { nav } = myctx.content.userProfiles;

  const clickHandler = () => {
    signOut();
  };

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
        <div className="dashboard-nav-right-dropdown">
          <div className="dashboard-nav-right-dropdown_btn">
            <Card bgColor={bgColor} kidSecurity={kidSecurity} />
            <p>&uarr;</p>
          </div>
          <ul className="dashboard-nav-right-dropdown_content">
            <li>
              <NavLink
                href={`/dashboard/userAccount/profile-settings`}
                label="Settings"
              />
            </li>
            <li>
              <NavLink href={`/dashboard`} label="Chagne profile" />
            </li>
            <li>
              <hr />
            </li>
            <li onClick={clickHandler}>Signout</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
