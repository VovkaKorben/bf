import React, { useState, useEffect } from 'react'
import ReadOnlyClipboardInput from './Edit.jsx';
import { SPECIES, FOOD, BEHAVOIR } from '../consts.js';

const Header = ({ state }) => {

    const [gold, setGold] = useState('1');
    const [crystal, setCrystal] = useState('2');
    const [assister, setAssister] = useState('3');

    useEffect(() => {
        // recalc values
        const collect = [[], [], []];

        // collect to arrays
        for (let s = 0; s < 3; s++) {
            const food_key = state[s].food; // текущий индекс корма для вида

            for (let m = 0; m < 14; m++) { // просматриваем выбранные типы


                if (state[s][food_key][m]) { // если ID выбрано - добавляем все предыдущие из "поведения"
                    const current_branch = BEHAVOIR[m];
                    for (let a = 0; a < current_branch.length; a++) {
                        const sub_key = current_branch[a];
                        const mon_id = SPECIES[s][food_key][sub_key];
                        collect[food_key].push(mon_id);
                    }
                }

            }
        }
        // make assister array
        collect[2] = collect[1].concat(collect[0]);



        for (let s = 0; s < 3; s++) {
            // remove duplicates + sort
            collect[s] = collect[s].filter((item, index) => collect[s].indexOf(item) === index).sort();
            collect[s] = collect[s].join("; ");
            if (collect[s].length)
                collect[s] += ';'
        }


        setGold(collect[0]);
        setCrystal(collect[1]);
        setAssister(collect[2]);
    }, [state]);



    return (<div className="header">
        {/* {JSON.stringify(state)} */}

        <ReadOnlyClipboardInput caption="Gold spice" value={gold} />
        <ReadOnlyClipboardInput caption="Crystal spice" value={crystal} />
        <ReadOnlyClipboardInput caption="Assister" value={assister} />
    </div>);
};

export default Header;