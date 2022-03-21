export default function Option(props) {
  const {
    title,
    description: { price, opportunities },
  } = props;
  return (
    <li className="card">
      <h2>{title}</h2>
      <section>
        <div>Price {price}$ per month</div>
        <div className="description">{opportunities}</div>
      </section>
      <button>Choose</button>
    </li>
  );
}
