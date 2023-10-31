import axios from "axios"
import { use } from "react"

type Word = {
  id: number;
  word: string;
  memo: string;
  user_id: number;
}

async function getWordById(wordId: string): Promise<Word> {
  const numWordId = Number(wordId);
  
  if(isNaN(numWordId)) {
    throw new Error(`Error: ${wordId} is invalid word id.`);
  }

  const words = axios
    .get(`http://localhost:8081/words/${wordId}`)
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

export default function WordDetail(props: {wordId: string}) {
  const { wordId } = props;
  const word: Word = use(getWordById(wordId));
  return (
    <>
      <h2>{word.word}</h2>
      <p>{word.memo}</p>
    </>
  );
}