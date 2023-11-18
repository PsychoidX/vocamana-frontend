type Word = {
  id: number;
  word: string;
  memo: string;
  user_id: number;
}

type WordCreationRequest = {
  word: string;
  memo: string;
}

type Sentence = {
  id: number;
  sentence: string;
  sentence_with_link: string;
  user_id: number;
}

type SentenceCreationRequest = {
  sentence: string,
}

type Notation = {
  id: number;
  word_id: number;
  notation: string; 
}