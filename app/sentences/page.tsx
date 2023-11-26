import { use } from "react"
import { getAllSentences, getSentencesCount } from "@/api/sentences";
import EditableSentenceBox from "@/components/sentences/editable-sentence-box"
import Pagination from "@/components/common/pagination"

export default function AllSentencesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string|undefined };
}) {
  const currentPageParam = searchParams["page"];
  let currentPage = 1;
  if(!isNaN(Number(currentPageParam))) {
    currentPage = Number(currentPageParam)
  }

  const sentencesPerPage = 100; // 1ページあたりに表示するSentnece
  const offset = (currentPage - 1) * sentencesPerPage;
  const sentences = use(getAllSentences(sentencesPerPage, offset));
  const count = use(getSentencesCount());

  if(sentences.length === 0) {
    return <div>登録された文章はありません</div>
  } else {
    const sentencesPerPage = 100 // 1ページあたりに表示するSentenceの数
    const maxPage = Math.ceil(count / sentencesPerPage)
    return (
      <>
        <h1>ALL SENTENCES</h1>
        <div>
          {sentences.map((sentence) => (
            <EditableSentenceBox
              sentence={ sentence }
            />
          ))}
          <Pagination
            maxPage={ maxPage }
            currentPage={ currentPage }
          />
        </div>
      </>
    )
  }
}