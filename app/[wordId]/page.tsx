"use client"

import { use } from "react"
import axios from "axios"
import { usePathname } from "next/navigation"

async function getWordById(wordId: number) {
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

function getWordIdFromPathname(pathname: string) {
  const pathAry = pathname.split('/')
  if(pathAry.length === 2){
    const id = Number(pathAry[1]);
    if(!isNaN(id)) {
      return id;
    } 
  }

  throw new Error(`Error: ${pathname} is invalid URL.`);
}

type Word = {
  id: number;
  word: string;
  memo: string;
  user_id: number;
}

export default function WordDetailPage() {
  const pathname = usePathname();
  const wordId = getWordIdFromPathname(pathname);
  const word = use(getWordById(wordId));
  return (
    <>
      <h2>{word.word}</h2>
      <p>{word.memo}</p>
    </>
  );
}