import { NavLink } from "..";

function Footer(props) {
  const { isHomepage, links } = props;

  console.log(links);

  return (
    <footer className={`footer`}>
      <ul></ul>
    </footer>
  );
}

export default Footer;
