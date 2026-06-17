import { useEffect, useRef, useCallback } from 'react';

export function useWorker<T, R>(
  WorkerConstructor: new () => Worker,
  onMessage: (data: R) => void,
  onError?: (error: ErrorEvent) => void
) {
  const workerRef = useRef<Worker | null>(null);

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new WorkerConstructor();
      workerRef.current.onmessage = (e: MessageEvent<R>) => onMessage(e.data);
      if (onError) workerRef.current.onerror = onError;
    }
    return workerRef.current;
  }, [WorkerConstructor, onMessage, onError]);

  const postMessage = useCallback((data: T) => {
    const worker = getWorker();
    worker.postMessage(data);
  }, [getWorker]);

  const terminate = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      terminate();
    };
  }, [terminate]);

  return { postMessage, terminate };
}
