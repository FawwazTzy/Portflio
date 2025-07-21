import React from 'react'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'

const MainPage = () => {
  return (
    <div className='flex flex-col w-screen h-screen'>
      <div className='flex-1'>
        <Page1 />
      </div>
      <div className='flex-1'>
        <Page2 />
      </div>
      <div className='flex-1'>
        <Page3 />
      </div>
      <div className='flex-1'>
        <Page4 />
      </div>
    </div>
  );
};

export default MainPage;
