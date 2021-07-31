import Chapter from "./Chapter";
import Paragraph from "./Paragraph";
import Photo from "./Photo";

export default function BookContent({ fragments, theme }) {
  return fragments.map((fragment) => {
    switch (fragment.type) {
      case "CHAPTER":
        return (
          <Chapter
            key={fragment.id}
            title={fragment.content}
            fontSize={theme.chapterFontSize}
          />
        );
      case "TEXT":
        return (
          <Paragraph
            key={fragment.id}
            content={fragment.content}
            fontSize={theme.fontSize}
          />
        );
      case "PHOTO":
        return (
          <Photo
            key={fragment.id}
            url={fragment.mediaUrl}
            caption={fragment.mediaCaption}
            fontSize={theme.fontSize}
          />
        );
      default:
        return null;
    }
  });
}
