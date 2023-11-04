"use client"
import axios from "axios";
import { useForm } from "react-hook-form"

type FormValues = {
  word: string,
  memo: string
}

export default function NewWordForm() {
  const { 
    register,
    handleSubmit,
  } = useForm<FormValues>();

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