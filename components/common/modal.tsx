import classNames from "classnames";

// isActiveがtrueの時だけモーダルを表示
// toggleIsActiveにisActiveの状態管理関数を渡すことで、
// モーダル右上の「×」クリックにより非表示化可能
export default function Modal(
  props: {
    toggleIsActive: ()=>void,
    isActive: boolean,
    children: React.ReactNode,
  },
) {
  const { toggleIsActive, isActive, children } = props;
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
          <button
            className={classNames(
              "modal-close",
              "is-large",
            )}
            onClick={toggleIsActive}
          ></button>
        </div>
      </div>
  );
}