async function addUser(username, password) {
    let response = await fetch('https://localhost:5001/users/signUp', {
        method: 'POST',
        body: JSON.stringify({
            userName: username,
            password: password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json();
}

async function login(username, password) {
    let response = await fetch('https://localhost:5001/users/apiKey', {
        method: 'POST',
        body: JSON.stringify({
            userName: username,
            password: password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json();
}