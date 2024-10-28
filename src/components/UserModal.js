import React from 'react';
import '../styles/styleModal.css';

function UserModal({ isOpen, onClose, userName, onLogout }) {
    if (!isOpen) return null;

    const handleChangePassword = () => {
        // Lógica para cambiar la contraseña puede ir aquí
        console.log('Change password clicked');
        alert('Funcionalidad de cambiar contraseña aún no implementada.');
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Perfil de Usuario</h2>
                <p><strong>Usuario:</strong> {userName}</p>
                <button onClick={handleChangePassword}>Cambiar Contraseña</button>
                <button className="btn-logout" onClick={onLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
}

export default UserModal;
