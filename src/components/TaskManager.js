// TaskManager.js
import React, { useState, useEffect } from 'react';
import { generateRandomTasks, deleteAllTasks, fetchTasks, saveTask } from '../api/taskService';
import TaskList from './TaskList';
import Modal from './Modal';
import UserModal from './UserModal';
import AuthModal from './AuthModal';
import '../styles/taskManager.css';

const TaskManager = ({ openUserModal }) => {
    const [activeModal, setActiveModal] = useState(null);
    const [role] = useState(localStorage.getItem('role'));
    const [tasks, setTasks] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(false);

    const openModal = (modalType) => {
        setActiveModal(modalType);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const fetchAllTasks = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
    };

    const handleDeleteAllTasks = async () => {
        await deleteAllTasks();
        setShouldFetch(true); // Marcar shouldFetch como true para refrescar
    };

    const handleAddTask = async (newTask) => {
        await saveTask(newTask);
        setShouldFetch(true); // Marcar shouldFetch como true para refrescar
        setActiveModal(null);
    };

    const fetchRandomTasks = async () => {
        await generateRandomTasks();
        setShouldFetch(true); // Marcar shouldFetch como true para refrescar
    };

    useEffect(() => {
        if (shouldFetch) {
            // Retraso de 2 segundos y luego obtener todas las tareas
            const fetchWithDelay = setTimeout(async () => {
                await fetchAllTasks();
                setShouldFetch(false); // Desactivar shouldFetch después de la actualización
            }, 2000);

            return () => clearTimeout(fetchWithDelay);
        }
    }, [shouldFetch]);

    useEffect(() => {
        fetchAllTasks(); // Cargar tareas inicialmente
    }, []);

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
            {activeModal === 'modal' && <Modal isOpen={true} onClose={closeModal} onSave={handleAddTask} />}
            {activeModal === 'user' && <UserModal isOpen={true} onClose={closeModal} />}
        </div>
    );
};

export default TaskManager;
