import { addNotation } from "@/api/notations";
import { useForm } from "react-hook-form";

type NotationFormValues = {
  notation: string
}
export default function NewNotationForm(
  props: {
    wordId: string,
    onAfterSubmit: ()=>void,
  }) {
  const { wordId, onAfterSubmit } = props;
  const { register, handleSubmit } = useForm<NotationFormValues>();

  const onSubmit = async (data: NotationFormValues) => {
    const notation = data.notation;
    const success = await addNotation(wordId, notation);

    if(success) {
      onAfterSubmit();
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