'use client'
import { useForm } from "react-hook-form"
import { SubmitButton } from "@/components/common/button";
import { addSentence } from "@/api/sentences";
import { useRouter } from "next/navigation";

type SentenceFormValues = {
  sentence: string
}

export default function NewWordForm(
  props: {
    redirectTo: string,
}) {
  const { register, handleSubmit } = useForm<SentenceFormValues>();
  const { redirectTo } = props;
  const router = useRouter();
  const onSubmit = async (data: SentenceFormValues) => {
    const sentence = data.sentence;
    const success = await addSentence(sentence);

    if(success) {
      router.push(redirectTo);
    }
  }
  return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <label htmlFor="sentence">Sentence:</label>
    <textarea {...register("sentence", {required: true})} />
    <SubmitButton>送信</SubmitButton>
  </form>
  );
}