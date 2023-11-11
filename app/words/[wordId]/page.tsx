import WordDeleteButton from "@/components/word/word-delete-button";
import { NotationModalToggleButton } from "@/components/notation/notation-modal";
import AllNotationsList from "@/components/notation/all-notations-list";
import { use } from "react"
import AssociatedSentencesList from "@/components/word/associated-sentences-list";
import { getWordById } from "@/api/words";

export default function WordDetailPage({ params }: {params: {wordId: string}}) {
  const { wordId } = params;
  const word = use(getWordById(wordId));

  if(word) {
    return(
      <>
        <h2>{ word.word }</h2>
        <p>{ word.memo }</p>
        <AssociatedSentencesList wordId={wordId} />
        <WordDeleteButton
          wordId={wordId}
          redirectTo="/words"
        />
        <NotationModalToggleButton
          wordId={wordId}
          allWordNotationListComponent={<AllNotationsList wordId={wordId} />}  
        >
            表記揺れ追加
        </NotationModalToggleButton>
      </>
    )
  } else {
    return <p>該当する単語は見つかりませんでした</p>
  }
}