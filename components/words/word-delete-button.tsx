'use client'
import { useRouter } from "next/navigation"
import { deleteWord } from "@/api/words";
import { ConfirmDeleteModalOpenButton } from "../common/modal";

// wordIdに該当するWordを削除し、
// 削除後にredirectToで指定さたパスに遷移
export default function WordDeleteButton(
  props: {
    word: Word,
    redirectTo: string,
  }
) {
  const { word, redirectTo } = props;
  const router = useRouter()

  async function handleDelete(wordId: string) {
    const success = await deleteWord(wordId);
    if(success) {
      router.push(redirectTo);
      router.refresh()
    }
  }
  
  return (
    <ConfirmDeleteModalOpenButton
      confirmMessage={`「${word.word}」を削除します。よろしいですか？`}
      onClickDelete={ ()=>{ handleDelete(String(word.id)) }}
    >削除</ConfirmDeleteModalOpenButton>
  )
}