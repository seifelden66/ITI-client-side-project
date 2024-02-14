let form = document.getElementById('form');
let inputFields = document.getElementsByClassName('input-field');
let usernameElement = document.getElementById('username');
let passwordElement = document.getElementById('password');
let errorMessage = document.getElementById('error-message');
let [errorContainer] = document.getElementsByClassName('error-container')


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
        let message = "username can't be blank";
        setError(e.target, message);  
    }
});
passwordElement.addEventListener("blur", function (e) {
    if(isValid(e.target.value)){
        setSuccess(e.target);
    }
    else {
        let message = "password can't be blank";
        setError(e.target, message); 
    }
});


function setSuccess(element) {
    element.style.borderColor = "green";
    element.nextElementSibling.style.opacity = "0";
}
function setError(element, message) {
    let small = element.nextElementSibling;
    element.style.borderColor = "red";
    small.style.opacity = "1";
    small.innerHTML = message;
}


async function loginAndRedirect(username, password){
    try{
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            username: username,
            password: password,
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
        //redirect
        location.href='profile.html';
    }
    catch(error){
        console.error(error);
        errorMessage.innerHTML = error.message;
        errorContainer.style.opacity = '1';
    }
}


