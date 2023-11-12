import { addNotation } from "@/api/notations";
import { useForm } from "react-hook-form";
import { SubmitButton } from "@/components/common/button";

type NotationFormValues = {
  notation: string
}

export default function NewNotationForm(
  props: {
    wordId: string,
    onAfterSubmit: (notation: Notation)=>void,
  }) {
  const { wordId, onAfterSubmit } = props;
  const { register, handleSubmit, reset } = useForm<NotationFormValues>();

  const onSubmit = async (data: NotationFormValues) => {
    const notation = data.notation;
    const createdNotation = await addNotation(wordId, notation);

    if(createdNotation) {
      // 作成に成功した場合
      // フォームをリセット
      reset();

      // 新規作成したNotationを引数に取るコールバック関数を実行
      onAfterSubmit(createdNotation);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="field">
        <label className="label" htmlFor="notation">表記揺れ追加</label>
        <div className="control">
          <input className="input" {...register("notation", {required: true})} />
        </div>
      </div>
      <SubmitButton>追加</SubmitButton>
    </form>
  );
}