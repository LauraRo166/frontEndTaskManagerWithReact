import React from 'react';
import Task from './Task';

/**
 * TaskList component that renders a list of Task components.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.tasks - Array of task objects to display.
 * @param {Function} props.onComplete - Function to mark a task as complete.
 * @param {Function} props.onDelete - Function to delete a task.
 * @returns {JSX.Element} The rendered task list component.
 */
const TaskList = ({ tasks, onComplete, onDelete }) => {
    return (
        <div id="task-list">
            {tasks.map(task => (
                <Task key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default TaskList;
