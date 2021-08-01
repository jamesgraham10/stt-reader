export default function Photo({ url, caption, fontSize, lineHeight, id }) {
  return (
    <figure className="my-10" data-fragment-id={id}>
      <img className="m-w-full" src={url} alt={caption || ""} />
      {caption && (
        <figcaption className="text-center" style={{ fontSize, lineHeight }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
