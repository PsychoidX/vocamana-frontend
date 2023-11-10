"use client"

import React, { useState } from "react";
import { Button } from "@/components/common/button";
import Modal from "@/components/common/modal";
import NewNotationForm from "@/components/notation/new-notation-form"

// クリックでNotationModalを表示させるボタン
export function NotationModalToggleButton(
  props: {
    wordId: string,
    children: React.ReactNode,
  }) {
  const { wordId, children } = props;
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
        <NewNotationForm
          wordId={wordId}
          setIsActice={setIsActive} 
        />
      </Modal>
    </>
  );
}
