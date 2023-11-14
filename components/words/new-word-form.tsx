"use client"
import { addMultipleWords } from "@/api/words";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form"
import { Button, SubmitButton } from "@/components/common/button";

type FormData = {
  wordForms: {
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
  const { control, register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      wordForms: [{
        word: "",
        memo: "",
      }]
  }});
  const { fields, append } = useFieldArray({
    control,
    name: 'wordForms'
  })

  const onSubmit = async (data: FormData) => {
    const wordReqs: WordCreationRequest[] = [];

    for(const wordForm of data.wordForms) {
      const word = wordForm.word;
      const memo = wordForm.memo;
      if(word.length > 0) {
        wordReqs.push({
          word: word,
          memo: memo,
        })
      }
    }
    console.log(wordReqs);
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
          <input {...register(`wordForms.${index}.word` as const)} />
          <label htmlFor="memo">Memo:</label>
          <input {...register(`wordForms.${index}.memo` as const)} />
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