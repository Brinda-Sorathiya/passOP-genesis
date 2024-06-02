import React from 'react'

const Navbar = () => {

  const openWebsite = () => {
    window.open('https://github.com/Brinda-Sorathiya/passOP-genesis.git', '_blank');
  };

  return (
    <nav className = 'bg-slate-800 text-white'>
      <div className='mycontainer flex justify-between items-center px-4 h-14 py-5'>

        <div className='logo font-bold text-2xl flex'>
          <div><img className='w-10' src='/password.png'/></div>
          <span className='text-teal-300'>&lt;</span>
          Pass
          <span className='text-teal-300'>OP/&gt;</span>
        </div>

        <button className='text-white bg-teal-600 my-5 rounded-full flex justify-between items-center border-2 border-white' onClick={openWebsite}>
          <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
          <span className='font-bold px-2'>Github</span>
        </button>
      </div>
        
    </nav>
  )    
}

export default Navbar
