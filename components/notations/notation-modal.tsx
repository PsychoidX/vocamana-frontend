"use client"

import React, { ReactNode, useState } from "react";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import NewNotationForm from "@/components/notations/new-notation-form"
import NotationTagWithDeleteButton from "@/components/notations/notation-tag";
import { TagsArea } from "@/components/common/tag";
import { useRouter } from "next/navigation";

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
    // AllWordNotationはデータフェッチを伴うSCで、CC内ではレンダリングできないため
    // あらかじめSC内でレンダリングしておく
    allWordNotationListComponent: ReactNode,
    children: React.ReactNode,
  }) {
  const { wordId, allWordNotationListComponent, children } = props;
  const [isActive, setIsActive] = useState(false);
  const [createdNotations, setCreatedNotations] = useState<Notation[]>([]);
  const router = useRouter();

  function onAfterSubmit(notation: Notation): void {
    setCreatedNotations([...createdNotations, notation])
  }

  function onClickCloseButton() {
    // Notationが追加・削除された場合、
    // 変更をリンク作成に再反映させるため、画面を再読み込み
    router.push(`/words/${wordId}`);
    router.refresh();
    setIsActive(false)
  }

  return (
    <>
      <Button onClick={() => setIsActive(true)}>{ children }</Button>
      <Modal
        onClickCloseButton={onClickCloseButton}
        isActive={isActive}
      >
        <div className="mb-5">
          <p className="has-text-weight-bold is-size-6">登録済みの表記揺れ</p>
          <TagsArea>
            { allWordNotationListComponent }
            <CreatedNotationsList notations={createdNotations} />
          </TagsArea>
        </div>
        <NewNotationForm
          wordId={wordId}
          onAfterSubmit={onAfterSubmit} 
        />
      </Modal>
    </>
  );
}
