import { addNotation } from "@/api/notations";
import { useForm } from "react-hook-form";

type NotationFormValues = {
  notation: string
}
export default function NewNotationForm(
  props: {
    wordId: string,
    onAfterSubmit: (notation: Notation)=>void,
  }) {
  const { wordId, onAfterSubmit } = props;
  const { register, handleSubmit } = useForm<NotationFormValues>();

  const onSubmit = async (data: NotationFormValues) => {
    const notation = data.notation;
    const createdNotation = await addNotation(wordId, notation);

    if(createdNotation) {
      // 作成に成功した場合、新規作成したNotationを引数に取るコールバック関数を実行
      onAfterSubmit(createdNotation);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <label htmlFor="notation">新規表記揺れ:</label>
      <input {...register("notation", {required: true})} />
      <input type="submit" />
    </form>
  );
}