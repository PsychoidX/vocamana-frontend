"use client"

import React, { ReactNode, useState } from "react";
import { Button } from "@/components/common/button";
import Modal from "@/components/common/modal";
import NewNotationForm from "@/components/notations/new-notation-form"
import NotationTagWithDeleteButton from "@/components/notations/notation-tag";

// NewNotationFormで追加されたNotationを一時的に表示するためのコンポーネント
// Notationを追加する度にGETリクエストをし、AllNotationsListを更新するのは無駄なため
// それを回避するための措置
function CreatedNotationsList(props: { notations: Notation[] }) {
  const { notations } = props;

  return(
    <>
      {notations.map((notation) => (
        <NotationTagWithDeleteButton notation={notation} />
      ))}
    </>
  );
}

// クリックでNotationModalを表示させるボタン
export function NotationModalOpenButton(
  props: {
    wordId: string,
    // AllWordNotationはSCで、CC内ではレンダリングできないため
    // あらかじめSC内でレンダリングしておく
    allWordNotationListComponent: ReactNode,
    children: React.ReactNode,
  }) {
  const { wordId, allWordNotationListComponent, children } = props;
  const [isActive, setIsActive] = useState(false);
  const [createdNotations, setCreatedNotations] = useState<Notation[]>([]);

  function onAfterSubmit(notation: Notation): void {
    setCreatedNotations([...createdNotations, notation])
  }

  return (
    <>
      <Button onClick={() => setIsActive(true)}>{ children }</Button>
      <Modal
        closeModal={() => { setIsActive(false) }}
        isActive={isActive}
      >
        { allWordNotationListComponent }
        <CreatedNotationsList notations={createdNotations} />
        <NewNotationForm
          wordId={wordId}
          onAfterSubmit={onAfterSubmit} 
        />
      </Modal>
    </>
  );
}
