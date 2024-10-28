import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskManager from './components/TaskManager';
import InsightsPage from './components/InsightsPage';
import AuthModal from './components/AuthModal';
import UserModal from './components/UserModal';
import BannerImg from './resources/undraw_Project_completed.png';
import './styles/app.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [authModalType, setAuthModalType] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
        setCurrentPage('taskManager');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentPage('home');
        setIsUserModalOpen(false);
    };

    const openAuthModal = (type) => {
        setAuthModalType(type);
    };

    const closeAuthModal = () => {
        setAuthModalType(null);
    };

    const openUserModal = () => {
        setIsUserModalOpen(true);
    };

    const closeUserModal = () => {
        setIsUserModalOpen(false);
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
                        onAuthSuccess={handleAuthSuccess}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="app">
            <Sidebar onNavigate={handleNavigation} openUserModal={openUserModal} />
            <div className="content">
                {currentPage === 'taskManager' && <TaskManager />}
                {currentPage === 'insights' && <InsightsPage />}
            </div>
            <UserModal
                isOpen={isUserModalOpen}
                onClose={closeUserModal}
                onLogout={handleLogout}
            />
        </div>
    );
}

export default App;
