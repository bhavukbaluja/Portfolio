import { useEffect, useState } from "react";
import { getNextZIndex } from "./ZIndexManager";

export function useZIndexStack(enabled = true) {
  const [zIndex, setZIndex] = useState(null);

  useEffect(() => {
    if (enabled) {
      const next = getNextZIndex();
      setZIndex(next);
    }
  }, [enabled]);

  return zIndex;
}
