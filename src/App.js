import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskManager from './components/TaskManager';
import InsightsPage from './components/InsightsPage';
import AuthModal from './components/AuthModal';
import BannerImg from './resources/undraw_Project_completed.png';
import './styles/app.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home'); // Pantalla inicial
    const [authModalType, setAuthModalType] = useState(null); // Tipo de modal (login o signup)
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    const handleAuthSuccess = () => {
        setIsAuthenticated(true); // Cuando el login sea exitoso, cambia el estado
        setCurrentPage('taskManager'); // Redirige a la pantalla de tareas
    };

    const openAuthModal = (type) => {
        setAuthModalType(type); // Define si es login o sign up
    };

    const closeAuthModal = () => {
        setAuthModalType(null); // Cierra el modal
    };

    if (!isAuthenticated && currentPage === 'home') {
        return (
            <div className="home">
                <h1>Task Manager</h1>
                <div className="content">
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
        </div>
    );
}

export default App;