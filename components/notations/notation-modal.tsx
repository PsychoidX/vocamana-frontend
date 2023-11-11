"use client"

import React, { ReactNode, useState } from "react";
import { Button } from "@/components/common/button";
import Modal from "@/components/common/modal";
import NewNotationForm from "@/components/notations/new-notation-form"

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

  return (
    <>
      <Button onClick={() => setIsActive(true)}>{ children }</Button>
      <Modal
        closeModal={() => { setIsActive(false) }}
        isActive={isActive}
      >
        { allWordNotationListComponent }
        <NewNotationForm
          wordId={wordId}
          onAfterSubmit={() => {setIsActive(false)} } 
        />
      </Modal>
    </>
  );
}
