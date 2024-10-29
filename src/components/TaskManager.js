import React, { useState, useEffect } from 'react';
import { generateRandomTasks, deleteAllTasks, fetchTasks, saveTask, completeTask, deleteTask } from '../api/taskService';
import TaskList from './TaskList';
import Modal from './Modal';
import UserModal from './UserModal';
import AuthModal from './AuthModal';
import '../styles/taskManager.css';

/**
 * TaskManager component that provides task management functionality.
 * It allows users to add, complete, and delete tasks while managing modals for user interactions.
 *
 * @param {Function} openUserModal - Function to handle opening user modal.
 */
const TaskManager = ({ openUserModal }) => {
    const [activeModal, setActiveModal] = useState(null);
    const [role] = useState(localStorage.getItem('role'));
    const [tasks, setTasks] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(false);

    /**
     * Opens the specified modal.
     *
     * @param {string} modalType - The type of modal to open.
     */
    const openModal = (modalType) => {
        setActiveModal(modalType);
    };

    /**
     * Closes the currently active modal.
     */
    const closeModal = () => {
        setActiveModal(null);
    };

    /**
     * Fetches all tasks from the API.
     */
    const fetchAllTasks = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
    };

    /**
     * Deletes all tasks and triggers a fetch for updated tasks.
     */
    const handleDeleteAllTasks = async () => {
        await deleteAllTasks();
        setShouldFetch(true); // Marcar shouldFetch como true para refrescar
    };

    /**
     * Adds a new task and triggers a fetch for updated tasks.
     *
     * @param {Object} newTask - The task object to be added.
     */
    const handleAddTask = async (newTask) => {
        await saveTask(newTask);
        setShouldFetch(true); // Marcar shouldFetch como true para refrescar
        setActiveModal(null);
    };

    /**
     * Generates random tasks and triggers a fetch for updated tasks.
     */
    const fetchRandomTasks = async () => {
        await generateRandomTasks();
        setShouldFetch(true); // Marcar shouldFetch como true para refrescar
    };

    /**
     * Marks a task as complete and updates the local tasks state.
     *
     * @param {string} taskId - The ID of the task to be marked as complete.
     */
    const handleCompleteTask = async (taskId) => {
        await completeTask(taskId);
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: true } : task
            )
        );
    };

    /**
     * Deletes a specified task and updates the local tasks state.
     *
     * @param {string} taskId - The ID of the task to be deleted.
     */
    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    useEffect(() => {
        if (shouldFetch) {
            // Retraso de 2 segundos y luego obtener todas las tareas
            const fetchWithDelay = setTimeout(async () => {
                await fetchAllTasks();
                setShouldFetch(false); // Desactivar shouldFetch después de la actualización
            }, 1000);

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

            <TaskList tasks={tasks} onComplete={handleCompleteTask} onDelete={handleDeleteTask} />

            {activeModal === 'auth' && <AuthModal isOpen={true} onClose={closeModal} />}
            {activeModal === 'modal' && <Modal isOpen={true} onClose={closeModal} onSave={handleAddTask} />}
            {activeModal === 'user' && <UserModal isOpen={true} onClose={closeModal} />}
        </div>
    );
};

export default TaskManager;
