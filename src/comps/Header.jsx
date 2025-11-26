import React, { useState } from 'react'
import ReadOnlyClipboardInput from './Edit.jsx';


const Header = ({ state }) => {

    const [gold, setGold] = useState('1');
    const [crystal, setCrystal] = useState('2');
    const [assister, setAssister] = useState('3');
    
    // recalc values

    return (<div className="header">
        {/* {JSON.stringify(state)} */}

        <ReadOnlyClipboardInput caption="Gold spice" value={gold} />
        <ReadOnlyClipboardInput caption="Crystal spice" value={crystal} />
        <ReadOnlyClipboardInput caption="Assister" value={assister} />
    </div>);
};

export default Header;