import Option from "./Option/Option";

export default function Options({ availableOptions }) {
  return (
    <ul className="cards">
      {availableOptions.map((oneOption, index) => (
        <Option key={`available--option--${index}`} {...oneOption} />
      ))}
    </ul>
  );
}
