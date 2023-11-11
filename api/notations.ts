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

export async function getAllNotations(wordId: string): Promise<Notation[]> {
  const notations = axios
    .get(`http://localhost:8081/words/${wordId}/notations`)
    .then((res) => {
      return res.data === null ? [] : res.data;
    })
    .catch((err) => {
      if(err.response) {
        console.log(`Error: ${err.message} (${err.response.message})`);
        return err.response;
      } else {
        throw new Error(`Error: No Response. ${err.message}`);
      }
    });

  return notations;
}