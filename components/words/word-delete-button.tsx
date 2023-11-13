'use client'
import { useRouter } from "next/navigation"
import { deleteWord } from "@/api/words";
import { ConfirmDeleteModalOpenButton } from "../common/modal";

// wordIdに該当するWordを削除し、
// 削除後にredirectToで指定さたパスに遷移
export default function WordDeleteButton(
  props: {
    wordId: string,
    redirectTo: string,
  }
) {
  const { wordId, redirectTo } = props;
  const router = useRouter()

  async function handleDelete(wordId: string) {
    const success = await deleteWord(wordId);
    if(success) {
      router.push(redirectTo);
      router.refresh()
    }
  }
  
  return (
    // <DangerButton
    //   onClick={ ()=> handleDelete(wordId) }
    // >
    //   削除
    // </DangerButton>
    <ConfirmDeleteModalOpenButton
      confirmMessage={`id=${wordId}の単語を削除します。よろしいですか？`}
      onClickDelete={ ()=>{ handleDelete(wordId) }}
    >削除</ConfirmDeleteModalOpenButton>
  )
}