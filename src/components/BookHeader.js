export default function BookHeader({ title, author }) {
  return (
    <div className="fixed top-0 bg-white shadow flex justify-between px-4 py-2 w-full left-0 h-12 items-center">
      <span></span>
      <span>
        {author} - {title}
      </span>
      <span></span>
    </div>
  );
}
