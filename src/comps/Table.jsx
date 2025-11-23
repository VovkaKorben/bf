import React from "react";
import { ITEMS } from '../items.js';
import { stringifyWithDepthLimit } from '../debug.js';

const Table = ({ npc_id }) => {

    const drop = ITEMS.filter(item => (item.npc_id === npc_id && item.type === 0));
    const spoil = ITEMS.filter(item => (item.npc_id === npc_id && item.type === 1));
    return (<div className="">
        {npc_id}<hr />
        {/* {<div className="stringifyWithDepthLimit">{stringifyWithDepthLimit(drop, 1)}</div>} */}
        {drop.length} /  {spoil.length}
    </div>);
};

export default Table;