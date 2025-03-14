import { highlight } from "sugar-high";
import React from "react";
export function Code({ children, ...props }: { children: string }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}
