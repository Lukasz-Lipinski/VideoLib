import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { increamentStep } from "../Form/redux";

export default function Snackbar(props) {
  const { className, status, message, hideSnackbar } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (message !== "pending") {
      const timer = setInterval(() => {
        hideSnackbar(false);
        dispatch(increamentStep());
      }, 3000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [hideSnackbar, message, dispatch]);

  const handleClick = () => {
    hideSnackbar(false);
  };

  return (
    <div className={`snackbar ${className}`} onClick={handleClick}>
      <h2>{status}</h2>
      <p>{message}</p>
    </div>
  );
}
