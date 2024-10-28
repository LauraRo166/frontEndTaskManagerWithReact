const authUrl = 'https://taskmanager-gjdfgpcndme0heaq.brazilsouth-01.azurewebsites.net/auth';
//const authUrl = 'https://localhost:8443/auth';

export async function login(user, password) {
    try {
        const response = await fetch(`${authUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username: user, password: password })
        });

        if (response.status === 401) {
            return { error: 'Invalid credentials' };
        }

        if (!response.ok) {
            throw new Error('Unexpected error during login');
        }

        const data = await response.json();

        localStorage.removeItem('userName');
        localStorage.setItem('userName', user);
        localStorage.removeItem('role');
        localStorage.setItem('role', data.roleId);

        return data;
    } catch (error) {
        console.error('Error login:', error);
        return { error: 'Request failed' };
    }
}

export async function signUp(user, password) {
    try {
        const response = await fetch(`${authUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: password, roleId: "1" }),
        });

        if (!response.ok) {
            throw new Error('Error Sign up');
        }

        const data = await response.json();

        localStorage.removeItem('userName');
        localStorage.setItem('userName', user);
        localStorage.removeItem('role');
        localStorage.setItem('role', data.roleId);

        return data;
    } catch (error) {
        console.error('Error Sign up:', error);
        return { error: 'Request failed' };
    }
}
