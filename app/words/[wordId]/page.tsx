import WordDetail from "./word-detail";
import WordDeleteButton from "./word-delete-button";
import { NotationModalToggleButton } from "@/components/notation/notation-modal";
import AllNotationsList from "@/components/notation/all-notations-list";

export default function WordDetailPage({ params }: {params: {wordId: string}}) {
  return (
    <>
      <WordDetail wordId={params.wordId} />
      <WordDeleteButton wordId={params.wordId} />
      <NotationModalToggleButton
        wordId={params.wordId}
        allWordNotationListComponent={<AllNotationsList wordId={params.wordId} />}  
      >
          表記揺れ追加
      </NotationModalToggleButton>
    </>
  );
}