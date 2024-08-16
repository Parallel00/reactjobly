import { useState, useEffect } from "react";


function useLocalStorage(key, valInit = null) {
  const initialValue = localStorage.getItem(key) || valInit;

  const [item, setItem] = useState(initialValue);

  useEffect(function locStorKey() {
    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
