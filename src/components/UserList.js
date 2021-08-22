import React from 'react';
import onlineIcon from '../icons/onlineIcon.png';

function UserList({ users }) {
    return (
        <div className="userList">
            <div className="userListHeader">
                <div className="userHeaderText">{`${users.length} users chatting:`}</div>
            </div>
            {
                users.map((user,i) => 
                    <div key={i} className="userRow">
                        <p className="userName">{user.name}</p>
                        <img className="userIcon" src={onlineIcon} alt="Online" />
                    </div> )
            }
        </div>
    )
}

export default UserList
