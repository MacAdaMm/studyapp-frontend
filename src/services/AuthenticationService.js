const loginEndpoint = "https://localhost:44323/login";

async function fetchWithCredentials(url, method) {
    let payload;

    let response = await fetch(url, {
        method: method,
        mode: 'cors',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': 'bearer ' + authenticationService.token,
            'Content-Type': 'application/json'
        }
    });
    await response.json()
    .then((data) => {
        payload = data;
    })
    .catch((ex) => {
        console.log(ex);
    });

    return payload;
}

async function fetchApiEndpoint(url, method) {

    let payload;

    let response = await fetch(url, {
        method: method,
        mode: 'cors',
        headers: {
             'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({'username': 'test', 'password': 'test'})
    });

    await response.json()
    .then((data) => {
        payload = data;
    })
    .catch((ex) => {
        console.log(ex);
    });

    return payload;
}

export const authenticationService = {
    token: null,

    login: async () => {
        let payload = await fetchApiEndpoint(loginEndpoint, 'POST');
        authenticationService.token = payload.token;
    },
    logout: () => {
        authenticationService.token = null;
    },
    isAuthenticated: () => { return authenticationService.token != null; },
    fetchFromApi: fetchWithCredentials
};