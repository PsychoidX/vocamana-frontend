'use client'
import { deleteNotation } from "@/api/notations";
import { Tag } from "@/components/common/tag";

export default function NotationTagWithDeleteButton(props: { notation: Notation }) {
  const { notation } = props;
  async function handleDelete(notationId: string) {
    const success = await deleteNotation(notationId);
    if(success) {
      // TODO: 一覧から対応Notationを非表示
    }
  }

  return(
    <Tag
      showDeleteButton={true}
      onDeleteButtonClick={ () => { handleDelete(String(notation.id)) }}
    >
      { notation.notation }
    </Tag>
  )
}