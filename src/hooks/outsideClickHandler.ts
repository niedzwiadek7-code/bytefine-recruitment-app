import {RefObject, useEffect} from "react";

const useOutsideClickHandler = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, dependencies);
}

export default useOutsideClickHandler;
