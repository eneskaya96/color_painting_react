import { useErrorBoundary } from 'react-error-boundary';

export function DefaultErrorState({ error }: { error: any }) {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
}
