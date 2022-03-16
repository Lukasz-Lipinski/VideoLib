import Link from "next/link";

function NavLink(props) {
  const { label, href } = props;

  return (
    <Link href={href}>
      <a>{label}</a>
    </Link>
  );
}

export default NavLink;
