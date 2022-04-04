export default function Option(props) {
  const {
    title,
    description: { price, opportunities },
  } = props;

  const email = localStorage.getItem("email");

  const takeAbonamentHandler = async () => {
    const result = await fetch("/api/update/abonament", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email } }),
    });
  };

  return (
    <li className="card">
      <h2>{title}</h2>
      <section>
        <div>Price {price}$ per month</div>
        <div className="description">{opportunities}</div>
      </section>
      <button onClick={takeAbonamentHandler}>Choose</button>
    </li>
  );
}
