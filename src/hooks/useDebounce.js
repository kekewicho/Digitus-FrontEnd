import { useEffect, useRef } from 'react';


export const useDebounce = (fn, delay) => {
    const timeoutRef = useRef(null);
  
    useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, []);
  
    return (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };