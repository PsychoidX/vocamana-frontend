'use server'
import axios, { AxiosResponse } from "axios";

export async function addNotation(wordId: string, notation: string): Promise<Notation|null> {
  try {
    const res: AxiosResponse<Notation> = await axios.post(
      `http://localhost:8081/words/${wordId}/notations`,
      {
        notation: notation,
      }
    );
    const createdNotation: Notation = res.data;

    // POSTに成功したら、新規作成されたNotationを返す
    return createdNotation;
  } catch(err) {
    console.log(`Error: ${err}`)
    return null;
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

export async function deleteNotation(notationId: string): Promise<boolean> {
  if(isNaN(Number(notationId))) {
    console.log(`Error: ${notationId} is invalid notation id.`);
    return false;
  }

  try {
    await axios.delete(`http://localhost:8081/notations/${notationId}`);
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