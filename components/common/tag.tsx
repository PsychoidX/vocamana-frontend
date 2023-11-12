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

// Bulmaでは<div class="tag">を<div class="tags">で囲うことで、
// 中のタグを適度な隙間を空けて表示する
export function TagsArea(props: { children: React.ReactNode }) {
  const { children } = props;

  return(
    <div className="tags">{ children }</div>
  )
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