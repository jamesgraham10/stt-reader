export default function ({ currentChapter, percentRead, hide }) {
  return (
    <div
      className={`duration-500 transition-all fixed left-0 w-full bg-white flex justify-between items-center px-4 py-2 border-t ${
        hide ? "-bottom-24 opacity-0" : "bottom-0 opacity-1"
      }`}
    >
      <span className="font-medium">{currentChapter}</span>
      <span className="font-normal">{percentRead}%</span>
    </div>
  );
}
