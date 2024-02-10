let heroImg = document.querySelector(".hero-img")
let btn1 = document.querySelector(".btn1")
let btn2 = document.querySelector(".btn2")
let imgs = [
"imgs/hero.jpg",
// "imgs/hero2.png",
"imgs/mac.jpeg",
"imgs/mac.webp"
]
let index = 0;


btn2.addEventListener("click",()=>{
    if(index <imgs.length-1 ){
        index++
        heroImg.src = imgs[index]

    }else{
        index=0
        heroImg.src = imgs[index]

    }
})
btn1.addEventListener("click",()=>{
    if(index > 0){
        index--
        heroImg.src = imgs[index]
    }else{
        index=imgs.length-1
        heroImg.src = imgs[index]

    }
})

// =================================================================
// user data

const userData = JSON.parse(sessionStorage.getItem('userData'));
const usernameContainer = document.getElementById('usernameContainer');

if (userData && userData.username) {
    usernameContainer.textContent = `Hello, ${userData.username}`;
} else {
    usernameContainer.textContent = 'Hello user please sign in';
}
