import React, { useState, useEffect } from 'react';
import { SPECIES } from '../consts.js';
import { ITEMS } from '../items.js';
/**
 * Компонент-обертка, который лениво рендерит дочерние элементы.
 * Дочерние элементы рендерятся (и их логика выполняется)
 * только тогда, когда курсор находится над триггером.
 * * @param {React.ReactNode} triggerElement - Элемент, который вызывает наведение (например, <img />).
 * @param {React.ReactNode} contentElement - Контент, который нужно показать/рендерить.
 */
const COLUMN_COUNT = 3;
const TableItem = ({ item, chance }) => {
    if (item === null)
    {
        return (<td colSpan={chance ? 3 : 2}></td>);
    }
    // existing item
    const result = [];
    result.push(
        <td
            key="ico-cell"
            className='ico'
        >
            <img src={`./icons/${item.icon}.png`} alt={""} width={"16"} height={"16"} />
        </td>);
    result.push(
        <td
            key="name-cell"
            className='item_name'>
            {item.item_name}
        </td>
    );
    if (chance)
        result.push(<td
            key="chance-cell"
            className='chance'>
            1/{item.chance}
        </td>);
    return (<>{result}</>);

}

const Info = ({ state, mode }) => {



    /*
        = list.filter((item, index) => collect[s].indexOf(item) === index);

    const listSet = new Set(list);
    const intersectionItems = ITEMS.filter(item =>
        listSet.has(item.item_id)
    );
    return intersectionItems.map((item) => (
        <div key={item.item_id}>
            **{item.item_name}** (ID: {item.item_id})
        </div>
        ));
        */

    /*
        const getListItems = (list) => {
            const result = [];
            list.forEach(e => {
            result.push(<div>e</div>)
        });

        return ({result});
     
        };*/
    const getText = (state, mode) => {
        // calculate combined resource list
        // mode 0 - combine all 3 species
        // mode 1 - separate by specie
        // mode 2 - show info about setup
        if (mode === 2)
            return 'INFO TEXT';

        if (mode === 0 || mode === 1) {

            const collect = [[], [], []];
            for (let s = 0; s < 3; s++) {
                const food_key = state[s].food; // текущий индекс корма для вида
                for (let m = 0; m < 14; m++) { // просматриваем выбранные типы
                    if (state[s][food_key][m]) { // если ID выбрано
                        const put_index = mode === 0 ? 0 : s;

                        const mon_id = SPECIES[s][food_key][m];
                        // Добавляем все айди предметов для моба
                        const items = ITEMS.filter(item => (item.npc_id === mon_id));
                        items.forEach((i) => {
                            // fff = collect[put_index];
                            // fff = fff.filter(aaa => (aaa.item_id === i.item_id));
                            const f = collect[put_index].filter(ic => (ic.item_id === i.item_id));
                            if (f.length === 0)
                                collect[put_index].push(i);
                        });

                    }

                }
            }

            const rows = [];
            if (mode === 0) { // combined

                // header
                rows.push(<tr key={`row-header`}>
                    <th colSpan={6}>combined drop/spoil</th>
                </tr>);

                const row_count = Math.ceil(collect[0].length / COLUMN_COUNT);
                // const delta
                for (let r = 0; r < row_count; r++) {
                    const row = [];
                    let item_index = r;
                    for (let c = 0; c < COLUMN_COUNT; c++) {
                        row.push(<TableItem
                            key={item_index}
                            item={item_index < collect[0].length ? collect[0][item_index] : null}
                        />);
                        item_index += row_count;
                    }
                    rows.push(<tr key={`row${r}`}>{row}</tr>)
                }




            } else { // separate
                let max_items = 0
                for (let s = 0; s < 3; s++)
                    max_items = Math.max(max_items, collect[s].length);

                // headers 
                let row = [];
                for (let s = 0; s < 3; s++)
                    row.push(
                        <th key={`cell-header-${s}`} colSpan={2}>
                            <div className='flex_row_center_center'>
                                <img src={`./spec/specie${s}.png`} alt="" height={"40"} />
                                {SPECIES[s].name}
                            </div>
                        </th>
                    );
                rows.push(<tr key={`row-header`}>{row}</tr>);


                for (let r = 0; r < max_items; r++) {
                    row = [];
                    for (let s = 0; s < 3; s++) {

                        row.push(<TableItem
                            key={`td-${s}-${r}`}
                            item={r < collect[s].length ? collect[s][r] : null}
                        />);


                    }
                    rows.push(<tr key={`row-${r}`}>{row}</tr>)
                }

            }
            return (<table className='info'><tbody>{rows}</tbody></table>)
        }
    }
    const [isHovering, setIsHovering] = useState(false);
    const [data, setData] = useState(getText(state, mode));
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);


    useEffect(() => {
        setData(getText(state, mode));
    }, [state]);

    return (
        <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={`./btn/info${mode}.svg`} width={64} height={64} alt="" />

            {isHovering && (<div className='item_list' >{data}</div>)}
            {/* <div className='item_list' >{data}</div> */}
        </div>
    );
};

export { TableItem };
export default Info;
