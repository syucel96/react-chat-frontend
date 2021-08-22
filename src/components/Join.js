import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../style/Join.css';

function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const disabled = () => {return !name || !room};

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=> setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=> setRoom(event.target.value)} /></div>
                <Link onClick={event => disabled() ? event.preventDefault() : null} to={`/chat/?name=${name}&room=${room}`} >
                    <button className="button mt-20" type="submit" disabled={disabled()}>Sign In</button>
                </Link>
            </div> 
        </div>
    )
}

export default Join
