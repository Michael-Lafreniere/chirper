import { useState, useRef, useEffect } from 'react';

export const useFetch = url => {
  const isCurrent = useRef(true);
  const [data, setData] = useState({ data: null, loading: true });

  useEffect(() => {
    setData(data => ({ data: data, loading: true }));
    fetch(url)
      .then(result => result.json())
      .then(data => {
        if (isCurrent.current) {
          setData({ data: data, loading: false });
        }
      });
  }, [url, setData]);

  // Component is unmounting:
  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  });
};
