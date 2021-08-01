import { useRef, useCallback, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

function ChapterNav({ chapterList, onSelectChapter }) {
  const chapterMenu = useRef(null);
  const onClickOutside = useCallback(() => onSelectChapter(false), []);
  useClickOutside(chapterMenu, onClickOutside);

  function scrollToChapter(chapterId) {
    const scrollContainer = document.getElementById("book");
    const chapterEl = document.querySelector(
      `[data-chapter-id="${chapterId}"]`
    );
    scrollContainer.scrollTo({
      top: chapterEl.offsetTop,
      behavior: "smooth",
    });
  }
  return (
    <ul
      ref={chapterMenu}
      className="absolute right-0 top-12 bg-white border border-gray-100 rounded w-48 text-right"
    >
      {chapterList.map((c, i) => {
        return (
          <li
            key={i}
            onClick={() => {
              onSelectChapter(true);
              scrollToChapter(c.id);
            }}
            className={`cursor-pointer hover:bg-gray-50  px-4 py-3`}
          >
            Chapter {i + 1}: {c.content}
          </li>
        );
      })}
    </ul>
  );
}

export default function BookHeader({
  title,
  author,
  hide,
  coverThumb,
  published,
  currentChapter,
  chapterList,
  setBlockMainScrollFn,
  setHide,
}) {
  const [showChapterNav, setShowChapterNav] = useState(false);

  return (
    <div
      className={`fixed bg-white shadow-md w-full left-0 ${
        hide ? "-top-32" : "top-0 opacity-1"
      } transition-all duration-500`}
    >
      <div className="flex justify-between mx-auto max-w-3xl p-4">
        <div className="flex ">
          <img className="shadow" src={coverThumb} style={{ height: "75px" }} />
          <div className="ml-4 flex flex-col justify-between">
            <div>
              <h1 className="font-medium text-lg">
                {title}
                <br />
                <span className="font-normal"> by {author}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="flex mb-1">
          <span
            className={`cursor-pointer relative h-10 flex items-center justify-center hover:bg-gray-50 p-2 rounded`}
            onClick={() => setShowChapterNav(!showChapterNav)}
          >
            <span className="text-lg">Table of contents</span>

            {showChapterNav && (
              <ChapterNav
                chapterList={chapterList}
                onSelectChapter={(hideNav) => {
                  setShowChapterNav(false);

                  if (hideNav) {
                    setHide(true);
                  }
                  setBlockMainScrollFn(true);
                }}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
