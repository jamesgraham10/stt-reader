function getFontFamily(classification) {
  switch (classification) {
    case "SERIF":
      return "Source Serif Pro";
    case "SANS":
      return "Source Sans Pro";
    default:
      return "";
  }
}

export default function BookWrapper({ children, theme }) {
  const fonts = ["Source Serif Pro", "Source Sans Pro"];
  return (
    <>
      <style>
        {fonts.map(
          (font) =>
            `@import url('https://fonts.googleapis.com/css2?family=${font.replace(
              /\s/g,
              "+"
            )}&display=swap');`
        )}
      </style>
      <div
        className="px-4 py-10 max-w-3xl mx-auto"
        style={{
          fontFamily: getFontFamily(theme.fontClassification),
          lineHeight: "1.4",
        }}
      >
        {children}
      </div>
    </>
  );
}
