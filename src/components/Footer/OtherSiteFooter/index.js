import { NavLink } from "../..";

function OtherSiteFooter({ links, number }) {
  const leftList = links.slice(0, 2);
  const middleList = links.slice(5, 7);
  const rightList = links.slice(links.length - 4, links.length - 1);

  const iterateList = (list, listName) => {
    return list.map((link, index) => (
      <li key={`${listName}-other-link`}>
        <NavLink label={link.label} href={`/info/${link.href}`} />
      </li>
    ));
  };

  return (
    <footer className={`footer`}>
      {number ? (
        <p>Questions? Call {number}</p>
      ) : (
        <div>
          <NavLink label="Question? Contact us." href="/info/question" />
        </div>
      )}
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

export default OtherSiteFooter;
