const authUrl = 'https://taskmanager-gjdfgpcndme0heaq.brazilsouth-01.azurewebsites.net/auth';
// const authUrl = 'http://localhost:8081/auth';

export async function login(user, password){
    try{
        const response = await fetch(`${authUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: password}), // Revisar
        });
        if (!response.ok) {
            throw new Error('Error login');
        }
        return await response.json();
    }   catch (error) {
            console.error('Error login:', error);
            return [];
    }
}

export async function signUp(user, password){
    try{
        const response = await fetch(`${authUrl}/signUp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: password}), // Revisar
        });
        if (!response.ok) {
            throw new Error('Error Sign up');
        }
        return await response.json();
    }   catch (error) {
        console.error('Error Sign up:', error);
        return [];
    }
}