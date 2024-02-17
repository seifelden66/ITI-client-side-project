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
    let usernameValue = usernameElement.value;
    let passwordValue = passwordElement.value;
    usernameElement.focus();
    usernameElement.blur();
    passwordElement.focus();
    passwordElement.blur();

    if(isValid(usernameValue) && isValid(passwordValue)){
        loginAndRedirect(trimInput(usernameValue), trimInput(passwordValue));
    }
})

function trimInput(input) {
    return input.trim();
}
function isBlank(value) {
    return value === "";
}
function isValid(input){
    let trimmedInput = trimInput(input)
    console.log(trimmedInput)
    return !isBlank(trimmedInput)
}

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


function setSuccess(element) {
    element.style.borderColor = "green";
    element.nextElementSibling.style.opacity = "0";
}
function setError(element) {
    let small = element.nextElementSibling;
    element.style.borderColor = "red";
    small.style.opacity = "1";
}


async function loginAndRedirect(username, password){
    try{
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            username: username,
            password: password,
            expiresInMins: 4300, 
            })
        })
        console.log(response);
        const data = await response.json();
        console.log(data);
        if(!response.ok){
            throw new Error(data.message)
        }
        const { token } = data;
        console.log(token);
        localStorage.setItem('token', token)
        location.href='profile.html';
    }
    catch(error){
        console.error(error);
        errorMessage.innerHTML = error.message;
        errorContainer.style.opacity = '1';
        setTimeout(() => {
            errorContainer.style.opacity = '0';
          }, 2000);
          
    }
}


eyeIcon.addEventListener('click', function(e){
    let type = passwordElement.type === 'password' ? 'text' : 'password';
    passwordElement.type = type;
    this.classList.toggle("fa-eye-slash");
    this.classList.toggle("fa-eye");
})


