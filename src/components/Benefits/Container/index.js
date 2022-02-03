import Image from "next/image";

function Container(props) {
  const { header, details, src } = props;
  return (
    <li>
      <h3>{header}</h3>
      <p>{details}</p>
    </li>
  );
}

export default Container;
