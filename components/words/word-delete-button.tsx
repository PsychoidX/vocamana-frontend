'use client'
import { useRouter } from "next/navigation"
import { DangerButton } from "@/components/common/button"
import { deleteWord } from "@/api/words";

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
    <DangerButton
      onClick={ ()=> handleDelete(wordId) }
    >
      削除
    </DangerButton>
  )
}