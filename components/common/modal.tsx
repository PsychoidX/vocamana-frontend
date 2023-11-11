import classNames from "classnames";

// isActiveがtrueの時だけモーダルを表示
// closeModalに、実行でisActiveをfalseにするコールバック関数を渡すことで
// モーダル右上の「×」クリックにより非表示化可能
export default function Modal(
  props: {
    closeModal: ()=>void,
    isActive: boolean,
    children: React.ReactNode,
  },
) {
  const { closeModal, isActive, children } = props;
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
            onClick={closeModal}
          ></button>
        </div>
      </div>
  );
}