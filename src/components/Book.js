import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import BookHeader from "./BookHeader";
import BookFooter from "./BookFooter";
import BookWrapper from "./BookWrapper";
import BookContent from "./BookContent";

const getClosestFrag = (frags, target) =>
  frags.reduce((frag, curr) => {
    return Math.abs(curr.offsetTop - target) < Math.abs(frag.offsetTop - target)
      ? curr
      : frag;
  });

const getClosestChapter = (chapters, target) =>
  chapters.reduce((prev, chapter) => {
    return target >= chapter.offsetTop ? chapter : prev;
  });

const getClosestScrolledFragment = (e) => {
  const frags = [...e.target.querySelectorAll("[data-fragment-id]")].map(
    (n) => ({
      offsetTop: n.offsetTop,
      id: n.getAttribute("data-fragment-id"),
    })
  );
  const closestFragment = getClosestFrag(frags, e.target.scrollTop);

  return closestFragment.id;
};

const getCurrentChapter = (e) => {
  const chapters = [...e.target.querySelectorAll("[data-chapter-id]")].map(
    (n, i) => ({
      offsetTop: n.offsetTop,
      title: `Chapter ${i + 1}: ${n.getAttribute("data-chapter-title")}`,
    })
  );
  const currentChapter = getClosestChapter(
    chapters,
    e.target.scrollTop + e.target.clientHeight
  );

  return currentChapter.title;
};

export default function Book({
  version,
  fragments,
  setBookCache,
  cacheLastFragScrolled,
  theme: cachedTheme,
}) {
  const bookContainer = useRef(null);
  const [coverPxEnd, setCoverPxEnd] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [beyondCover, setBeyondCover] = useState(false);
  const [hideBookHeader, setHideBookHeader] = useState(false);
  const [blockMainScrollFn, setBlockMainScrollFn] = useState(false);
  const [percentRead, setPercentRead] = useState(0);
  const [theme, setTheme] = useState(
    cachedTheme || { fontClassification: "SERIF", fontSize: "NORMAL" }
  );
  const [chapterList] = useState(fragments.filter((f) => f.type === "CHAPTER"));
  const [currentChapterTitle, setCurrentChapterTitle] = useState("");

  useEffect(() => {
    if (bookContainer.current && cacheLastFragScrolled) {
      const frag = bookContainer.current.querySelector(
        `[data-fragment-id="${cacheLastFragScrolled}"]`
      );
      const cover = bookContainer.current.querySelector(".cover-image");
      setCoverPxEnd(cover.offsetTop + cover.clientHeight);

      if (frag) {
        bookContainer.current.scrollTo({
          top: frag.offsetTop,
        });
      }
    }
  }, [bookContainer, cacheLastFragScrolled]);

  return (
    <div
      ref={bookContainer}
      id="book"
      className="overflow-scroll max-h-screen"
      onScroll={debounce((e) => {
        if (!blockMainScrollFn) {
          const currScrollTop = e.target.scrollTop;
          const closestFragmentId = getClosestScrolledFragment(e);
          // TODO - don't think we need to cache this chapter title, as we recalculate on scroll
          // setBookCache("currentChapterTitle", currentChapterTitle);
          setCurrentChapterTitle(getCurrentChapter(e));
          setBookCache("lastFragScrolled", closestFragmentId);
          setBeyondCover(e.target.scrollTop > 50);

          const VISIBLE_END_PX =
            currScrollTop - coverPxEnd + e.target.clientHeight;
          setPercentRead(
            Math.floor(
              (100 / (e.target.scrollHeight - coverPxEnd)) * VISIBLE_END_PX
            )
          );

          if (currScrollTop < coverPxEnd || currScrollTop > prevScrollTop) {
            setHideBookHeader(true);
          } else {
            setHideBookHeader(false);
          }
          setPrevScrollTop(currScrollTop);
        } else {
          // console.log("re-enable?");
          setBlockMainScrollFn(false);
        }
      }, 50)}
    >
      <BookHeader
        title={version.title}
        author={version.author}
        hide={hideBookHeader}
        coverThumb={version.signedCoverUrlThumb}
        published={version.publishedAt}
        currentChapter={currentChapterTitle}
        setBlockMainScrollFn={setBlockMainScrollFn}
        chapterList={chapterList}
        setHide={setHideBookHeader}
        theme={theme}
        setTheme={(field, value) => {
          const newTheme = { ...theme, [field]: value };
          setTheme(newTheme);
          setBookCache("theme", newTheme);
        }}
      />

      <img
        src={version.signedCoverUrl}
        className="cover-image mx-auto"
        style={{
          height: `${(100 / 3) * 4}vw`,
          maxHeight: "100vh",
        }}
      />

      <BookWrapper theme={theme}>
        <BookContent fragments={fragments} theme={theme} />
      </BookWrapper>

      <BookFooter
        hide={!beyondCover || !hideBookHeader}
        currentChapter={currentChapterTitle}
        percentRead={percentRead}
      />
    </div>
  );
}
