import WordDetail from "./word-detail";
import NotationModal from "./notation-modal";

export default function WordDetailPage({ params }: {params: {wordId: string}}) {
  return (
    <>
      <WordDetail wordId={params.wordId} />
      <NotationModal />
    </>
  );
}