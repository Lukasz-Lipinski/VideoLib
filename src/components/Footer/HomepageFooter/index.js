function HomepageFooter({ links, iterateList, number }) {
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
}

export default HomepageFooter;
