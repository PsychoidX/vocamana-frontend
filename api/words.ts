'use server'
import axios, { AxiosResponse } from "axios";

export async function getAllWords(): Promise<Word[]> {
  try {
    const res: AxiosResponse<Word[]|null> = await axios.get("http://localhost:8081/words");
    if(res.data === null) {
      return [];
    } else {
      const words = res.data;
      return words;
    }
  } catch(err: any) {
    if(err.response) {
      console.log(`Error: ${err.message} (${err.response.message})`);
    } else {
      console.log(`Error: No Response. ${err.message}`);
    }
    return [];
  }  
}

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

export async function addMultipleWords(wordReqs: WordCreationRequest[]): Promise<boolean> {
  try {
    // TODO: wordReqsの間に空要素がある場合、送信しないようにする
    await axios.post(
      "http://localhost:8081/words/multiple",
      {
        words: wordReqs
      }
    );
    return true;
  } catch(err) {
    console.log(`Error: ${err}`)
    return false;
  }
}

export async function updateWord(wordId: string, word: string, memo: string): Promise<Word|null> {
  try {
    const res: AxiosResponse<Word> = await axios.put(
      `http://localhost:8081/words/${wordId}`,
      {
        word: word,
        memo: memo,
      }
    );
    
    return res.data;
  } catch(err) {
    console.log(`Error: ${err}`)
    return null;
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