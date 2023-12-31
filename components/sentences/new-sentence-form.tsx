'use client'
import { useFieldArray, useForm } from "react-hook-form"
import { SubmitButton, Button, ButtonsArea } from "@/components/common/button";
import { addMultipleSentences } from "@/api/sentences";
import { useRouter } from "next/navigation";

type SentencesForm = {
  sentenceInputs: {
    sentence: string;
  }[];
}

export default function NewSentenceForms(
  props: {
    redirectTo: string,
}) {
  const { redirectTo } = props;
  const router = useRouter();
  const { control, register, handleSubmit } = useForm<SentencesForm>({
    defaultValues: {
      sentenceInputs: [{
        sentence: "",
      }]
    }
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'sentenceInputs',
  })

  const onSubmit = async (data: SentencesForm) => {
    const sentenceReqs: SentenceCreationRequest[] = [];
    
    for(const sentenceInput of data.sentenceInputs ) {
      const sentence = sentenceInput.sentence;
      if(sentence.length > 0) {
        sentenceReqs.push({
          sentence: sentence,
        })
      }
    }
    const success = await addMultipleSentences(sentenceReqs);

    if(success) {
      router.push(redirectTo);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <div className="block" key={item.id}>
          <div className="field">
            <label className="label" htmlFor="sentence">文章</label>
            <div className="control">
              <textarea className="textarea" {...register(
              `sentenceInputs.${index}.sentence` as const)} />
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
              sentence: "",
            })
          }}>フォーム追加</Button>
        <SubmitButton>送信</SubmitButton>
      </ButtonsArea>
    </form>
  );
}