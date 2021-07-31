export default function BookWrapper({ children, theme }) {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=${theme.fontFamily.replace(
        /\s/g,
        "+"
      )}&display=swap');`}</style>
      <div
        className="px-4 py-10 max-w-3xl mx-auto"
        style={{
          fontFamily: theme.fontFamily,
          lineHeight: theme.lineHeight,
        }}
      >
        {children}
      </div>
    </>
  );
}
