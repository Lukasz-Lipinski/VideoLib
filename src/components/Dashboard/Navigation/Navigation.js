import { useContext, useState } from "react";
import { ImSearch } from "react-icons/im";
import { VscBell } from "react-icons/vsc";

import { Logo, Card } from "../../";
import MyContext from "../../../context/index";
import NavLink from "../../ui/NavLink/NavLink";

export default function DashboardNavigation({ avatarColor, avatarKid }) {
  const myctx = useContext(MyContext);
  const [isSearcher, setIsSearcher] = useState(false);

  const { nav } = myctx.content.userProfiles;

  const setSearcherHandler = () => {
    setIsSearcher((state) => !state);
  };

  return (
    <nav className="dashboard-nav">
      <div className="dashboard-nav-left">
        <Logo />
        <ul>
          {nav.map((link, index) => (
            <li key={`dashborad-nav-link-${index}`}>
              <NavLink {...link} />
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard-nav-right">
        <span>
          {isSearcher ? (
            <label>
              <ImSearch onClick={setSearcherHandler} />
              <input type="search" placeholder="Title, geners..." />
            </label>
          ) : (
            <ImSearch onClick={setSearcherHandler} />
          )}
        </span>
        <span>
          <VscBell />
        </span>
        <span className="dashboard-nav-right-avatar">
          <Card bgColor={avatarColor} kidSecurity={avatarKid} />
          <p>&uarr;</p>
        </span>
      </div>
    </nav>
  );
}
