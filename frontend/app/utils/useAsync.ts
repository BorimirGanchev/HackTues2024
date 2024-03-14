import { useState, useEffect } from 'react';

export function useAsync<T = any>(asyncFunction: () => Promise<T>, dependencies: unknown[] = []) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);
  const [result, setResult] = useState<T | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setResult(null);
    asyncFunction()
      .then(response => {
        setLoading(false);
        setResult(response);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { loading, error, result };
}
