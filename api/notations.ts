import axios from "axios";

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