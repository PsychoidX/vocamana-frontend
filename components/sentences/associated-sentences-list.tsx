import React, { use } from "react"
import { getAssociatedSentences } from "@/api/sentences";
import EditableSentenceBox from "./editable-sentence-box";

export default function AssociatedSentencesList(
  props: {
    wordId: string,
}) {
  const { wordId } = props;
  const sentences: Sentence[] = use(getAssociatedSentences(wordId))

  if(sentences.length === 0) {
    return <div>登録された文章はありません</div>
  } else {
    return (
      <div>
        {sentences.map((sentence) => (
          <EditableSentenceBox
            sentence={ sentence }
          />
        ))}
      </div>
    )
  }
}