import WordDetail from "./WordDetail";

export default function WordDetailPage({ params }: {params: {wordId: string}}) {
  return (
    <WordDetail wordId={params.wordId} />
  );
}