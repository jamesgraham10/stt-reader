export default function AppearanceButton({ active, style, onClick, children }) {
  return (
    <button
      className={`focus:outline-none py-1 px-3 hover:bg-gray-50 h-10 flex justify-center items-center rounded border hover:text-black transition duration-300 ${
        active
          ? "border-gray-700 shadow text-black"
          : "border-transparent text-gray-400"
      }`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
