import React, { useEffect, useState } from 'react';
import App from './_app';

export default function ClientOnlyWrapper() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Don't render App until client-side mount

  return <App />;
}
