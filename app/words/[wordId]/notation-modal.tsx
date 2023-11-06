"use client"

import { useState } from "react";
import classNames from "classnames";

export default function NotationModal() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button onClick={() => setIsActive(!isActive)}>表記揺れ追加</button>
      <div
        className={classNames(
          "modal",
          "is-info",
          { "is-active": isActive },
        )}
      >
        Notation追加用モーダル
      </div>
    </>
  );
}