let form = document.getElementById('form');
let inputFields = document.getElementsByClassName('input-field');
let usernameElement = document.getElementById('username');
let passwordElement = document.getElementById('password');
let errorMessage = document.getElementById('error-message');
let [errorContainer] = document.getElementsByClassName('error-container')
let eyeIcon = document.getElementById('eye-icon');

let token = localStorage.getItem('token');

if(token){
    location.href = 'profile.html'
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    let usernameValue = trimInput(usernameElement.value);
    let passwordValue = trimInput(passwordElement.value);
    usernameElement.focus();
    usernameElement.blur();
    passwordElement.focus();
    passwordElement.blur();

    if(isValid(usernameValue) && isValid(passwordValue)){
        loginAndRedirect(usernameValue, passwordValue);   
    }
})

eyeIcon.addEventListener('click', function(e){
    let type = passwordElement.type === 'password' ? 'text' : 'password';
    passwordElement.type = type;
    this.classList.toggle("fa-eye-slash");
    this.classList.toggle("fa-eye");
})

usernameElement.addEventListener("blur", function (e) {
    if(isValid(e.target.value)){
        setSuccess(e.target);
    }
    else {
        setError(e.target);  
    }
});
passwordElement.addEventListener("blur", function (e) {
    if(isValid(e.target.value)){
        setSuccess(e.target);
    }
    else {
        setError(e.target); 
    }
});

function trimInput(input) {
    return input.trim();
}
function isBlank(value) {
    return value === "";
}
function isValid(input){
    let trimmedInput = trimInput(input)
    return !isBlank(trimmedInput)
}

function setSuccess(element) {
    element.style.borderColor = "green";
    element.nextElementSibling.style.opacity = "0";
}
function setError(element) {
    let small = element.nextElementSibling;
    element.style.borderColor = "red";
    small.style.opacity = "1";
}


async function loginAndRedirect(usernameValue, passwordValue){
    try{
        const loginResponse = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            username: usernameValue,
            password: passwordValue,
            })
        })
        const loginData = await loginResponse.json();
        if(!loginResponse.ok){
            throw new Error(loginData.message)
        }

        const { token } = loginData;
        localStorage.setItem('token', token)


        const authResponse = await fetch("https://dummyjson.com/user/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const authData = await authResponse.json();

        const { image, firstName, lastName, username, email, gender, age, phone } = authData;
        localStorage.setItem('userData', JSON.stringify({
            firstName, lastName, username, email, image, gender, age, phone
        }))

        location.href='index.html';
    }
    catch(error){
        console.error(error);
        renderError(error);   
    }
}

function renderError(error) {
    errorMessage.innerHTML = error.message;
    errorContainer.style.opacity = '1';
    setTimeout(() => {
        errorContainer.style.opacity = '0';
    }, 2000);
}

