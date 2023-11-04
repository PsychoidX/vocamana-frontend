import { use } from "react"
import axios from "axios"
import Link from "next/link"

async function getAllWords() {
  const words = axios
    .get("http://localhost:8081/words")
    .then((res) => res.data)
    .catch((err) => {
      if(err.response) {
        console.log(`Error: ${err.message} (${err.response.message})`);
        return err.response;
      } else {
        throw new Error(`Error: No Response. ${err.message}`);
      }
    });
    return words;
}

function AllWordsList() {
  const words: Word[] = use(getAllWords());
  if(words === null) {
    return <p>登録済みの単語はありません</p>;
  } else {
    return(
      <div>
        {words.map((word) => (
          <Link
            key={word.id}
            href={`words/${word.id}`}
            style={{
              marginRight: '10px'
            }}
          >
            {word.word}
          </Link>
        ))}
      </div>
    );
  }
}

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