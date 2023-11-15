"use client"
import { addMultipleWords } from "@/api/words";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form"
import { Button, SubmitButton } from "@/components/common/button";

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
        <div key={item.id}>
          <label htmlFor="word">Word:</label>
          <input {...register(`wordInputs.${index}.word` as const)} />
          <label htmlFor="memo">Memo:</label>
          <input {...register(`wordInputs.${index}.memo` as const)} />
        </div>
      ))}
      <Button
        onClick={ () => {
          append({
            word: "",
            memo: "",
          })
        }}>フォーム追加</Button>
      <SubmitButton>送信</SubmitButton>
    </form>
  );
}