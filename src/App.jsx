
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
/*
структура 
states = {
0:
  {
    food:0,
    0:[0,1,0,1.....],
    1:[0,1,0,1.....]
  }
1,2:.....


*/
function App() {
  const LS_KEY = 'state';
  const [msg, setMsg] = useState(false);

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

      // check food
      for (let f = 0; f < 2; f++) {
        if (!(hasKey(tmp[s], f) && Array.isArray(tmp[s][f]) && tmp[s][f].length === 13 && tmp[s][f].every(Number.isInteger)))
          tmp[s][f] = new Array(13).fill(0);
      }
    }
    return tmp;
  })



  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    setMsg(`states: ${JSON.stringify(state)} `)
  }, [state]);

  const handleClick = (specie_id, food_id, new_state) => {
    setState(prevState => {
      const specieObject = prevState[specie_id];
      const newSpecieObject = { ...specieObject };
      newSpecieObject[food_id] = new_state;
      return {
        ...prevState,
        [specie_id]: newSpecieObject
      };
    });
    // setState(prev => ({ ...prev, [specie_id][food_id]: value }))




  };

  /*setStates(prevStates => {
      
      const sub = [...prevStates[specie_id]];
      sub[food_id] = new_state;
      const new_states = [...prevStates];
      new_states[specie_id] = sub;
      return new_states;
    });
    
    */
  /*
    useEffect(() => {
      localStorage.setItem(localstorage_key, JSON.stringify(selected_food));
    }, [selected_food, localstorage_key]);
   
    const handleClick = (specie_id, food_id, state) => {
      // temp_state = [...selected_food];
      setMsg(`App handleClick ${specie_id} ${food_id} ${JSON.stringify(state)}`);
      console.log(`App handleClick ${specie_id} ${food_id} ${JSON.stringify(state)}`);
      temp_state = [...selected_food];
      temp_state[specie_id] = food_id;
      setSelectedFood(temp_state);
    };
    */
  /* const load_handler = (specie_id, food_id, state) => {
     console.log(`App load_handler ${specie_id} ${food_id} ${JSON.stringify(state)}`);
   
     setStates(prevStates => {
       const sub = [...prevStates[specie_id]];
       sub[food_id] = state;
       const new_states = [...prevStates];
       new_states[specie_id] = sub;
       return new_states;
     });
   
   };*/
  /*
  const headerClick = (specie_id, food_id) => {
    // temp_state = [...selected_food];
    setMsg(`App handleClick ${specie_id} ${food_id} ${JSON.stringify(state)}`);
    console.log(`App handleClick ${specie_id} ${food_id} ${JSON.stringify(state)}`);
    temp_state = [...selected_food];
    temp_state[specie_id] = food_id;
    setSelectedFood(temp_state);
  };
  */
  return (
    <>
      <Header message={msg} />
      <div className='species_list'>


        {SPECIES.slice().sort((a, b) => a.id - b.id).map((specie) => (
          <React.Fragment key={specie.id}>
            {FOOD.slice().sort((a, b) => a.id - b.id).map((food) => (
              <Specie
                key={`${food.id} - ${specie.id}`}
                specie_id={specie.id}
                food_id={food.id}
                state={state[specie.id][food.id]}
                click_handler={handleClick}
              />


            ))}
          </React.Fragment>
        ))}


      </div>
    </>
  );
}

export default App;
/*



 <>
      <Header message={msg} />
      <div className='species_list'>
       
      </div>
    </>







     <React.Fragment key={0}>

          <Specie
            key={`sfgdhe`}
            specie_id={0}
            food_id={0}
            state={states[0][0]}
            click_handler={handleClick}


          />
        </React.Fragment>
        <React.Fragment key={1}>

          <Specie
            key={`sfgd2he`}
            specie_id={0}
            food_id={1}
            state={states[0][1]}
            click_handler={handleClick}

          />
        </React.Fragment>


    */