export default function Chapter({ title, fontSize, id }) {
  return (
    <h1
      data-fragment-id={id}
      data-chapter-title={title}
      data-chapter-id={id}
      style={{ fontSize, lineHeight: "3", textAlign: "center" }}
    >
      {title}
    </h1>
  );
}
