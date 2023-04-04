import { useEffect } from 'react';

type Ref = React.RefObject<HTMLElement>;

const useClickOutside = (ref: Ref, action: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, action]);
};

export default useClickOutside;
