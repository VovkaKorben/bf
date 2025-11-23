import React from "react";
import { SPECIES, FOOD } from '../consts.js';
import { ITEMS } from '../items.js';
import { stringifyWithDepthLimit } from '../debug.js';

const Table = ({ food_id, specie_id, npc_index }) => {
    /*
        const RenderRow = ({ cols1, cols2 }) => {
            const cells = [];
            if (cols1 === null) {
                cells.push(<td></td>);
                cells.push(<td></td>);
                cells.push(<td></td>);
            } else {
                cells.push(<td>1</td>);
                cells.push(<td><span className="item_name">{cols1.item_name}</span></td>);
                cells.push(<td>1/{cols1.chance}</td>);
            }
            if (cols2 === null) {
                cells.push(<td></td>);
                cells.push(<td></td>);
                cells.push(<td></td>);
            } else {
                cells.push(<td>1</td>);
                cells.push(<td><span className="item_name">{cols2.item_name}</span></td>);
                cells.push(<td>1/{cols2.chance}</td>);
            }
            return (<tr>{cells}</tr>);
        }
            */

    const RenderRow = ({ cols1, cols2 }) => {

        // Вспомогательная функция для рендеринга одной секции (DROP или SPOIL)
        // Эта функция решает проблему повторяющегося кода.
        const renderSection = (col_data, keyBase) => {
            // Проверка на отсутствие данных
            if (col_data === null) {
                return (
                    <React.Fragment key={keyBase}>
                        <td key={`${keyBase}-1`}></td>
                        <td key={`${keyBase}-2`}></td>
                        <td key={`${keyBase}-3`}></td>
                    </React.Fragment>
                );
            }

            // Рендеринг секции с данными
            return (
                <React.Fragment key={keyBase}>
                    <td key={`${keyBase}-1`}>
                        <img src={`./img/${col_data.icon}.png`} alt={col_data.item_id} width={"16"} height={"16"}/>
                    </td>
                    <td key={`${keyBase}-2`}><span className="item_name">{col_data.item_name}</span></td>
                    <td key={`${keyBase}-3`}>1/{col_data.chance}</td>
                </React.Fragment>
            );
        };

        // Определяем базовые ключи для секций (для уникальности)
        const dropKeyBase = cols1 ? cols1.item_id : 'empty_d';
        const spoilKeyBase = cols2 ? cols2.item_id : 'empty_s';

        return (
            <tr>
                {/* Вызываем функцию для первой секции (DROP) */}
                {renderSection(cols1, dropKeyBase)}

                {/* Вызываем функцию для второй секции (SPOIL) */}
                {renderSection(cols2, spoilKeyBase)}
            </tr>
        );
    };
    const RenderTable = () => {
        const rowsArray = [];
        const specie = SPECIES.filter(item => (item.id === specie_id))[0];
        const monsters = specie[food_id];
        const monster_id = monsters[npc_index];

        // console.log(  JSON.stringify(monster_id));
        const drop = ITEMS.filter(item => (item.npc_id === monster_id && item.type === 0));
        const spoil = ITEMS.filter(item => (item.npc_id === monster_id && item.type === 1));
        const maxLength = Math.max(drop.length, spoil.length);

        rowsArray.push(<tr key="header_row"><th colSpan={3}>Drop</th><th colSpan={3}>Spoil</th></tr>);
        for (let i = 0; i < maxLength; i++) {
            rowsArray.push(

                <RenderRow
                    key={i}
                    cols1={i < drop.length ? drop[i] : null}
                    cols2={i < spoil.length ? spoil[i] : null}
                />



            );
        }

        return (<table className="loot"><tbody>{rowsArray}</tbody></table>);
    }



    return (
        <div className="monster">
            {specie_id},   {food_id}, {npc_index}
            <RenderTable />
        </div>);
};

export default Table;