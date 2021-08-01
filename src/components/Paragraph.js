export default function Paragraph({ content, fontSize, id }) {
  return (
    <p data-fragment-id={id} className="mb-6" style={{ fontSize }}>
      {content}
    </p>
  );
}
