"use client"
import { addWord } from "@/api/words";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { SubmitButton } from "@/components/common/button";

type WordFormValues = {
  word: string,
  memo: string
}

export default function NewWordForm() {
  const { register, handleSubmit } = useForm<WordFormValues>();
  const router = useRouter();
  const onSubmit = async (data: WordFormValues) => {
    const word = data.word;
    const memo = data.memo;
    const success = await addWord(word, memo);

    if(success) {
      router.push("/words")
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="word">Word:</label>
      <input {...register("word", {required: true})} />

      <label htmlFor="memo">Memo:</label>
      <input {...register("memo")} />

      <SubmitButton>送信</SubmitButton>
    </form>
  );
}