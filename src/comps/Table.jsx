import React from "react";
import { SPECIES, FOOD } from '../consts.js';
import { ITEMS } from '../items.js';
import { TableItem } from './Info.jsx';
import { stringifyWithDepthLimit } from '../debug.js';

const Table = ({ food_id, specie_id, npc_index }) => {

    /*const RenderRow = ({ cols1, cols2 }) => {
        const renderSection = (col_data, keyBase) => {
            if (col_data === null) {
                return (
                    <React.Fragment key={keyBase}>
                        <td key={`${keyBase}-1`}></td>
                        <td key={`${keyBase}-2`}></td>
                        <td key={`${keyBase}-3`}></td>
                    </React.Fragment>
                );
            }
            return (
                <React.Fragment key={keyBase}>
                    <td key={`${keyBase}-1`}>
                        <img src={`./img/${col_data.icon}.png`} alt={col_data.item_id} width={"16"} height={"16"} />
                    </td>
                    <td key={`${keyBase}-2`}>
                        <span className="item_name">{col_data.item_name}</span>
                        {col_data.min !== 1 && col_data.max !== 1 && ` (${col_data.min}-${col_data.max})`}
                    </td>
                    <td key={`${keyBase}-3`}>1/{col_data.chance}</td>
                </React.Fragment>
            );
        };

        // Определяем базовые ключи для секций (для уникальности)
        const dropKeyBase = cols1 ? cols1.item_id : 'empty_d';
        const spoilKeyBase = cols2 ? cols2.item_id : 'empty_s';

        return (
            <tr>
                {renderSection(cols1, dropKeyBase)}
                {renderSection(cols2, spoilKeyBase)}
            </tr>
        );
    };*/
    const RenderTable = () => {
        const rows = [];
        const specie = SPECIES.filter(item => (item.id === specie_id))[0];
        const monsters = specie[food_id];
        const monster_id = monsters[npc_index];

        // console.log(  JSON.stringify(monster_id));
        const drop = ITEMS.filter(item => (item.npc_id === monster_id && item.type === 0));
        const spoil = ITEMS.filter(item => (item.npc_id === monster_id && item.type === 1));
        const maxLength = Math.max(drop.length, spoil.length);

        rows.push(<tr key="header_row"><th colSpan={3}>Drop</th><th colSpan={3}>Spoil</th></tr>);

        for (let i = 0; i < maxLength; i++) {
            const item_drop = <TableItem
                key={`0-${i}`}
                item={i < drop.length ? drop[i] : null}
                chance={true}
            />;
            const item_spoil = <TableItem
                key={`1-${i}`}
                item={i < spoil.length ? spoil[i] : null}
                chance={true}
            />;
            rows.push(<tr key={`row-${i}`}>{item_drop}{item_spoil}</tr>);


            /*             <RenderRow
                                key={i}
                                cols1={i < drop.length ? drop[i] : null}
                                cols2={i < spoil.length ? spoil[i] : null}
                            />
            */
        }

        return (<table className="loot"><tbody>{rows}</tbody></table>);
    }



    return (
        <>
            {/* <div className="monster"> */}
            {/* {specie_id},   {food_id}, {npc_index} */}
            <RenderTable />
            {/* </div> */}
        </>
    );
};

export default Table;