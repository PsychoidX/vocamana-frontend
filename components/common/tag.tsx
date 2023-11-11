import classNames from "classnames";

type TagProps = {
  showDeleteButton?: boolean,
  onDeleteButtonClick?: ()=>void,
  children: React.ReactNode,
  additionalClassNames?: string,
}

export function Tag(props: TagProps) {
  const { showDeleteButton, onDeleteButtonClick, children, additionalClassNames} = props;
  
  let deleteButton: React.ReactNode|undefined;
  if(showDeleteButton) {
    deleteButton = <button className="delete" onClick={onDeleteButtonClick}></button>
  }

  return (
    <span 
      className={classNames(
        "tag",
        "is-medium",
        additionalClassNames || "",
    )}>
      { children }
      { deleteButton }
    </span>
  )
}