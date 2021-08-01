import { DateTime } from "luxon";

export default function BookHeader({
  title,
  author,
  hide,
  coverThumb,
  published,
}) {
  return (
    <div
      className={`fixed top-0 bg-white shadow-md w-full left-0 ${
        hide ? "opacity-0 -top-48" : "opacity-1"
      } transition-all duration-500`}
    >
      <div className="flex justify-between mx-auto max-w-3xl p-4">
        <div className="flex">
          <img
            className="rounded shadow"
            src={coverThumb}
            style={{ height: "100px" }}
          />
          <div className="ml-4 flex flex-col justify-between">
            <div>
              <h1 className="font-medium text-lg">
                {title}
                <br />
                <span className="font-normal"> by {author}</span>
              </h1>
            </div>
            <span>
              Published: {DateTime.fromISO(published).toFormat("d MMMM yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-end mb-1"></div>
      </div>
    </div>
  );
}
