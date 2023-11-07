import WordDetail from "./word-detail";
import WordDeleteButton from "./word-delete-button";
import NotationModal from "./notation-modal";

export default function WordDetailPage({ params }: {params: {wordId: string}}) {
  return (
    <>
      <WordDetail wordId={params.wordId} />
      <WordDeleteButton wordId={params.wordId} />
      <NotationModal />
    </>
  );
}