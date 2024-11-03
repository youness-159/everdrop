import { useEffect, useRef } from "react";

function useClose(close) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (!ref.current) return null;
      if (ref.current.contains(e.target)) return null;
      close();
    }

    document.body.addEventListener("click", handleClick, true);
    return () => document.body.removeEventListener("click", handleClick, true);
  }, [close]);

  return ref;
}

export default useClose;
