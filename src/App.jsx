
import React, { useState } from 'react'
import Header from './comps/Header.jsx';
import Specie from './comps/Specie.jsx';
import { SPECIES, FOOD } from './consts.js';

import './App.css';

function App() {
  return (
    <>
      <Header />
      {SPECIES.slice().sort((a, b) => a.id - b.id).map((specie) => (
        <React.Fragment key={specie.id}>
          {FOOD.slice().sort((a, b) => a.id - b.id).map((food) => (
            <Specie
              key={`${specie.id}-${food.id}`}
              specie_id={specie.id}
              food_id={food.id}

            />


          ))}
        </React.Fragment>
      ))}

    </>
  );
}

export default App;
