'use server'
import axios, { AxiosResponse} from "axios";

export async function getAssociatedSentences(wordId: string): Promise<Sentence[]> {
  if(isNaN(Number(wordId))) {
    console.log(`Error: ${wordId} is invalid word id.`);
    return [];
  }

  try {
    const res: AxiosResponse<Sentence[]> = await axios.get(`http://localhost:8081/words/${wordId}/associated-sentences`);
    const sentences: Sentence[] = res.data;
    if(sentences === null) {
      return [];
    } else {
      return sentences;
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
