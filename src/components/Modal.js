import React, { useState } from 'react';
import '../styles/styleModal.css';

/**
 * Modal component for adding new tasks, including form fields for description, priority, difficulty level, and average time.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Controls modal visibility.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} props.onSave - Function to handle saving a new task.
 * @returns {JSX.Element|null} The rendered modal component, or null if not open.
 */
const Modal = ({ isOpen, onClose, onSave }) => {
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState(1);
    const [taskLevelDifficult, setTaskLevelDifficult] = useState('LOW');
    const [taskAverageTime, setTaskAverageTime] = useState(0);

    /**
     * Handles form submission, creates a new task, and calls onSave to add it.
     * Clears form fields and closes the modal after saving.
     * @async
     * @param {Event} e - Form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            description: taskDescription,
            priority: taskPriority,
            levelDifficult: taskLevelDifficult,
            averageTime: taskAverageTime,
        };

        console.log('New Task:', newTask);

        await onSave(newTask);

        setTaskDescription('');
        setTaskPriority(1);
        setTaskLevelDifficult('LOW');
        setTaskAverageTime(0);

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Add New Task</h2>
                <form id="task-form" onSubmit={handleSubmit}>
                    <label htmlFor="taskDescription">Description:</label>
                    <input
                        type="text"
                        id="taskDescription"
                        name="taskDescription"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                    />

                    <label htmlFor="taskPriority">Priority:</label>
                    <input
                        type="number"
                        id="taskPriority"
                        name="taskPriority"
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                        required
                    />

                    <label htmlFor="taskLevelDifficult">Level Difficult:</label>
                    <select
                        id="taskLevelDifficult"
                        name="taskLevelDifficult"
                        value={taskLevelDifficult}
                        onChange={(e) => setTaskLevelDifficult(e.target.value)}
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>

                    <label htmlFor="taskAverageTime">Average Development Time:</label>
                    <input
                        type="number"
                        id="taskAverageTime"
                        name="taskAverageTime"
                        value={taskAverageTime}
                        onChange={(e) => setTaskAverageTime(e.target.value)}
                        required
                    />

                    <button type="submit">Save Task</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
