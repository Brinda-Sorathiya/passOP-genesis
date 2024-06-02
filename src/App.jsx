import React from 'react';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';

function App() {
  return (
    
    <div>
      <div className=" m-0 top-0 left-0 h-full w-full min-h-screen flex flex-col bg-gradient-to-b from-teal-100 to-teal-300">

        <Navbar />
        <Manager />
        <Footer />
    </div>
    </div>
  );
}

export default App;
