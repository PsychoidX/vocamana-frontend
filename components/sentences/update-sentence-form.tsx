import { useForm } from "react-hook-form"
import { ButtonsArea, Button, SubmitButton } from "@/components/common/button";
import { updateSentence } from "@/api/sentences";

type SentenceFormValues = {
  sentence: string,
}

export default function UpdateSentenceForm(
  props: {
    sentence: Sentence, // 更新対象のSentence
    onAfterSubmit: (sentence: Sentence)=>void, // 更新完了時に実行
    onClickCancel: ()=>void, // キャンセルボタン押下時に実行
}) {
  const { sentence, onAfterSubmit, onClickCancel } = props;
  const { register, handleSubmit } = useForm<SentenceFormValues>({
    defaultValues: {
      // defaultにSentence.sentence_with_linkをそのまま渡すと
      // aタグ付きのsentenceを編集することになるため
      // 生の方のSentence.sentenceを渡す
      sentence: sentence.sentence,
    }
  });

  const onSubmit = async (data: SentenceFormValues) => {
    const inputSentence = data.sentence;
    const updatedSentence = await updateSentence(String(sentence.id), inputSentence);
    
    if(updatedSentence) {
      onAfterSubmit(updatedSentence);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>      
      <div className="field">
        <div className="control">
          <textarea className="textarea" {...register("sentence")} />
        </div>
      </div>

      <ButtonsArea>
        <SubmitButton>更新</SubmitButton>
        <Button
          onClick={ onClickCancel }
        >キャンセル</Button>
      </ButtonsArea>
    </form>
  );
}