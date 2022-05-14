import React from 'react';
import Note from './Note';

export const Home = () => {
   //before useContext hook was introduces we used Consumer component but after useContext hook we need not to use Consumer Component
    //Now while using useContext hook as an argument we need to pass the Provider component that wraps the all the states in this case we araps the content in noteContext 

  return ( 
    <div>
         <Note/>
    </div>
  )
}

export default Home; 