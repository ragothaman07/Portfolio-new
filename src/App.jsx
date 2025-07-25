// App.jsx
import React from 'react';
import Hero from './Hero/Hero';
import About from './About/About';

const App = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-10">
        <Hero />
      </div>
      <div className="relative z-20" style={{ marginTop: '100vh' }}>
        <About />
      </div>
    </>
  );
};

export default App;
