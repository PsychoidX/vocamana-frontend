'use client'
import classNames from "classnames";
import React, { useState } from "react";
import { ButtonsArea, DangerButton, Button } from "./button";

// isActiveがtrueの間だけモーダルを表示
// hasCloseButton==trueの場合、右上に「×」ボタンを表示
// closeModalに、実行でisActiveをfalseにするコールバック関数を渡すことで
// モーダル右上の「×」クリックにより非表示化可能
export function Modal(
  props: {
    onClickCloseButton?: ()=>void,
    hasCloseButton?: boolean,
    isActive: boolean,
    children: React.ReactNode,
  },
) {
  const { onClickCloseButton, hasCloseButton, isActive, children } = props;
  
  let closeModalButton: React.ReactNode = <></>;
  if(hasCloseButton) {
    closeModalButton = (
      <button
        className={classNames(
          "modal-close",
          "is-large",
        )}
        onClick={onClickCloseButton}
      ></button>
    )
  }

  return (
      <div
        className={classNames(
          "modal",
          "is-info",
          { "is-active": isActive },
        )}
      >
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            {children}
          </div>
          { closeModalButton }
        </div>
      </div>
  );
}