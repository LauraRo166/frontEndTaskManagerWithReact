import React from 'react';
import '../styles/styleModal.css';

const UserModal = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null;

    const userName = localStorage.getItem('userName');
    const role = localStorage.getItem('role') === '2' ? 'Administrador' : 'Usuario';

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload(); // Recarga la página para volver al login
    };

    return (
        <div className="modal user-modal">
            <div className="modal-content user-modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>User Information</h2>
                <p><strong>Name:</strong> {userName}</p>
                <p><strong>Role:</strong> {role}</p>
                <button className="logout-btn" onClick={onLogout}>Log Out</button>
            </div>
        </div>
    );
};

export default UserModal;