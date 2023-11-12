import classNames from "classnames";
import Link from "next/link";
import React from "react";

type TagProps = {
  showDeleteButton?: boolean,
  onDeleteButtonClick?: ()=>void,
  children: React.ReactNode,
  additionalClassNames?: string,
  href?: string,
}

export function Tag(props: TagProps) {
  const { showDeleteButton, onDeleteButtonClick, children, additionalClassNames, href } = props;
  
  let deleteButton: React.ReactNode|undefined;
  if(showDeleteButton) {
    deleteButton = <button className="delete" onClick={onDeleteButtonClick}></button>
  }

  let childrenWithLink: React.ReactNode;
  if(href) {
    childrenWithLink = <Link href={ href }>{ children }</Link>;
  } else {
    childrenWithLink = children;
  }

  return (
    <span 
      className={classNames(
        "tag",
        "is-medium",
        additionalClassNames || "",
    )}>
      { childrenWithLink }
      { deleteButton }
    </span>
  )
}

export function LargeTag(props: TagProps) {
  const { children, href } = props;
  return (
    <Tag 
      additionalClassNames="is-large"
      href={ href }
      showDeleteButton={ props.showDeleteButton }
      onDeleteButtonClick={ props.onDeleteButtonClick }
    >
      { children }
    </Tag>
  );
}