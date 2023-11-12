import React from "react";

type CardProps = {
  content: string,
  dangerouslySetContent?: boolean,
}

export function Card(props: CardProps) {
  const { content, dangerouslySetContent } = props;
  
  // dangerouslySetContentがtrueの場合、contentをHTMLエスケープせずSet
  let contentDiv: React.ReactNode;
  if(dangerouslySetContent) {
    contentDiv = <div
      className="content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  } else {
    <div className="content">{ content }</div>
  }

  return(
    <div className="card mb-5">
      <div className="card-content">
        { contentDiv }        
      </div>
    </div>
  );
}