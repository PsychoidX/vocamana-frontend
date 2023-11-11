"use client"

import React, { ReactNode, useState } from "react";
import { Button } from "@/components/common/button";
import Modal from "@/components/common/modal";
import NewNotationForm from "@/components/notation/new-notation-form"

// クリックでNotationModalを表示させるボタン
export function NotationModalToggleButton(
  props: {
    wordId: string,
    // AllWordNotationはSCで、CC内ではレンダリングできないため
    // あらかじめSC内でレンダリングしておく
    allWordNotationListComponent: ReactNode,
    children: React.ReactNode,
  }) {
  const { wordId, allWordNotationListComponent, children } = props;
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <Button onClick={() => toggleActive()}>{ children }</Button>
      <Modal
        toggleIsActive={toggleActive}
        isActive={isActive}
      >
        { allWordNotationListComponent }
        <NewNotationForm
          wordId={wordId}
          setIsActice={setIsActive} 
        />
      </Modal>
    </>
  );
}
