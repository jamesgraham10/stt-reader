import { useRef, useCallback, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import AppearanceButton from "./AppearanceButton";
import AppearanceLabel from "./AppearanceLabel";

function StyleSettings({ setShowStyleSettings, setTheme, theme }) {
  const styleMenu = useRef(null);
  const onClickOutside = useCallback(() => setShowStyleSettings(false), []);
  useClickOutside(styleMenu, onClickOutside);

  return (
    <div
      ref={styleMenu}
      className="absolute right-0 top-12 bg-white border border-gray-100 rounded z-40 p-2 px-3"
    >
      <div className="flex justify-between items-center my-4">
        <AppearanceLabel label="Font" />
        <div className="flex items-center">
          <div className="pr-2">
            <AppearanceButton
              active={theme.fontClassification === "SERIF"}
              style={{ fontFamily: "Source Serif Pro" }}
              onClick={() => setTheme("fontClassification", "SERIF")}
            >
              <span className="text-2xl mr-2">A</span>
              Serif
            </AppearanceButton>
          </div>
          <div className="pl-2">
            <AppearanceButton
              active={theme.fontClassification === "SANS"}
              style={{ fontFamily: "Source Sans Pro", marginTop: "-4px" }}
              onClick={() => setTheme("fontClassification", "SANS")}
            >
              <span className="text-2xl mr-2">A</span>
              Sans
            </AppearanceButton>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <AppearanceLabel label="Size" />
        <div className="flex items-center">
          <div className="pr-2">
            <AppearanceButton
              active={theme.fontSize === "SMALL"}
              onClick={() => setTheme("fontSize", "SMALL")}
            >
              Small
            </AppearanceButton>
          </div>

          <div className="pl-2 pr-2">
            <AppearanceButton
              active={theme.fontSize === "NORMAL"}
              onClick={() => setTheme("fontSize", "NORMAL")}
            >
              Normal
            </AppearanceButton>
          </div>
        </div>

        <div className="pl-2">
          <AppearanceButton
            active={theme.fontSize === "LARGE"}
            onClick={() => setTheme("fontSize", "LARGE")}
          >
            Large
          </AppearanceButton>
        </div>
      </div>
    </div>
  );
}

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
      className="absolute right-0 top-12 bg-white border border-gray-100 rounded w-48 text-right z-40"
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
  theme,
  setTheme,
}) {
  const [showChapterNav, setShowChapterNav] = useState(false);
  const [showStyleSettings, setShowStyleSettings] = useState(false);

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
        <div className="flex relative">
          <span
            className={`cursor-pointer relative hover:bg-gray-50 p-1.5 h-10 rounded`}
            onClick={() => setShowStyleSettings(!showStyleSettings)}
          >
            <span className="text-lg">
              <svg
                viewBox="0 0 24 24"
                width="28px"
                height="28px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0Z" />
                <path d="M5 18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1Zm4.5-5.2h5l.66 1.6c.15.36.5.6.89.6 .69 0 1.15-.71.88-1.34l-3.88-8.97C12.87 4.27 12.46 4 12 4c-.46 0-.87.27-1.05.69l-3.88 8.97c-.27.63.2 1.34.89 1.34 .39 0 .74-.24.89-.6l.65-1.6ZM12 5.98L13.87 11h-3.74L12 5.98Z" />
              </svg>
            </span>
          </span>

          <span
            className={`cursor-pointer relative hover:bg-gray-50 p-1.5 h-10 rounded`}
            onClick={() => setShowChapterNav(!showChapterNav)}
          >
            <span className="text-lg">
              <svg
                height="24px"
                width="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0Z" />
                <g>
                  <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5 -1.95 0-4.05.4-5.5 1.5 -1.45-1.1-3.55-1.5-5.5-1.5 -1.95 0-4.05.4-5.5 1.5v14.65c0 .25.25.5.5.5 .1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05 .1.05.15.05.25.05 .25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1Zm0 13.5c-1.1-.35-2.3-.5-3.5-.5 -1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5Z" />
                  <path d="M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24 -1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99Z" />
                  <path d="M13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99 .88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24 -1.7 0-3.24.3-4.5.83Z" />
                  <path d="M17.5 14.33c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99 .88 0 1.73.09 2.5.26v-1.52c-.79-.16-1.64-.24-2.5-.24Z" />
                </g>
              </svg>
            </span>
          </span>

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

          {showStyleSettings && (
            <StyleSettings
              setShowStyleSettings={(show) => {
                setShowStyleSettings(show);
                setBlockMainScrollFn(true);
              }}
              theme={theme}
              setTheme={setTheme}
            />
          )}
        </div>
      </div>
    </div>
  );
}
