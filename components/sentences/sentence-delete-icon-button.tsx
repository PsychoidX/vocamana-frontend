'use client'
import { deleteSentence } from "@/api/sentences";
import { ConfirmDeleteModalOpenIconButton } from "@/components/common/modal";

// sentenceIdに該当するSentenceを削除し、
// 削除後にonAfterDeleteを実行
export default function SentenceDeleteIconButton(
  props: {
    sentence: Sentence,
    onAfterDelete?: ()=>void,
  }
) {
  const { sentence, onAfterDelete } = props;

  async function handleDelete(sentenceId: string) {
    const success = await deleteSentence(sentenceId);
    if(success && onAfterDelete) {
      onAfterDelete()
    }
  }
  
  return (
    <ConfirmDeleteModalOpenIconButton
      confirmMessage={`「${sentence.sentence}」を削除します。よろしいですか？`}
      onClickDelete={ ()=>{ handleDelete(String(sentence.id)) }}
      additionalClassNames="has-text-grey"
      iconClassNames="fa-solid fa-trash"
    />
  )
}