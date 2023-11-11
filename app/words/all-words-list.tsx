import { use } from "react"
import Link from "next/link"
import { getAllWords } from "@/api/words";

export default function AllWordsList() {
  const words: Word[] = use(getAllWords());
  if(words.length === 0) {
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