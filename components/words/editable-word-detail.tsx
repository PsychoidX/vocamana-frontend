'use client'
import { useState } from "react";
import UpdateWordForm from "./update-word-form";
import { GrayFlatBox } from "@/components/common/box";
import { IconButton } from "../common/button";

// Wordのwordとmemoを表示
// wordの右側には編集ボタンを表示し、クリックでwordとmemoを同時編集可能
export default function EditableWordDetail(props: { word: Word }) {
  const { word } = props;
  const [isEditing, setIsEditing] = useState(false); // 編集中はtrue
  const [latestWord, setLatestWord] = useState(word); // 更新した場合の最新状態のWordを管理

  // memoが登録されている場合にのみGlayFlatBoxで表示
  let wordMemoBox: React.ReactNode|undefined;
  if(latestWord && latestWord.memo.length !== 0) {
    wordMemoBox = <GrayFlatBox content={ latestWord.memo } />
  }

  function onAfterSubmit(updatedWord: Word): void {
    setLatestWord(updatedWord)
    setIsEditing(false);
  }

  if(isEditing) {
    return(
      <UpdateWordForm
        word={ latestWord }
        onAfterSubmit={onAfterSubmit}
        onClickCancel={ () => { setIsEditing(false) }}
      />
    );
  } else {
    return (
      <>
        <h2>
          <span>{ latestWord.word }</span>
          <IconButton
            iconClassNames="fa-solid fa-pen"
            onClick={ () => { setIsEditing(true) }}
          />
        </h2>
        { wordMemoBox }
      </>
    );  
  }
}
