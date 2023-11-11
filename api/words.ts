'use server'
import axios, { AxiosResponse } from "axios";

export async function getWordById(wordId: string): Promise<Word|null> {
  if(isNaN(Number(wordId))) {
    console.log(`Error: ${wordId} is invalid word id.`);
    return null;
  }

  try {
    const res: AxiosResponse<Word> = await axios.get(`http://localhost:8081/words/${wordId}`);
    const word: Word = res.data;
    return word;
  } catch(err: any) {
    if(err.response) {
      console.log(`Error: ${err.message} (${err.response.message})`);
    } else {
      console.log(`Error: No Response. ${err.message}`);
    }
    return null;
  }  
}

export async function addWord(word: string, memo: string): Promise<boolean> {
  try {
    await axios.post(
      "http://localhost:8081/words",
      {
        word: word,
        memo: memo,
      }
    );
    return true;
  } catch(err) {
    console.log(`Error: ${err}`)
    return false;
  }
}

export async function deleteWord(wordId: string): Promise<boolean> {
  if(isNaN(Number(wordId))) {
    console.log(`Error: ${wordId} is invalid word id.`);
    return false;
  }

  try {
    await axios.delete(`http://localhost:8081/words/${wordId}`);
    return true;
  } catch(err: any) {
    if(err.response) {
      console.log(`Error: ${err.message} (${err.response.message})`);
    } else {
      console.log(`Error: No Response. ${err.message}`);
    }
    return false;
  }
}