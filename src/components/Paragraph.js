function getParagraphFontSize(fontSize) {
  switch (fontSize) {
    case "SMALL":
      return "text-base";
    case "NORMAL":
      return "text-lg";
    case "LARGE":
      return "text-xl";
    default:
      return "";
  }
}

export default function Paragraph({ content, fontSize, id }) {
  return (
    <p
      data-fragment-id={id}
      className={`${getParagraphFontSize(fontSize)}`}
      style={{ marginBottom: "2em" }}
    >
      {content}
    </p>
  );
}
