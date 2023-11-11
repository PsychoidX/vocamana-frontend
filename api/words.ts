'use server'
import axios from "axios";

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