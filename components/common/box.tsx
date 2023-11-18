import React from "react";

type BoxProps = {
  content: string,
  dangerouslySetContent?: boolean,
  afterContentNode?: React.ReactNode, // contentの下に配置する要素
}

export function Box(props: BoxProps) {
  const { content, dangerouslySetContent, afterContentNode } = props;
  
  // dangerouslySetContentがtrueの場合、contentをHTMLエスケープせずSet
  let contentNode: React.ReactNode;
  if(dangerouslySetContent) {
    contentNode = (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    );
  } else {
    contentNode = <div>{ content }</div>
  }

  return(
    <div className="box">
      { contentNode }
      { afterContentNode }
    </div>
  )
}

export function GrayFlatBox(props: { content: string }) {
  return (
    <div className="notification">
      { props.content }
    </div>
  )
}