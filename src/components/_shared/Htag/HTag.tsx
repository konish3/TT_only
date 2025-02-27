import React, { JSX } from "react";
import "./hTag.scss";

interface CustomHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const HTag: React.FC<CustomHeadingProps> = ({
  level,
  children,
  className,
  style,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag style={style} className={Tag}>
      {children}
    </Tag>
  );
};

export default HTag;
