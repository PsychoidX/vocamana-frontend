import { use } from "react"
import { getAssociatedSentences } from "@/api/sentences";
import { Card } from "@/components/common/card"

export default function AssociatedSentencesList(props: {wordId: string}) {
  const { wordId } = props;
  const sentences: Sentence[] = use(getAssociatedSentences(wordId))
  if(sentences.length === 0) {
    return <div>登録された文章はありません</div>
  } else {
    return (
      <div>
        {sentences.map((sentence) => (
          <Card
            dangerouslySetContent={ true }
            content={ sentence.sentence }
          />
        ))}
      </div>
    )
  }
}