import WordDeleteButton from "@/components/words/word-delete-button";
import { NotationModalOpenButton } from "@/components/notations/notation-modal";
import AllNotationsList from "@/components/notations/all-notations-list";
import { use } from "react"
import AssociatedSentencesList from "@/components/sentences/associated-sentences-list";
import { getWordById } from "@/api/words";
import EditableWordDetail from "@/components/words/editable-word-detail";

export default function WordDetailPage({ params }: {params: {wordId: string}}) {
  const { wordId } = params;
  const word = use(getWordById(wordId));

  if(word) {
    return(
      <>
        <EditableWordDetail word={ word } />
        <AssociatedSentencesList wordId={wordId} />
        <WordDeleteButton
          word={ word }
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