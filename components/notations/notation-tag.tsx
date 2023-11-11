'use client'
import { deleteNotation } from "@/api/notations";
import { Tag } from "@/components/common/tag";
import { useState } from "react";

export default function NotationTagWithDeleteButton(props: { notation: Notation }) {
  const { notation } = props;
  const [isVisible, setIsVisible] = useState(true);

  async function handleDelete(notationId: string) {
    const success = await deleteNotation(notationId);
    if(success) {
      setIsVisible(false);
    }
  }

  if(isVisible) {
    return(
      <Tag
        showDeleteButton={true}
        onDeleteButtonClick={ () => { handleDelete(String(notation.id)) }}
      >
        { notation.notation }
      </Tag>
    );
  } else {
    return <></>
  }
}