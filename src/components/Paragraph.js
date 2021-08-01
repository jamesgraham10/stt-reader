function getParagraphFontSize(fontSize) {
  switch (fontSize) {
    case "SMALL":
      return "text-base";
    case "NORMAL":
      return "text-lg";
    case "LARGE":
      return "text-xl";
  }
}

export default function Paragraph({ content, fontSize, id }) {
  return (
    <p
      data-fragment-id={id}
      className={`mb-6 ${getParagraphFontSize(fontSize)}`}
      style={{ marginBottom: "2em" }}
    >
      {content}
    </p>
  );
}
