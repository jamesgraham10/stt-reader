function getCaptionFontSize(fontSize) {
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

export default function Photo({ url, caption, fontSize, id }) {
  return (
    <figure className="my-10" data-fragment-id={id}>
      <img className="m-w-full" src={url} alt={caption || ""} />
      {caption && (
        <figcaption
          className={`text-center ${getCaptionFontSize(fontSize)}`}
          style={{ margin: ".5em 0 1em" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
