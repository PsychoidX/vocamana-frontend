'use client'
import { useState } from "react";
import UpdateWordForm from "./update-word-form";
import { GrayFlatBox } from "@/components/common/box";
import { IconButton } from "../common/button";
import { useRouter } from "next/navigation";

// Wordのwordとmemoを表示
// wordの右側には編集ボタンを表示し、クリックでwordとmemoを同時編集可能
export default function EditableWordDetail(props: { word: Word }) {
  const { word } = props;
  const [isEditing, setIsEditing] = useState(false); // 編集中はtrue
  const router = useRouter();

  // memoが登録されている場合にのみGlayFlatBoxで表示
  let wordMemoBox: React.ReactNode|undefined;
  if(word && word.memo.length !== 0) {
    wordMemoBox = <GrayFlatBox content={ word.memo } />
  }

  function onAfterSubmit(updatedWord: Word): void {
    // Wordが更新された場合、
    // 変更をリンク作成に再反映させるため、画面を再読み込み
    router.push(`/words/${word.id}`);
    router.refresh();
    setIsEditing(false);
  }

  if(isEditing) {
    return(
      <UpdateWordForm
        word={ word }
        onAfterSubmit={onAfterSubmit}
        onClickCancel={ () => { setIsEditing(false) }}
      />
    );
  } else {
    return (
      <>
        <h2>
          <span>{ word.word }</span>
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
