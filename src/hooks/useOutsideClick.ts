import { useEffect, useRef, type RefObject } from "react";

// custom hook that receives:
// 1. ref - HTML element to show/hide
// 2. handler function
// 3. ignoreElement, optional, which ignores clicking on some
// elements, in order to effectively close them inside onClick button functions

export function useOutsideClick(
  handler: () => void,
  ignoreRef?: RefObject<HTMLElement | null>
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (!ref.current || ref.current.contains(e.target as Node)) return;
        if (ignoreRef?.current?.contains(e.target as Node)) return;
        handler();
      }

      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    },
    [ref, handler, ignoreRef]
  );

  return ref;
}
