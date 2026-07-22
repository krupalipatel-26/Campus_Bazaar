/* =====================================
   CAMPUSBAZAAR - SCRIPT.JS
===================================== */

/* ===========================
   PRODUCT CARD AUTO SLIDER
=========================== */

const sliderTrack = document.querySelector(".slider-track");

if (sliderTrack) {
    let isPaused = false;

    sliderTrack.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    sliderTrack.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    function autoSlide() {
        if (!isPaused) {
            sliderTrack.scrollLeft += 1;

            if (
                sliderTrack.scrollLeft >=
                sliderTrack.scrollWidth - sliderTrack.clientWidth
            ) {
                sliderTrack.scrollLeft = 0;
            }
        }

        requestAnimationFrame(autoSlide);
    }

    autoSlide();
}

/* ===========================
   SEARCH PRODUCTS
=========================== */

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const products = document.querySelectorAll(".product-card");

        products.forEach(product => {

            if (
                product.innerText.toLowerCase().includes(value)
            ) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });

}

/* ===========================
   WISHLIST
=========================== */

const wishlistButtons =
document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(button => {

    button.addEventListener("click", function () {

        if (this.innerHTML == "🤍") {

            this.innerHTML = "❤️";

        } else {

            this.innerHTML = "🤍";

        }

    });

});

/* ===========================
   ADD TO CART COUNTER
=========================== */

let cartCount =
localStorage.getItem("cartCount") || 0;

const cartCounter =
document.getElementById("cart-count");

if(cartCounter){
    cartCounter.innerHTML = cartCount;
}

const addCartButtons =
document.querySelectorAll(".add-cart");

addCartButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        cartCount++;

        localStorage.setItem("cartCount",cartCount);

        if(cartCounter){
            cartCounter.innerHTML=cartCount;
        }

        showToast("Product Added Successfully");

    });

});

/* ===========================
   TOAST MESSAGE
=========================== */

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className="toast";

    toast.innerHTML=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

/* ===========================
   DARK MODE
=========================== */

const darkButton =
document.getElementById("darkMode");

if(localStorage.getItem("theme")=="dark"){

    document.body.classList.add("dark");

}

if(darkButton){

    darkButton.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

        }else{

            localStorage.setItem("theme","light");

        }

    });

}

/* ===========================
   BACK TO TOP
=========================== */

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(!topBtn) return;

    if(window.scrollY>300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

if(topBtn){

    topBtn.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

}

/* ===========================
   ANIMATED COUNTERS
=========================== */

const counters =
document.querySelectorAll(".counter");

counters.forEach(counter=>{

    counter.innerHTML="0";

    const update=()=>{

        const target=
        +counter.getAttribute("data-target");

        const current=
        +counter.innerHTML;

        const increment=
        target/100;

        if(current<target){

            counter.innerHTML=
            `${Math.ceil(current+increment)}`;

            setTimeout(update,20);

        }else{

            counter.innerHTML=target+"+";

        }

    };

    update();

});

/* ===========================
   SMOOTH SCROLL
=========================== */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({

            behavior:"smooth"

        });

    });

});

/* ===========================
   ACTIVE NAVBAR
=========================== */

const navLinks =
document.querySelectorAll(".nav-links a");

navLinks.forEach(link=>{

    if(link.href===window.location.href){

        link.classList.add("active");

    }

});

/* ===========================
   SCROLL ANIMATION
=========================== */

const observer =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

const hiddenElements=
document.querySelectorAll(".hidden");

hiddenElements.forEach(el=>{

    observer.observe(el);

});

/* ===========================
   LOADING SCREEN
=========================== */

window.addEventListener("load",()=>{

    const loader=
    document.getElementById("loader");

    if(loader){

        loader.style.display="none";

    }

});

/* ===========================
   TYPING EFFECT
=========================== */

const typing =
document.getElementById("typing");

if(typing){

    const words=[
        "Buy.",
        "Sell.",
        "Exchange."
    ];

    let wordIndex=0;

    let charIndex=0;

    function type(){

        if(charIndex<words[wordIndex].length){

            typing.innerHTML+=
            words[wordIndex].charAt(charIndex);

            charIndex++;

            setTimeout(type,120);

        }else{

            setTimeout(erase,1200);

        }

    }

    function erase(){

        if(charIndex>0){

            typing.innerHTML=
            words[wordIndex].substring(0,charIndex-1);

            charIndex--;

            setTimeout(erase,60);

        }else{

            wordIndex++;

            if(wordIndex>=words.length){

                wordIndex=0;

            }

            type();

        }

    }

    type();

}