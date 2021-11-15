import React from 'react';
import News from './components/News';
import './index.css';

const App = function () {
  return (
    <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <News />
    </div>
  );
};

export default App;
