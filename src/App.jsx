
import React, { useState, useEffect } from 'react'
import Header from './comps/Header.jsx';
import Specie from './comps/Specie.jsx';
import { SPECIES, FOOD } from './consts.js';

import './css/App.css';
import './css/flex.css';

const isObj = (variable) => {
  return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
}
const hasKey = (o, k) => {
  return Object.prototype.hasOwnProperty.call(o, k)
}

function App() {
  const LS_KEY = 'state';
  // const [msg, setMsg] = useState(false);


  // load and parse initial values
  const [state, setState] = useState(() => {

    let tmp = localStorage.getItem(LS_KEY);

    try {
      tmp = JSON.parse(tmp);
    } catch (e) {
    }

    // check main array
    if (!isObj(tmp))
      tmp = {};

    // check each specie
    for (let s = 0; s < 3; s++) {
      if (!hasKey(tmp, s))
        tmp[s] = {}

      // check food mode
      if (!(hasKey(tmp[s], 'food') && Number.isInteger(tmp[s].food)))
        tmp[s].food = 0;

      // check state
      for (let f = 0; f < 2; f++) {
        if (!(hasKey(tmp[s], f) && Array.isArray(tmp[s][f]) && tmp[s][f].length === 13 && tmp[s][f].every(Number.isInteger))) {
          tmp[s][f] = new Array(13).fill(0);
          tmp[s][f][0] = 1;
        }
      }
    }
    return tmp;
  })



  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    // setMsg(`states: ${JSON.stringify(state)} `)

  }, [state]);

  const handleClick = (specie_id, food_id, new_state) => {
    setState(prevState => {
      const specieObject = prevState[specie_id];
      const newSpecieObject = { ...specieObject };
      newSpecieObject[food_id] = new_state;
      newSpecieObject.food = food_id;
      return {
        ...prevState,
        [specie_id]: newSpecieObject
      };
    });
  };
  const headerClick = (specie_id, food_id) => {
    setState(prevState => {
      const specieObject = prevState[specie_id];
      const newSpecieObject = { ...specieObject };
      newSpecieObject.food = food_id;
      return {
        ...prevState,
        [specie_id]: newSpecieObject
      };
    });
  };

  return (
    <>
      <Header
        state={state}

      />
      <div className='species_list'>


        {SPECIES.slice().sort((a, b) => a.id - b.id).map((specie) => (
          <React.Fragment key={specie.id}>
            {FOOD.slice().sort((a, b) => a.id - b.id).map((food) => (
              <Specie
                key={`${food.id} - ${specie.id}`}
                specie_id={specie.id}
                food_id={food.id}
                state={state[specie.id][food.id]}
                sel={state[specie.id].food === food.id}
                click_handler={handleClick}
                header_click_handler={headerClick}
              />


            ))}
          </React.Fragment>
        ))}


      </div>
    </>
  );
}

export default App;
