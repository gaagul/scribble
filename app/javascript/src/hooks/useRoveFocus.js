import { useCallback, useState, useEffect } from "react";

function useRoveFocus(size) {
  const [currentFocus, setCurrentFocus] = useState(0);

  const handleKeyDown = useCallback(
    e => {
      if (e.metaKey && e.key === "/") {
        e.preventDefault();
        setCurrentFocus(0);
      } else if (currentFocus === 0 && e.keyCode === 38) {
        e.preventDefault();
        setCurrentFocus(size);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setCurrentFocus(currentFocus === size ? 1 : currentFocus + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCurrentFocus(currentFocus === 1 ? size : currentFocus - 1);
      }
    },
    [size, currentFocus, setCurrentFocus]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
}

export default useRoveFocus;
