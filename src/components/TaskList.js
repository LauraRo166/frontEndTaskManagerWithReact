import React from 'react';
import Task from './Task';

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
