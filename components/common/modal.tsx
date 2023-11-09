import classNames from "classnames";

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