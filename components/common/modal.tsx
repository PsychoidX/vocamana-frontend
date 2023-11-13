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
    isActive: boolean,
    children: React.ReactNode,
  },
) {
  const { onClickCloseButton, isActive, children } = props;
  
  let closeModalButton: React.ReactNode = <></>;
  if(onClickCloseButton) {
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

// 削除して良いかを確認するメッセージと
// 「削除」「キャンセル」ボタンを含むモーダル
function ConfirmDeleteModal(
  props: {
    isActive: boolean, // tureの間だけ表示
    message: string,
    onClickDelete: ()=>void,
    onClickCancel: ()=>void,
}) {
  const { isActive, message, onClickDelete, onClickCancel } = props;

  return(
    <Modal
      isActive={ isActive }
    >
      <p>{ message }</p>
      <ButtonsArea>
        <DangerButton onClick={ onClickDelete }>削除</DangerButton>
        <Button onClick={ onClickCancel }>キャンセル</Button>
      </ButtonsArea>
    </Modal>

  );
}

// クリックでConfirmDeleteButtonを表示させるボタン
export function ConfirmDeleteModalOpenButton(
  props: {
    confirmMessage: string, // 例: 「xxxを本当に削除しますか？」
    onClickDelete: ()=>void, // 表示されるモーダルの「削除」押下時の処理
    onClickCancel?: ()=>void, // 表示されるモーダルの「キャンセル」押下時の処理
    children: React.ReactNode,
}) {
  const { confirmMessage, onClickDelete, onClickCancel, children } = props;
  const [showModal, setShowModal] = useState(false);

  // 削除・キャンセルいずれかが押下されたら
  // モーダルを非表示にする
  function handleDelete() {
    onClickDelete();
    setShowModal(false);
  }

  function handleCancel() {
    if(onClickCancel) {
      onClickCancel();
    }
    setShowModal(false);
  }

  return(
    <>
      <DangerButton
        onClick={ () => { setShowModal(true) }}
      >
        { children }
      </DangerButton>
      <ConfirmDeleteModal
        isActive={ showModal }
        message={ confirmMessage }
        onClickDelete={ handleDelete }
        onClickCancel={ handleCancel }
      />
    </>
  )
}