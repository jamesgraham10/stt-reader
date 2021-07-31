export default function Chapter({ title, fontSize }) {
  return (
    <h1 style={{ fontSize, lineHeight: "3", textAlign: "center" }}>{title}</h1>
  );
}
