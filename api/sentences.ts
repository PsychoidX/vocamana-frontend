'use server'
import axios, { AxiosResponse } from "axios";

export async function getAllSentences(
  limit: number,
  offset: number,
): Promise<Sentence[]> {
  try {
    const res: AxiosResponse<Sentence[]> = await axios.get(`http://localhost:8081/sentences?limit=${limit}&offset=${offset}`);
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

export async function addSentence(sentence: string): Promise<boolean> {
  try {
    await axios.post(
      "http://localhost:8081/sentences",
      {
        sentence: sentence,
      }
    );
    return true;
  } catch(err) {
    console.log(`Error: ${err}`)
    return false;
  }
}

export async function addMultipleSentences(sentenceReqs: SentenceCreationRequest[]): Promise<boolean> {
  try {
    // TODO: sentenceReqsの間に空要素がある場合、送信しないようにする
    await axios.post(
      "http://localhost:8081/sentences/multiple",
      {
        sentences: sentenceReqs,
      }
    );
    return true;
  } catch(err) {
    console.log(`Error: ${err}`)
    return false;
  }
}

export async function updateSentence(sentenceId: string, sentence: string): Promise<Sentence|null> {
  try {
    const res: AxiosResponse<Sentence> = await axios.put(
      `http://localhost:8081/sentences/${sentenceId}?with-link=true`,
      {
        sentence: sentence,
      }
    );
    
    return res.data;
  } catch(err) {
    console.log(`Error: ${err}`)
    return null;
  }
}

export async function deleteSentence(sentenceId: string): Promise<boolean> {
  if(isNaN(Number(sentenceId))) {
    console.log(`Error: ${sentenceId} is invalid sentence id.`);
    return false;
  }

  try {
    await axios.delete(`http://localhost:8081/sentences/${sentenceId}`);
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

export async function getSentencesCount(): Promise<number> {
  try {
    const res: AxiosResponse<SentencesCount> = await axios.get(`http://localhost:8081/sentences/count`);
    return res.data.count;
  } catch(err: any) {
    if(err.response) {
      console.log(`Error: ${err.message} (${err.response.message})`);
    } else {
      console.log(`Error: No Response. ${err.message}`);
    }
    return 0;
  }
}