"use client"
import axios from "axios";
import { useForm } from "react-hook-form"

type SentenceFormValues = {
  sentence: string
}

export default function NewWordForm() {
  const { 
    register,
    handleSubmit,
  } = useForm<SentenceFormValues>();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post(
            "http://localhost:8081/sentences",
            {
              sentence: data.sentence,
            }
          );
        } catch(err) {
          console.log(`Error: ${err}`)
        }
      })}
    >
      <label htmlFor="sentence">Sentence:</label>
      <textarea {...register("sentence", {required: true})} />

      <input type="submit" />
    </form>
  );
}