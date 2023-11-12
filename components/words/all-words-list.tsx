import { use } from "react"
import { getAllWords } from "@/api/words";
import { TagsArea, LargeTag } from "@/components/common/tag"

export default function AllWordsList() {
  const words: Word[] = use(getAllWords());
  if(words.length === 0) {
    return <p>登録済みの単語はありません</p>;
  } else {
    return(
      <TagsArea>
        {words.map((word) => (
          <LargeTag
            key={word.id}
            href={`words/${word.id}`}
          >
            {word.word}
          </LargeTag>
        ))}
      </TagsArea>
    );
  }
}