function InProgress({ inProgress }) {
  return (
    inProgress && (
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <>
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </>
      </svg>
    )
  );
}

export default function StartReadingButton({
  type = "button",
  action,
  loading = false,
  isAuth = false,
  text = null,
  error = null,
  css = "",
}) {
  let stateCss;
  if (error) {
    stateCss = "text-red bg-white border cursor-default";
  } else if (loading) {
    stateCss = "bg-black text-white";
  } else {
    stateCss = "bg-offBlack hover:bg-black text-white ";
  }
  return (
    <button
      disabled={error || loading}
      type={type}
      onClick={action}
      className={`flex justify-center items-center w-full p-2 duration-200 transition-all rounded md:text-lg ${stateCss} ${css}`}
    >
      <InProgress inProgress={loading} />
      {error ||
        text ||
        (loading
          ? isAuth
            ? "Authenticating..."
            : "Getting the book..."
          : "Start reading now")}
    </button>
  );
}
