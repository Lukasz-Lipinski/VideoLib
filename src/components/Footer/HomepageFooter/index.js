import NavLink from "../../NavLink/NavLink";

function HomepageFooter({ links, number }) {
  const leftList = links.slice(0, 5);
  const middleList = links.slice(5, 9);
  const rightList = links.slice(9, links.length - 1);

  return (
    <footer className={`footer`}>
      <p>Questions? Call {number}</p>

      <div className="links">
        <div className={`footer--leftList`}>
          <ul>
            {leftList.map((link, index) => (
              <li key={`leftlist-item-${index}`}>
                <NavLink {...link} href={`/info/${link.href}`} />
              </li>
            ))}
          </ul>
        </div>

        <div className={`footer--middleList`}>
          <ul>
            {middleList.map((link, index) => (
              <li key={`leftlist-item-${index}`}>
                <NavLink {...link} href={`/info/${link.href}`} />
              </li>
            ))}
          </ul>
        </div>

        <div className={`footer--rightList`}>
          <ul>
            {rightList.map((link, index) => (
              <li key={`leftlist-item-${index}`}>
                <NavLink {...link} href={`/info/${link.href}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default HomepageFooter;
