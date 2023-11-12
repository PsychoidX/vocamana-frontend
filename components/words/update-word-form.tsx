import { updateWord } from "@/api/words";
import { useForm } from "react-hook-form"
import { SubmitButton } from "@/components/common/button";

type WordFormValues = {
  word: string
  memo: string
}

export default function UpdateWordForm(
  props: {
    word: Word, // 更新対象のword
    onAfterSubmit: (word: Word)=>void, // 更新完了時に実行
}) {
  const { word, onAfterSubmit } = props;
  const { register, handleSubmit } = useForm<WordFormValues>({
    defaultValues: {
      word: word.word,
      memo: word.memo,
    }
  });

  const onSubmit = async (data: WordFormValues) => {
    const inputWord = data.word;
    const inputMemo = data.memo;
    const updatedWord = await updateWord(String(word.id), inputWord, inputMemo);

    if(updatedWord) {
      onAfterSubmit(updatedWord);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="word">Word:</label>
      <input {...register("word", {required: true})} />

      <label htmlFor="memo">Memo:</label>
      <input {...register("memo")} />

      <SubmitButton>更新</SubmitButton>
    </form>
  );
}