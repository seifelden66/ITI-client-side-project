let slideImg = document.querySelector(".slide-img")
let next = document.querySelector(".btn-next")
let back = document.querySelector(".btn-back")
let imgs = [
    "imgs/pexels-drew-williams-3568518.jpg",
    "imgs/slider/pexels-ave-calvar-martinez-4705121.jpg",
    "imgs/slider/pexels-cottonbro-studio-5083212.jpg",
    "imgs/slider/pexels-jessica-lewis-🦋-thepaintedsquare-3361489.jpg",
    "imgs/slider/pexels-noah-erickson-404280.jpg",
    "imgs/slider/pexels-tyler-lastovich-1275929.jpg"
]

let index=0
next.addEventListener("click",()=>{
    if(index < imgs.length-1){
        index++ 
        slideImg.src = imgs [index]
        console.log(index);

    }else{
        console.log("hello");
        index= 0
        slideImg.src = imgs [index]
    }
})

back.addEventListener("click",()=>{
    if(index>0){
        index--
        slideImg.src = imgs[index]
    }else{
        index = imgs.length-1
        slideImg.src = imgs[index]

    }
})
