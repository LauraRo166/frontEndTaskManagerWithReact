import React, { useState } from 'react';
import '../styles/sidebar.css';

/**
 * Sidebar component providing navigation buttons for different sections and a user button.
 * Visibility of certain buttons is controlled by the user's role.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.onNavigate - Function to handle navigation based on button clicks.
 * @param {Function} props.openUserModal - Function to open the user profile or settings modal.
 * @returns {JSX.Element} The rendered sidebar component.
 */
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
