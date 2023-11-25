import { use } from "react"
import { getAllSentences } from "@/api/sentences";
import EditableSentenceBox from "@/components/sentences/editable-sentence-box"

export default function AllSentencesPage() {
  const sentences = use(getAllSentences());

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