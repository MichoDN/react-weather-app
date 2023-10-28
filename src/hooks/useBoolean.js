import { useState } from "react";

function useBoolean(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggleState = () => setState(prevState => !prevState);
  
  return { state, toggleState };
}

export default useBoolean