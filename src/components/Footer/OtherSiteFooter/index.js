function OtherSiteFooter({ links, iterateList, number }) {
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

export default OtherSiteFooter;
