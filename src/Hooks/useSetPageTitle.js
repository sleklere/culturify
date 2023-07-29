import { useEffect, useRef } from "react";

function useSetPageTitle(title) {
  // const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useSetPageTitle;
