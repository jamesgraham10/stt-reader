export default function StatusMessage({ children: message }) {
  return (
    <div
      className="bg-offWhite rounded shadow py-4 px-2"
      style={{ width: "250px" }}
    >
      <p className="my-4 text-center">{message}</p>
    </div>
  );
}
