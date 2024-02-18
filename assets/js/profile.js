let formElement = document.getElementById("info-form");
let imgElement = document.getElementsByTagName("img")[0];
let userNameElement = document.getElementById("user-name");
let emailElement = document.getElementById("email");
let token = localStorage.getItem("token");
let userData = JSON.parse(localStorage.getItem("userData"));

let favLinkElement = document.getElementById("fav-link");
let infoLinkElement = document.getElementById("info-link");
let favSection = document.getElementsByClassName("fav-section")[0];
let infoSection = document.getElementsByClassName("info-section")[0];

let favourites = JSON.parse(localStorage.getItem("favorite"));


if (!token) {
    location.href = "login.html";
}

if (userData) {
    let { gender } = userData;
    renderUserInfo(userData);
    renderGender(gender);
}

function renderUserInfo(userData) {
    let { firstName, lastName, username, email, image, age, phone } = userData;
    userNameElement.innerText = firstName;
    emailElement.innerText = email;
    imgElement.src = image;
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
}

function renderGender(gender) {
    let [female] = document.getElementsByClassName("female");
    let [male] = document.getElementsByClassName("male");
    if (gender === "male") {
        male.style.backgroundColor = "#F4CE14";
    } else {
        female.style.backgroundColor = "#F4CE14";
    }
}


favLinkElement.addEventListener("click", function (e) {
    e.preventDefault();
    infoSection.style.display = "none";
    favSection.style.display = "block";
});

infoLinkElement.addEventListener("click", function (e) {
    e.preventDefault();
    infoSection.style.display = "block";
    favSection.style.display = "none";
});


if (favourites) {
    let favsContainer = document.getElementsByClassName("favs-container")[0];
    
    let favouriteCards = "";
    for (let i = 0; i < favourites.length; i++) {
        let {id, images, title, description, rating, price} = favourites[i]
        favouriteCards += `
            <div class="card">
                <a onclick="saveId(${id})" href="Single-Prod.html">
                    <img src="${images[0]}">
                    <div>
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <div class="card-footer">
                            <div class="rate">${rating}</div>
                            <span>$ ${price}</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    favsContainer.insertAdjacentHTML("beforeend", favouriteCards);
}


function saveId(id) {
    localStorage.setItem("ProducID", JSON.stringify(id));
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
