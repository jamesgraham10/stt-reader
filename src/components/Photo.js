export default function Photo({ url, caption, fontSize }) {
  return (
    <figure className="my-10">
      <img className="m-w-full" src={url} alt={caption || ""} />
      {caption && <figcaption style={{ fontSize }}>{caption}</figcaption>}
    </figure>
  );
}
