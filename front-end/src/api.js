// front-end/src/api.js

export async function loginUser(username, password) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data;
}

export async function createUser(username, password) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data;
}

export async function updateUserPassword(password) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });

    const data = await response.json();
    return data;
}

export async function getWhiteboard(wbName) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/whiteboard` + new URLSearchParams({
        name: wbName
    }), {
        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
}

export async function createWhiteboard(wbName) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/whiteboard`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wbName: wbName}),
    });

    const data = await response.json();
    return data;
}

export async function deleteWhiteboard(wbName) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/whiteboard`+ new URLSearchParams({
        name: wbName
    }), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
}