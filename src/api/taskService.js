//const apiUrl = 'https://taskmanager-gjdfgpcndme0heaq.brazilsouth-01.azurewebsites.net/api/tasks';
const apiUrl = 'http://localhost:8081/api/tasks';
const username = localStorage.getItem('username');
export async function fetchTasks() {
    try {
        const response = await fetch(`${apiUrl}/${username}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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

export async function saveTask(task) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ description: task.description, completed: false, difficultyLevel: task.levelDifficult, priority: task.priority, averageDevelopmentTime: task.averageTime }),
        });
        if (!response.ok) {
            throw new Error('Error saving task');
        }
        return await response.json();
    } catch (error) {
        console.error('Error saving task:', error);
    }
}

export async function completeTask(taskId) {
    try {
        const response = await fetch(`${apiUrl}/${taskId}/complete`, {
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

export async function deleteTask(taskId) {
    try {
        const response = await fetch(`${apiUrl}/${taskId}`, {
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
