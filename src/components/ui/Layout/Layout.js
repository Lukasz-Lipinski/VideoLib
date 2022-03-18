import { useContext } from "react";
import MyContext from "../../../context/index";

function Layout({ children }) {
  const { classes } = useContext(MyContext);
  const { container } = classes;
  return <div className={container}>{children}</div>;
}

export default Layout;
