import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { increamentStep } from "../Form/redux";

export default function Snackbar(props) {
  const { className, status, message, hideSnackbar, isStep } = props;

  const dispatch = useDispatch();
  const increment = isStep && status === "success";

  useEffect(() => {
    if (status !== "pending") {
      const timer = setInterval(() => {
        hideSnackbar(false);
        increment ? dispatch(increamentStep()) : null;
      }, 3000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [hideSnackbar, status, increment, dispatch]);

  const handleClick = () => {
    if (status !== "pending") {
      hideSnackbar(false);
      increment ? dispatch(increamentStep()) : null;
    }
  };

  return createPortal(
    <div className={`snackbar ${className}`} onClick={handleClick}>
      <h2>{status}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notification")
  );
}
