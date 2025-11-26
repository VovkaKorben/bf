import React, { useState, useEffect, useCallback } from 'react'
import { SPECIES, FOOD } from '../consts.js';
import Table from './Table.jsx';
import { stringifyWithDepthLimit } from '../debug.js';


const Specie = ({ specie_id, food_id, state, sel, click_handler, header_click_handler }) => {


    const handleClick = (id) => {
        // mutate state
        let temp_state;
        if (id === 0) {
            temp_state = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        else {
            temp_state = [...state];
            const r = (Math.floor((id - 1) / 3)) * 3 + 1;
            for (let x = 0; x < 3; x++)
                temp_state[r + x] = 0;
            temp_state[id] = 1;
            temp_state[0] = 0; // reset base monster
        }

        if (click_handler) {
            click_handler(specie_id, food_id, temp_state);
        }
    };

    const onHeaderClick = () => {
        if (header_click_handler) {
            header_click_handler(specie_id, food_id);
        }
    };



    const specie_data = SPECIES.filter(item => item.id === specie_id)[0];
    const food_data = FOOD.filter(item => item.id === food_id)[0];
    const indices = Array.from({ length: 13 }, (_, i) => i);
    return (<div className={`specie flex_col_center_top sel-${sel ? '1' : '0'}`}>
        <div
            className="specie_header flex_row_center_center"
            onClick={onHeaderClick}
        >
            {/* {sel ? '1' : '0'} */}
            <img src={`./spec/specie${specie_id}.png`} alt="" height={"100%"} />
            {specie_data.name}: {food_data.name}
            <img src={`./spec/food${food_id}.png`} alt="" />
        </div>
        <div className="specie_container">
            {indices.map((n) => (
                <div
                    onClick={() => handleClick(n)}
                    key={`${specie_id}-${food_id}-${n}`}
                    className={`el_${n} sel-${state[n] ? '1' : '0'} `}
                >

                    idx:{n} spec: {specie_id} food: {food_id}<br />

                    <span className='grayed'>
                        ID: {SPECIES[specie_id][food_id][n]}</span>
                    <Table specie_id={specie_id} npc_index={n} food_id={food_id} />
                </div>
            ))}
        </div>
    </div >);
};

export default Specie;