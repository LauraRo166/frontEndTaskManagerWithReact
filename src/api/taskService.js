//const apiUrl = 'https://taskmanager-gjdfgpcndme0heaq.brazilsouth-01.azurewebsites.net/api/tasks';
//const apiUrl = 'https://localhost:8443/api/tasks';
const apiUrl = 'http://localhost:8081/api/tasks';

/**
 * Fetches tasks for the logged-in user from the API.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of tasks.
 */
export async function fetchTasks() {
    try {
        const userName = localStorage.getItem('userName');
        const response = await fetch(`${apiUrl}/${userName}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Error fetching tasks');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}

/**
 * Saves a new task for the logged-in user to the API.
 * 
 * @param {Object} task - The task to be saved.
 * @returns {Promise<Object>} A promise that resolves to the saved task object.
 */
export async function saveTask(task) {
    try {
        const userName = localStorage.getItem('userName');
        const response = await fetch(`${apiUrl}/${userName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                description: task.description,
                completed: false,
                difficultyLevel: task.levelDifficult,
                priority: task.priority,
                averageDevelopmentTime: task.averageTime
            }),
        });

        if (!response.ok) {
            throw new Error('Error saving task');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving task:', error);
    }
}

/**
 * Marks a task as complete for the logged-in user in the API.
 * 
 * @param {string} taskId - The ID of the task to be completed.
 * @returns {Promise<Object>} A promise that resolves to the updated task object.
 */
export async function completeTask(taskId) {
    try {
        const user = localStorage.getItem('userName');
        const response = await fetch(`${apiUrl}/${user}/${taskId}/complete`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ completed: true }),
        });

        if (!response.ok) {
            throw new Error('Error completing task');
        }

        return await response.json();
    } catch (error) {
        console.error('Error completing task:', error);
    }
}

/**
 * Deletes a specific task for the logged-in user from the API.
 * 
 * @param {string} taskId - The ID of the task to be deleted.
 */
export async function deleteTask(taskId) {
    try {
        const user = localStorage.getItem('userName');
        const response = await fetch(`${apiUrl}/${user}/${taskId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error deleting task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

/**
 * Generates random tasks for the logged-in user using the API.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of generated tasks.
 */
export async function generateRandomTasks() {
    try {
        const user = localStorage.getItem('userName');
        const response = await fetch(`${apiUrl}/${user}/task/randomTasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Error generating random tasks');
        }

        return await response.json();
    } catch (error) {
        console.error('Error generating random tasks:', error);
    }
}

/**
 * Deletes all tasks for the logged-in user from the API.
 */
export async function deleteAllTasks() {
    try {
        const user = localStorage.getItem('userName');
        const response = await fetch(`${apiUrl}/${user}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Error deleting all tasks');
        }
    } catch (error) {
        console.error('Error deleting all tasks:', error);
    }
}
