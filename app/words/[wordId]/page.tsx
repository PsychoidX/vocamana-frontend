import WordDeleteButton from "@/components/words/word-delete-button";
import { NotationModalOpenButton } from "@/components/notations/notation-modal";
import AllNotationsList from "@/components/notations/all-notations-list";
import { use } from "react"
import AssociatedSentencesList from "@/components/words/associated-sentences-list";
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
        <NotationModalOpenButton
          wordId={wordId}
          allWordNotationListComponent={<AllNotationsList wordId={wordId} />}  
        >
            表記揺れ管理
        </NotationModalOpenButton>
      </>
    )
  } else {
    return <p>該当する単語は見つかりませんでした</p>
  }
}