import classNames from "classnames";
import React, { useState } from "react";

type ButtonProps = {
  onClick?: ()=>void,
  children: React.ReactNode,
  additionalClassNames?: string,
  type?: "submit"|"reset"|"button",
}

function BaseButton(props: ButtonProps) {
  const { onClick, children, additionalClassNames, type } = props;

  // マウスホバー時に"is-outlined"クラスを付与
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true) }
      onMouseLeave={() => setIsHovered(false) }

      className={classNames(
        "button",
        { "is-outlined": !isHovered },
        additionalClassNames || "",
      )}
      onClick={onClick}
      type={type}
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
  const { children } = props;

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
