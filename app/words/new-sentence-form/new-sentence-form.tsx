"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { SubmitButton } from "@/components/common/button";

type SentenceFormValues = {
  sentence: string
}

export default function NewWordForm() {
  const { 
    register,
    handleSubmit,
  } = useForm<SentenceFormValues>();

  const router = useRouter();

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
        router.push("/words")
      } catch(err) {
        console.log(`Error: ${err}`)
      }
    })}
  >

  <label htmlFor="sentence">Sentence:</label>
  <textarea {...register("sentence", {required: true})} />

  <SubmitButton>送信</SubmitButton>
</form>
  );
}