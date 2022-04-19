import Link from "next/link";

function NavLink({ label, href }) {
  return (
    <Link href={href}>
      <a>{label}</a>
    </Link>
  );
}

export default NavLink;
