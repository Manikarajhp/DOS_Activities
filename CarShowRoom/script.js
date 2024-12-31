
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});
let currentSlide = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const totalSlides = carousel.children.length;
    
    // Calculate visibleSlides based on screen width
    const visibleSlides = window.innerWidth < 800 ? 1 : 4;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - visibleSlides;
    } else if (currentSlide >= totalSlides - visibleSlides + 1) {
        currentSlide = 0;
    }

    const offset = -currentSlide * (100 / visibleSlides);
    carousel.style.transform = `translateX(${offset}%)`;
}

let carousel = document.querySelector(".carousel");
let btns = document.querySelectorAll(".wrapper i");
let carouselChildren = [...carousel.children];
let wrapper = document.querySelector(".wrapper");

// Adjusting card width for mobile screens
let cardWidth = carousel.querySelector(".card").offsetWidth;
if (window.innerWidth < 800) {
    cardWidth = carousel.offsetWidth;
}

let isDragging = false,
    startX,
    startScrollLeft,
    isAutoPlay = true,
    timeoutId;

let cardsPerView = Math.round(carousel.offsetWidth / cardWidth);

carouselChildren.slice(-cardsPerView).reverse().forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildren.slice(0, cardsPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
    });
});

let dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

let dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

let dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

let infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};

let autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(() => {
        carousel.scrollLeft += cardWidth;
    }, 2500);
};

autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);