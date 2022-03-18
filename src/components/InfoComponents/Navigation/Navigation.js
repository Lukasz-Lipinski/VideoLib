import Link from "next/link";
import { useContext } from "react";
import MyContext from "../../../context/";

export default function Navigation({ handleClickRouter }) {
  const appCtx = useContext(MyContext);

  const { nav } = appCtx.classes;

  return (
    <nav className={nav}>
      <div className={`${nav}--leftPart`}>
        <Link href="/">
          <a>VideoLib</a>
        </Link>

        <Link href="/info/call-center">
          <a>Call center</a>
        </Link>
      </div>
      <div className={`${nav}--rightPart`}>
        <button onClick={handleClickRouter.bind(this, "/signup/regform")}>
          Join
        </button>
        <button onClick={handleClickRouter.bind(this, "/signin")}>
          Sign in
        </button>
      </div>
    </nav>
  );
}
