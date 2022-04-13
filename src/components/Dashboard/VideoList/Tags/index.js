export default function Tags({ tags, id }) {
  return (
    <div className="tags">
      {[...tags.split(",")].map((tag) => (
        <span key={`tags-lists-${id}`}>{tag}</span>
      ))}
    </div>
  );
}
