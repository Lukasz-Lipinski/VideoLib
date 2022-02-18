import Link from "next/link";

import { GrFacebook } from "react-icons/gr";

function Options() {
  return (
    <>
      <div className="form--options">
        <span>
          <input id="rememberMe" type="checkbox" name="remeberMe" />
          <label htmlFor="rememberMe">Remember me</label>
        </span>
        <Link href="">
          <a>Need help?</a>
        </Link>
      </div>

      <Link href="">
        <a>
          <span>
            <GrFacebook />
          </span>
          Log with Facebook
        </a>
      </Link>
      <p>
        New to Netflix?
        <Link href="/">
          <a>Sign up now!</a>
        </Link>
      </p>
    </>
  );
}

export default Options;
