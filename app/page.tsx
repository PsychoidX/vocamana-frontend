import { use } from "react"
import axios from "axios"

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

type Word = {
  id: number;
  word: string;
  memo: string;
  user_id: number;
}

function AllWords() {
  const words: Word[] = use(getAllWords());
  if(words === null) {
    return <p>登録済みの単語はありません</p>;
  } else {
    return(
      <div>
        {words.map((word) => (
          <div>{word.word}</div>
        ))}
      </div>
    );
  }
}

export default function Home() {
  return (
    <>
      <h1>ALL WORDS</h1>
      <AllWords />
    </>
  );
}