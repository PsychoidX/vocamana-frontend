"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"

type WordFormValues = {
  word: string,
  memo: string
}

export default function NewWordForm() {
  const { 
    register,
    handleSubmit,
  } = useForm<WordFormValues>();

  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post(
            "http://localhost:8081/words",
            {
              word: data.word,
              memo: data.memo,
            }
          );
          router.push("/words")
          router.refresh()
        } catch(err) {
          console.log(`Error: ${err}`)
        }
      })}
    >
      <label htmlFor="word">Word:</label>
      <input {...register("word", {required: true})} />

      <label htmlFor="memo">Memo:</label>
      <input {...register("memo")} />

      <input type="submit" />
    </form>
  );
}