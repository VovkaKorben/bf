import React from "react";
import { SPECIES, FOOD } from '../consts.js';
import Table from './Table.jsx';
import { stringifyWithDepthLimit } from '../debug.js';


const Specie = ({ specie_id, food_id }) => {
    const specie_data = SPECIES.filter(item => item.id === specie_id)[0];
    const food_data = FOOD.filter(item => item.id === food_id)[0];

    const indices = Array.from({ length: 11 }, (_, i) => i);

    return (<div className="specie">
        <div className="specie_header">{specie_data.name}: {food_data.name} </div>
        <div className="container">
            {indices.map((n) => (
                <div key={`${specie_id}-${food_id}-${n}`} className={`el_${n}`}>

                    <Table
                        specie_id={specie_id}
                        npc_index={n}
                        food_id={food_id}

                    />
                </div>
            ))}

        </div>
        {/* <div className="stringifyWithDepthLimit">{stringifyWithDepthLimit(specie_data[food_id], 0)}</div> */}

    </div>);
};

export default Specie;