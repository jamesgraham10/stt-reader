export default function AppearanceButton({ active, style, onClick, children }) {
  return (
    <button
      className={`focus:outline-none py-1 px-3 hover:bg-lightestGray h-10 flex justify-center items-center rounded border hover:text-black transition duration-300 ${
        active
          ? "border-offBlack shadow text-black"
          : "border-transparent text-darkGray"
      }`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
