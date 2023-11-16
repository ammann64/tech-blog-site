
const loginButtonHandler = async (event) => {
    event.preventDefault();
    
    window.location.replace('/api/user/login');
}

const logoutButtonHandler = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type':  'application/json'},
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('#login-btn')
    .addEventListener('click', loginButtonHandler);

document
    .querySelector('#signup-btn')
    .addEventListener('click', logoutButtonHandler);
