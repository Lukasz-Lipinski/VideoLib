export default function Tags({ tags, id }) {
  return (
    <div className="tags">
      {[...tags.split(",")].map((tag, index) => (
        <span key={`tags-lists-${id}-${index}-${tag}`}>{tag}</span>
      ))}
    </div>
  );
}
