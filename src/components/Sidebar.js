import React, { useState } from 'react';
import '../styles/sidebar.css';

const Sidebar = ({ onNavigate, openUserModal }) => {
    const [role] = useState(localStorage.getItem('role'));

    return (
        <div className="sidebar">
            <button onClick={() => onNavigate('taskManager')}>
                <i className="fa-solid fa-list-check"></i>
            </button>
            {role === '2' && (
                <button onClick={() => onNavigate('insights')}>
                    <i className="fa-solid fa-chart-column"></i>
                </button>
            )}
            <div className="user-button">
                <button onClick={openUserModal}>
                    <i className="fa-regular fa-user"></i>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
