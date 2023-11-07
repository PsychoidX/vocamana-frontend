"use client"

import axios from "axios";
import { useRouter } from "next/navigation"

export default function WordDeleteButton(props: {wordId: string}) {
  const router = useRouter()

  function handleDelete(wordId: string) {
    const numWordId = Number(wordId);
    
    if(isNaN(numWordId)) {
      throw new Error(`Error: ${wordId} is invalid word id.`);
    }
  
    axios.delete(`http://localhost:8081/words/${wordId}`)
    .then(() => {
      router.push("/words");
      router.refresh()
    })
    .catch((err) => {
      if(err.response) {
        console.log(`Error: ${err.message} (${err.response.message})`);
      } else {
        console.log(`Error: No Response. ${err.message}`);
      }
    });
  }
  
  const { wordId } = props;
  return <button
            type="button"
            onClick={ ()=> handleDelete(wordId)}
          >削除</button>
}