import WordDetail from "./word-detail";

export default function WordDetailPage({ params }: {params: {wordId: string}}) {
  return (
    <WordDetail wordId={params.wordId} />
  );
}