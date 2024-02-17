let formElement = document.getElementById("info-form");
let imgElement = document.getElementsByTagName("img")[0];
let userNameElement = document.getElementById("user-name");
let emailElement = document.getElementById("email");
let favSection = document.getElementsByClassName("fav-section")[0];
let token = localStorage.getItem("token");
if (!token) {
    location.href = "login.html";
}

login();
async function login(username, password) {
    try {
        const response = await fetch("https://dummyjson.com/user/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(data.message);
        }

        ({ firstName, lastName, username, email, gender, age, phone } = data);
        console.log(gender);

        userNameElement.innerText = firstName;
        emailElement.innerText = email;
        imgElement.src = data.image;
        let html = `
            <div class="input-field">
                <label for="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" readonly value="${firstName}">
            </div>           
            <div class="input-field">
                <label for="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" readonly value="${lastName}">
            </div>           
            <div class="input-field">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" readonly value="${username}">
            </div>           
            <div class="input-field">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" readonly value="${email}">
            </div>           
            <div class="input-field">
                <label for="age">Age</label>
                <input type="text" name="age" id="age" readonly value="${age}">
            </div>           
            <div class="input-field">
                <label for="phone">Phone</label>
                <input type="text" name="phone" id="phone" readonly value="${phone}">
            </div> 

            <div class="input-field">
                <span>Gender</span>
                <div class="genders">
                    <div class="male">
                        <i class="fa-solid fa-person"></i>
                        <span>Male</span>
                    </div>
                    <div class="female">
                        <i class="fa-solid fa-person-dress"></i>
                        <span>Female</span>
                    </div>
                </div>
            </div>        
        `;
        formElement.insertAdjacentHTML("beforeend", html);

        let [female] = document.getElementsByClassName("female");
        let [male] = document.getElementsByClassName("male");
        if (gender === "male") {
            male.style.backgroundColor = "#F4CE14";
        } else {
            console.log(female);
            female.style.backgroundColor = "#F4CE14";
        }
    } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        location.href = 'login.html';
    }
}



let favLinkElement = document.getElementById("fav-link");
let infoLinkElement = document.getElementById("info-link");

let contentElement = document.getElementsByClassName("content")[0];

favLinkElement.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("hello");
    contentElement.style.display = "none";
    favSection.style.display = "block";
});

infoLinkElement.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("hello");
    contentElement.style.display = "block";
    favSection.style.display = "none";
});

if(localStorage.getItem('cart')){
    let favsContainer = document.getElementsByClassName('favs-container')[0];
    console.log('hello2222');
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart)
    let cards = "";
    for(let i = 0; i < cart.length; i++){
        cards += `
            <div class="card">
                <a onclick="saveId(${cart[i].id})" href="Single-Prod.html">
                    <img src="${cart[i].images[0]}">
                    <div>
                        <h3>${cart[i].title}</h3>
                        <p>${cart[i].description}</p>
                        <div class="card-footer">
                            <div class="rate">${cart[i].rating}</div>
                            <span>$ ${cart[i].price}</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }


    favsContainer.insertAdjacentHTML('beforeend', cards);
}
function saveId(id) {
    localStorage.setItem("ProducID", JSON.stringify(id))
}


let signoutElement = document.getElementById("signout");
signoutElement.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    location.href = "index.html";
});

let arrowElement = document.getElementById("arrow");
let sideBar = document.getElementsByClassName("aside")[0];
let close = document.getElementById("close");
arrowElement.addEventListener("click", function (e) {
    sideBar.style.zIndex = "1";
    sideBar.style.visibility = "visible";
    sideBar.style.left = "0";
});

close.addEventListener("click", function (e) {
    sideBar.style.visibility = "hidden";
    sideBar.style.left = "-300px";
});


