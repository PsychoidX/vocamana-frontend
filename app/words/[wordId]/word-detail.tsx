import axios from "axios"
import { use } from "react"

type Word = {
  id: number;
  word: string;
  memo: string;
  user_id: number;
}

type Sentence = {
  id: number;
  sentence: string;
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

async function getSentencesByWordId(wordId: string): Promise<Sentence[]> {
  const numWordId = Number(wordId);
  
  if(isNaN(numWordId)) {
    throw new Error(`Error: ${wordId} is invalid word id.`);
  }

  const sentences = axios
    .get(`http://localhost:8081/words/${wordId}/associated-sentences`)
    .then((res) => res.data)
    .catch((err) => {
      if(err.response) {
        console.log(`Error: ${err.message} (${err.response.message})`);
        return err.response;
      } else {
        throw new Error(`Error: No Response. ${err.message}`);
      }
    });

  return sentences;
}

function AssociatedSentences(props: {wordId: string}) {
  const { wordId } = props;
  const sentences: Sentence[] = use(getSentencesByWordId(wordId))
  if(sentences==null) {
    return <div>登録された文章はありません</div>
  } else {
    return (
      <div>
        {sentences.map((sentence) => (
          <div
            style={{
              marginBottom: '10px'
            }}
          >
            {sentence.sentence}
          </div>
        ))}
      </div>
    )
  }
}

export default function WordDetail(props: {wordId: string}) {
  const { wordId } = props;
  const word: Word = use(getWordById(wordId));

  return (
    <>
      <h2>{word.word}</h2>
      <p>{word.memo}</p>
      <AssociatedSentences wordId={wordId} />
    </>
  );
}