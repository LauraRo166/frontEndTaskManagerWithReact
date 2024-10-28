import React, { useState, useEffect } from 'react';
import { generateRandomTasks, deleteAllTasks } from '../api/taskService';
import TaskList from './TaskList';
import Modal from './Modal';
import UserModal from './UserModal';
import AuthModal from './AuthModal';
import '../styles/taskManager.css';

const TaskManager = ({ openUserModal }) => {
    const [activeModal, setActiveModal] = useState(null);
    const [role] = useState(localStorage.getItem('role'));
    const [tasks, setTasks] = useState([]);

    const openModal = (modalType) => {
        setActiveModal(modalType);
        console.log(modalType);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const fetchRandomTasks = async () => {
        const tasks = await generateRandomTasks();
        setTasks(tasks);
    };

    const handleDeleteAllTasks  = async () => {
        await deleteAllTasks();
        setTasks([]);
    };

    return (
        <div className="main-content">
            <h1>Task Manager</h1>
            <div className="button-content">
                {role === '1' && (
                    <button onClick={() => openModal('modal')} className="btn-add-task">Add Task</button>
                )}
                {role === '2' && (
                    <button onClick={fetchRandomTasks} className="automatic-button">Realise Automatic Tasks</button>
                )}
                <button onClick={handleDeleteAllTasks} className="del-automatic-button">Delete All Tasks</button>
            </div>

            <TaskList tasks={tasks} />

            {activeModal === 'auth' && <AuthModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'modal' && <Modal isOpen={true} onClose={closeModal} />}
            {activeModal === 'user' && <UserModal isOpen={true} onClose={closeModal} />}
        </div>
    );
};

export default TaskManager;
