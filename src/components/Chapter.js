function getChapterFontSize(fontSize) {
  switch (fontSize) {
    case "SMALL":
      return "text-2xl";
    case "NORMAL":
      return "text-3xl";
    case "LARGE":
      return "text-4xl";
  }
}

export default function Chapter({ title, fontSize, id }) {
  return (
    <h1
      data-fragment-id={id}
      data-chapter-title={title}
      data-chapter-id={id}
      className={`text-center ${getChapterFontSize(fontSize)}`}
      style={{ margin: "3em 0" }}
    >
      {title}
    </h1>
  );
}
