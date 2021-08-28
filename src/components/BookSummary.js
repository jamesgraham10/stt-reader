export default function BookSummary({ bookInfo, loading }) {
  return bookInfo || loading ? (
    <div className="mb-4 md:mb-0 justify-center flex">
      {loading ? (
        <div
          className="bg-lightGray rounded animate-pulse"
          style={{ width: "30vh", height: "40vh" }}
        ></div>
      ) : (
        <img
          alt="Book cover"
          className="shadow animate-fade-in rounded"
          src={bookInfo.coverUrlThumb}
          style={{ width: "30vh", height: "40vh" }}
        />
      )}
    </div>
  ) : null;
}
