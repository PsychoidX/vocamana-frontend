import classNames from "classnames";

type ButtonProps = {
  onClick?: ()=>void,
  children: React.ReactNode,
  additionalClassNames?: string,
  type?: "submit"|"reset"|"button",
}

export function ButtonsArea(
  props: {
    additionalClassNames?: string,
    isCentered?: boolean,
    children: React.ReactNode,
}) {
  const { additionalClassNames, isCentered } = props;

  return(
    <div 
      className={classNames(
        "buttons",
        { "is-centered": isCentered },
        additionalClassNames || ""
      )}
    >
      { props.children }
    </div>
  );
}

function BaseButton(props: ButtonProps) {
  const { onClick, children, additionalClassNames, type } = props;

  return (
    <button
      className={classNames(
        "button",
        "is-outlined",
        additionalClassNames || "",
      )}
      onClick={onClick}
      type={ type || "button" }
    >
      {children}
    </button>
  )
}

export function Button(props: ButtonProps) {
  const { onClick, children } = props;

  return (
    <BaseButton
      additionalClassNames={classNames(
        "is-black",
      )}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}

export function SubmitButton(props: ButtonProps) {
  const { type, children } = props;

  return (
    <BaseButton
      additionalClassNames={classNames(
        "is-black",
      )}
      type="submit"
    >
      {children}
    </BaseButton>
  )
}

export function DangerButton(props: ButtonProps) {
  const { onClick, children } = props;

  return (
    <BaseButton
      additionalClassNames={classNames(
        "is-danger",
      )}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}

type IconButtonProps = {
  onClick?: ()=>void,
  additionalClassNames?: string,
  iconClassNames: string,
}

export function IconButton(props: IconButtonProps) {
  const { onClick, additionalClassNames, iconClassNames } = props;

  return(
    <button 
      className="button is-white"
      onClick={onClick}
    >
      <span className={classNames(
          additionalClassNames || "",
        )}
      >
        <i className={ iconClassNames }></i>
      </span>
    </button>
  );
}