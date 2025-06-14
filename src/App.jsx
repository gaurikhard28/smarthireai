import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router'; // your centralized route definitions

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
