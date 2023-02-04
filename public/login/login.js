const loginBtnDOM = document.querySelector('.login');
const emailInputDOM = document.querySelector('#email');
const passwordInputDOM = document.querySelector('#password');
const errorPasswordDOM = document.querySelector('#errorPassword');
const errorEmailDOM = document.querySelector('#errorEmail');
const errorMessageDOM = document.querySelectorAll('.errormessage');

const login = () => {
    loginBtnDOM.onclick = async () => {
        const email = emailInputDOM.value;
        const password = passwordInputDOM.value;

        try {
            axios.defaults.withCredentials = true;
            await axios.post('http://localhost:3000/api/login', {
                email, password
            });
            
            emailInputDOM.value = '';
            passwordInputDOM.value = '';
            
            alert("Login Successfully!");
            errorMessageDOM.forEach(e => e.textContent = '');
            
            window.location.replace('../todo/index.html');
        } catch (error) {
            const message = error.response.data.msg;
            if (message.toLowerCase().includes('password')) {
                errorPasswordDOM.textContent = error.response.data.msg;
            } else if (message.toLowerCase().includes('email')) {
                errorEmailDOM.textContent = error.response.data.msg;
            }
        }
    }
};

login();