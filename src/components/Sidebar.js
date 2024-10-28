import React from 'react';
import '../styles/sidebar.css'; // Importar los estilos específicos del Sidebar

const role = localStorage.getItem('role');
const Sidebar = ({ onNavigate, openUserModal }) => {
    return (
        <div className="sidebar">
            <button onClick={() => onNavigate('taskManager')}>
                <i className="fa-solid fa-list-check"></i>
            </button>
            {role === "1" && (
                <button onClick={() => onNavigate('insights')}>
                    <i className="fa-solid fa-chart-column"></i>
                </button>
            )}
            <button onClick={openUserModal}>
                <i className="fa-regular fa-user"></i>
            </button>
        </div>
    );
};

export default Sidebar;
