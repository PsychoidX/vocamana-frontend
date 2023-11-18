'use client'
import { useState } from "react";
import { Box } from "@/components/common/box"
import { IconButton, ButtonsArea } from "../common/button"
import UpdateSentenceForm from "./update-sentence-form";

export default function EditableSentenceBox(props: {
  sentence: Sentence
}) {
  const { sentence } = props;
  const [isEditing, setIsEditing] = useState(false); // 編集中はtrue
  const [latestSentence, setLatestSentence] = useState(sentence); // 更新した場合の最新状態のWordを管理

  function onAfterSubmit(updatedSentence: Sentence): void {
    setLatestSentence(updatedSentence)
    setIsEditing(false)
  }

  const afterContentNode = (
    <ButtonsArea>
      <IconButton
        iconClassNames="fa-solid fa-pen"
        onClick={ () => { setIsEditing(true) }}
      />
    </ButtonsArea>
  )

  if(isEditing) {
    return(
      <UpdateSentenceForm
        sentence={ latestSentence }
        onAfterSubmit={ onAfterSubmit }
        onClickCancel={ () => { setIsEditing(false) }}
      />
    );
  } else {
    return(
      <Box
        dangerouslySetContent={ true }
        content={ latestSentence.sentence_with_link }
        afterContentNode={ afterContentNode }
      />
    );
  }
}