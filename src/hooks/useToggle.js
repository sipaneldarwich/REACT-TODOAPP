import { useState } from "react";

function useToggle(initValue) {
  const [visible, setVisible] = useState(initValue);
  function toggle() {
    setVisible(prevVisible => !prevVisible);
  }

  return [visible, toggle];
}

export default useToggle;
