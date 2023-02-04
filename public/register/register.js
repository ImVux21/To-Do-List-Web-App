const registerBtnDOM = document.querySelector('.register');
const usernameInputDOM = document.querySelector('#username');
const emailInputDOM = document.querySelector('#email');
const passwordInputDOM = document.querySelector('#password');
const errorPasswordDOM = document.querySelector('#errorPassword');
const errorUsernameDOM = document.querySelector('#errorUsername');
const errorEmailDOM = document.querySelector('#errorEmail');
const errorMessageDOM = document.querySelectorAll('.errormessage');

const register = () => {
    registerBtnDOM.onclick = async () => {
        const name = usernameInputDOM.value;
        const email = emailInputDOM.value;
        const password = passwordInputDOM.value;

        try {
            axios.defaults.withCredentials = true;
            await axios.post('http://localhost:3000/api/users', {
                name, email, password
            });
            usernameInputDOM.value = '';
            emailInputDOM.value = '';
            passwordInputDOM.value = '';

            alert("Registered Successfully!");

            errorMessageDOM.forEach(e => e.textContent = '');
            window.location.replace('../todo/index.html');       
        } catch (error) {
            const message = error.response.data.msg;
            if (message.includes('password')) {
                errorPasswordDOM.textContent = error.response.data.msg;
            } else if (message.includes('name')) {
                errorUsernameDOM.textContent = error.response.data.msg;
            } else if (message.includes('email')) {
                errorEmailDOM.textContent = error.response.data.msg;
            }
        }
    }
};

register();