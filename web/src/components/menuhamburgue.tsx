import React, { useState } from 'react';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button className="bg-none border-none size-20 cursor-pointer" onClick={toggleMenu}>
        ☰
      </button>
    </div>
  );
};

export default Menu;