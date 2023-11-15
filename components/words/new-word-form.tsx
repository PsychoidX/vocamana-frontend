"use client"
import { addMultipleWords } from "@/api/words";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form"
import { Button, ButtonsArea, SubmitButton } from "@/components/common/button";

type WordsForm = {
  wordInputs: {
    word: string;
    memo: string;
  }[];
}

export default function NewWordForm(
  props: {
    redirectTo: string,
}) {
  const { redirectTo } = props;
  const router = useRouter();
  const { control, register, handleSubmit } = useForm<WordsForm>({
    defaultValues: {
      wordInputs: [{
        word: "",
        memo: "",
      }]
  }});
  const { fields, append } = useFieldArray({
    control,
    name: 'wordInputs'
  })

  const onSubmit = async (data: WordsForm) => {
    const wordReqs: WordCreationRequest[] = [];

    for(const wordInput of data.wordInputs) {
      const word = wordInput.word;
      const memo = wordInput.memo;
      if(word.length > 0) {
        wordReqs.push({
          word: word,
          memo: memo,
        })
      }
    }
    const success = await addMultipleWords(wordReqs);

    if(success) {
      router.push(redirectTo)
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <div className="block" key={item.id}>
          <div className="field">
            <label htmlFor="word" className="label">単語</label>
            <div className="control">
              <input className="input" {...register(`wordInputs.${index}.word` as const)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="memo" className="label">メモ</label>
            <div className="control">
              <textarea className="textarea" {...register(`wordInputs.${index}.memo` as const)} />
            </div>
          </div>
        </div>
      ))}

      <ButtonsArea
        additionalClassNames="mb-6"
        isCentered={ true }
      >
        <Button
          onClick={ () => {
            append({
              word: "",
              memo: "",
            })
          }}>フォーム追加</Button>
        <SubmitButton>送信</SubmitButton>
      </ButtonsArea>
    </form>
  );
}