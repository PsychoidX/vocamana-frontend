import Link from "next/link"
import AllWordsList from "@/components/words/all-words-list"

export default function Home() {
  return (
    <>
      <h1>ALL WORDS</h1>
      <AllWordsList />
      <Link href={"words/new-word-form"}>単語追加</Link>
      <Link href={"words/new-sentence-form"}>文章追加</Link>
    </>
  );
}