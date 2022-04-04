import { useRouter } from "next/router";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { increamentStep } from "../Form/redux";

export default function Snackbar(props) {
  const { className, status, message, hideSnackbar, isStep } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== "pending") {
      const timer = setInterval(() => {
        hideSnackbar(false);
        isStep ? dispatch(increamentStep()) : null;
      }, 3000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [hideSnackbar, status, isStep, dispatch]);

  const handleClick = () => {
    hideSnackbar(false);
    isStep ? dispatch(increamentStep()) : null;
  };

  return createPortal(
    <div className={`snackbar ${className}`} onClick={handleClick}>
      <h2>{status}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notification")
  );
}
