'use client'
import { useState } from "react";
import { Box } from "@/components/common/box"
import { IconButton, ButtonsArea } from "../common/button"
import UpdateSentenceForm from "./update-sentence-form";
import SentenceDeleteIconButton from "./sentence-delete-icon-button";

export default function EditableSentenceBox(props: {
  sentence: Sentence
}) {
  const { sentence } = props;
  const [isEditing, setIsEditing] = useState(false); // 編集中はtrue
  const [latestSentence, setLatestSentence] = useState(sentence); // 更新した場合の最新状態のWordを管理
  const [isVisible, setIsVisible] = useState(true); // trueの間は表示。削除後に非表示にする
  function onAfterSubmit(updatedSentence: Sentence): void {
    setLatestSentence(updatedSentence)
    setIsEditing(false)
  }

  const afterContentNode = (
    <ButtonsArea additionalClassNames="mt-3">
      <IconButton
        additionalClassNames="has-text-grey"
        iconClassNames="fa-solid fa-pen"
        onClick={ () => { setIsEditing(true) }}
      />
      <SentenceDeleteIconButton
        sentence={ sentence }
        onAfterDelete={ () => { setIsVisible(false) } }
      />
    </ButtonsArea>
  )

  // 削除後は空のReactNodeを返す（不可視にする）
  if(!isVisible) {
    return <></>
  }

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