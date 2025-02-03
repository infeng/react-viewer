import { useEffect } from 'react';

export default function useClickOutside (ref, callback: (event: MouseEvent) => void) {
  const handleClickOutside = (event: MouseEvent) => {
    // detect click ref outside
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);
}
