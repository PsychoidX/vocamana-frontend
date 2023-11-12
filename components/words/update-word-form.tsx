import { updateWord } from "@/api/words";
import { useForm } from "react-hook-form"
import { ButtonsArea, Button, SubmitButton } from "@/components/common/button";

type WordFormValues = {
  word: string
  memo: string
}

export default function UpdateWordForm(
  props: {
    word: Word, // 更新対象のword
    onAfterSubmit: (word: Word)=>void, // 更新完了時に実行
    onClickCancel: ()=>void, // キャンセルボタン押下時に実行
}) {
  const { word, onAfterSubmit, onClickCancel } = props;
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
      <div className="field">
        <label htmlFor="word" className="label">単語</label>
        <div className="control">
          <input className="input" {...register("word", {required: true})} />
        </div>
      </div>
      
      <div className="field">
        <label htmlFor="memo" className="label">メモ</label>
        <div className="control">
          <textarea className="textarea" {...register("memo")} />
        </div>
      </div>

      <ButtonsArea>
        <SubmitButton>更新</SubmitButton>
        <Button
          onClick={ onClickCancel }
        >キャンセル</Button>
      </ButtonsArea>
    </form>
  );
}