import { use } from "react"
import { getAssociatedSentences } from "@/api/sentences";

export default function AssociatedSentencesList(props: {wordId: string}) {
  const { wordId } = props;
  const sentences: Sentence[] = use(getAssociatedSentences(wordId))
  if(sentences.length === 0) {
    return <div>登録された文章はありません</div>
  } else {
    return (
      <div>
        {sentences.map((sentence) => (
          <div
            style={{
              marginBottom: '10px'
            }}
            dangerouslySetInnerHTML={{ __html: sentence.sentence }}
          >
          </div>
        ))}
      </div>
    )
  }
}