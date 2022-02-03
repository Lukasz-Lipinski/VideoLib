import Link from "next/link";

import { GrFacebook } from "react-icons/gr";

function Form() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Sign In</h2>
      <input type="text" placeholder="Email or phone number" />
      <input type="password" placeholder="Password" />
      <button>Sign in</button>
      <div className="form--options">
        <label htmlFor="rememberMe">Remember me</label>
        <input id="rememberMe" type="checkbox" name="remeberMe" />
        <Link href="">
          <a>Need help?</a>
        </Link>
      </div>
      <Link href="">
        <a>
          <GrFacebook />
          Log with Facebook
        </a>
      </Link>
      <p>
        New to Netflix?
        <Link href="/signup">
          <a>SIGN UP NOW!</a>
        </Link>
      </p>
    </form>
  );
}

export default Form;
