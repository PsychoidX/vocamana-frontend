"use client"

import React, { useState } from "react";
import Modal from "components/common/modal";
export default function NotationModal() {
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      <button onClick={() => toggleActive()}>表記揺れ追加</button>
      <Modal
        toggleIsActive={toggleActive}
        isActive={isActive}
      >
        Notation追加モーダル
      </Modal>
    </>
  );
}

