import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>Hortlaklı Köy Oyunu Yükleniyor...</h1>;
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
