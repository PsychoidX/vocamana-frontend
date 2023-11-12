import React from "react";

type BoxProps = {
  content: string,
  dangerouslySetContent?: boolean,
}

export function Box(props: BoxProps) {
  const { content, dangerouslySetContent } = props;
  
  // dangerouslySetContentがtrueの場合、contentをHTMLエスケープせずSet
  if(dangerouslySetContent) {
    return(
      <div
        className="box"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    );
  } else {
    return <div className="box">{ content }</div>
  }
}