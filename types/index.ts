type Word = {
  id: number;
  word: string;
  memo: string;
  user_id: number;
}

type Sentence = {
  id: number;
  sentence: string;
  user_id: number;
}

type Notation = {
  id: number;
  word_id: number;
  notation: string; 
}