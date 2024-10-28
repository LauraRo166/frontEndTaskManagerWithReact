import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskManager from './components/TaskManager';
import InsightsPage from './components/InsightsPage';
import AuthModal from './components/AuthModal';
import UserModal from './components/UserModal';
import BannerImg from './resources/undraw_Project_completed.png';
import './styles/app.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home'); // Pantalla inicial
    const [authModalType, setAuthModalType] = useState(null); // Tipo de modal (login o signup)
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [userName, setUserName] = useState(''); // Nombre de usuario
    const [isUserModalOpen, setIsUserModalOpen] = useState(false); // Estado del User Modal

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    const handleAuthSuccess = () => {
        setIsAuthenticated(true); // Cuando el login sea exitoso, cambia el estado
        setCurrentPage('taskManager'); // Redirige a la pantalla de tareas
    };

    const handleLogout = () => {
        setIsAuthenticated(false); // Restablece el estado de autenticación
        setUserName(''); // Limpia el nombre de usuario
        setCurrentPage('home'); // Redirige al inicio
        setIsUserModalOpen(false); // Cierra el modal de usuario
    };

    const openAuthModal = (type) => {
        setAuthModalType(type); // Define si es login o sign up
    };

    const closeAuthModal = () => {
        setAuthModalType(null); // Cierra el modal
    };

    const closeUserModal = () => {
        setIsUserModalOpen(false); // Cierra el modal de usuario
    };

    if (!isAuthenticated && currentPage === 'home') {
        return (
            <div className="home">
                <h1>Task Manager</h1>
                <div className="first-content">
                    <div className="left-content">
                        <p>Un sistema para ayudarte a organizar, priorizar y hacer seguimiento de todas tus tareas diarias de manera simple y eficiente.</p>
                        <div className="auth-buttons">
                            <button className="btn-log" onClick={() => openAuthModal('login')}>Log in</button>
                            <button className="btn-sign" onClick={() => openAuthModal('signup')}>Sign up</button>
                        </div>
                    </div>
                    <div className="right-content">
                        <img src={BannerImg} alt="Next Tasks"/>
                    </div>
                </div>
                {authModalType && (
                    <AuthModal
                        isOpen={authModalType !== null}
                        onClose={closeAuthModal}
                        type={authModalType}
                        onAuthSuccess={handleAuthSuccess} // Pasa la función al modal
                    />
                )}
            </div>
        );
    }

    return (
        <div className="app">
            <Sidebar onNavigate={handleNavigation}/>
            <div className="content">
                {currentPage === 'taskManager' && <TaskManager/>}
                {currentPage === 'insights' && <InsightsPage/>}
            </div>
            <UserModal
                isOpen={isUserModalOpen}
                onClose={closeUserModal}
                userName={userName}
                onLogout={handleLogout}
            />
        </div>
    );
}

export default App;