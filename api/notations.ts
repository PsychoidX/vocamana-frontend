'use server'
import axios, { AxiosResponse } from "axios";


export async function addNotation(wordId: string, notation: string): Promise<boolean> {
  try {
    await axios.post(
      `http://localhost:8081/words/${wordId}/notations`,
      {
        notation: notation,
      }
    );
    return true;
  } catch(err) {
    console.log(`Error: ${err}`)
    return false;
  }
}

export async function getAllNotations(wordId: string): Promise<Notation[]> {
  if(isNaN(Number(wordId))) {
    console.log(`Error: ${wordId} is invalid word id.`);
    return [];
  }

  try {
    const res: AxiosResponse<Notation[]> = await axios.get(`http://localhost:8081/words/${wordId}/notations`);
    const notations: Notation[] = res.data;
    if(notations === null) {
      return [];
    } else {
      return notations;
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