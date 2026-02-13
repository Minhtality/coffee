"use client";

import React from "react";
import * as Styled from "./index.styled";

const Button = ({ children = "", text, href, ...props }) => {
  const renderedText = text || children;
  const isLink = typeof href !== "undefined";
  const DynamicTag = isLink ? Styled.a : Styled.Button;
  return (
    <DynamicTag href={href} {...props}>
      {renderedText}
    </DynamicTag>
  );
};

export default Button;
