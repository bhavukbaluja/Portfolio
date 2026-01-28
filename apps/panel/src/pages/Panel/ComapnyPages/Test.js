import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const TestLocation = () => {
  const location = useLocation();

  const [renderKey, setRenderKey] = useState(0);

useEffect(() => {
  const newQuery = new URLSearchParams(location.search).get('query');
  setRenderKey(prev => prev + 1); // Trigger re-render
  console.log('Force re-render, newQuery:', newQuery);
}, [location.search]);

//   useEffect(() => {
//     console.log("Location changed!", location);
//   }, [location]);

  return <div>Testing location changes...</div>;
};

export default TestLocation;
