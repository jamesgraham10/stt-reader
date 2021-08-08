export default function BookFooter({ currentChapter, percentRead, hide }) {
  return (
    <div
      className={`duration-500 transition-all fixed left-0 w-full bg-white border-t ${
        hide ? "-bottom-12" : "bottom-0 opacity-1"
      }`}
    >
      <div className="relative w-full h-full flex justify-between items-center px-4 py-2 max-w-3xl mx-auto">
        <span className="font-medium">{currentChapter}</span>

        <span className="font-normal">{percentRead}%</span>
      </div>
    </div>
  );
}
