"use client";

import useResizeObserver from "@react-hook/resize-observer";
import React, { createContext, useEffect, useRef } from "react";

const useSize = (target: any) => {
  const [size, setSize] = React.useState();

  if (typeof window !== "undefined") {
    React.useLayoutEffect(() => {
      setSize(target?.current?.getBoundingClientRect());
    }, [target]);

    // Where the magic happens
    useResizeObserver(target, (entry: any) => setSize(entry.contentRect));
  }

  return size;
};

export default useSize;

const DivContext = createContext<any>(null);

export const Div = ({
  children,
  onChangeSize,
  className,
  ...rest
}: {
  children: React.ReactNode;
  onChangeSize?: (size: any) => void;
  className?: string;
  [x: string]: any;
}) => {
  const ref = useRef(null);
  const [size, setSize] = React.useState();

  if (typeof window !== "undefined") {
    useResizeObserver(ref, (entry: any) => {
      onChangeSize && onChangeSize(entry.contentRect);
      setSize(entry.contentRect);
    });
  }

  return (
    <DivContext.Provider value={size}>
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    </DivContext.Provider>
  );
};

Div.Context = DivContext;
