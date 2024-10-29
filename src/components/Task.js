import React from 'react';

/**
 * Task component representing an individual task with options to mark as complete or delete.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.task - Task object containing task details.
 * @param {Function} props.onComplete - Function to handle marking the task as complete.
 * @param {Function} props.onDelete - Function to handle deleting the task.
 * @returns {JSX.Element} The rendered task component.
 */
const Task = ({ task, onComplete, onDelete }) => {
    const { id, description, completed, priority, difficultyLevel, averageDevelopmentTime } = task;

    /**
     * Translates difficulty level from English to Spanish.
     *
     * @param {string} difficulty - Difficulty level in English (LOW, MEDIUM, HIGH).
     * @returns {string} Translated difficulty level.
     */
    const translateDifficulty = (difficulty) => {
        const difficultyMap = { LOW: 'Bajo', MEDIUM: 'Medio', HIGH: 'Alto' };
        return difficultyMap[difficulty] || difficulty;
    };

    return (
        <div className={`task ${completed ? 'completed' : ''}`}>
            <p><strong>Nombre:</strong> {description}</p>
            <p><strong>Dificultad:</strong> {translateDifficulty(difficultyLevel)}</p>
            <p><strong>Prioridad:</strong> {priority}</p>
            <p><strong>Tiempo Promedio:</strong> {averageDevelopmentTime} horas</p>
            <button className={completed ? 'completed-btn' : 'complete-btn'} onClick={() => onComplete(id)} disabled={completed}>
                {completed ? 'Task Complete' : 'Mark as Complete'}
            </button>
            <button className="delete-btn" onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default Task;
