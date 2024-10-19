const authUrl = 'https://taskmanager-gjdfgpcndme0heaq.brazilsouth-01.azurewebsites.net/auth/login';

export async function login(user, password){
    try{
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: password}), // Revisar
        });
        if (!response.ok) {
            throw new Error('Error login');
        }
        return await response.json();
    }   catch (error) {

    }
}

export async function signUp(user, password){

}