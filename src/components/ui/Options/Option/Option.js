import { useState } from "react";
import { useRouter } from "next/router";
import Snackbar from "../../Snackbar";

export default function Option(props) {
  const {
    title,
    description: { price, opportunities },
  } = props;

  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    className: "",
    message: "",
    status: "",
  });
  const router = useRouter();

  const email = localStorage.getItem("email");

  const takeAbonamentHandler = async () => {
    const response = await fetch("/api/update/abonament", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email }, abonament: { title, price } }),
    });

    if (response.ok) {
      router.push("/signin");
      return;
    }

    setIsSnackbar(true);
    setSnackbarData({
      className: "error",
      status: "Error",
      message: "Connection problem",
    });
    return;
  };

  return (
    <>
      <li className="card">
        <h2>{title}</h2>
        <section>
          <div>Price {price}$ per month</div>
          <div className="description">{opportunities}</div>
        </section>
        <button onClick={takeAbonamentHandler}>Choose</button>
      </li>
      {isSnackbar && <Snackbar />}
    </>
  );
}
