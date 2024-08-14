import { DependencyList, useEffect, useRef } from "react";

// only for Strict Mode or Next.js
const executeCount = process.env.NODE_ENV === "development" ? 2 : 1;

export const useDidUpdateEffect = (callback: () => void, deps?: DependencyList): void => {
  const didMountRef = useRef(0);

  useEffect(() => {
    if (didMountRef.current === executeCount) {
      return callback();
    } else {
      didMountRef.current++;
    }
  }, deps);
};
