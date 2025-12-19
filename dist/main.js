const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("elementos");
const overlay = document.getElementById("overlay");

let lastScroll = 0;

function disableScroll() {
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("scroll", lockScroll, { passive: false });
}

function enableScroll() {
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
    window.removeEventListener("scroll", lockScroll);
}

function preventScroll(e) {
    e.preventDefault();
}

function lockScroll() {
    window.scrollTo(lastScrollX, lastScrollY);
}

let lastScrollX = 0;
let lastScrollY = 0;

menuBtn.addEventListener("click", () => {
    lastScrollX = window.scrollX;
    lastScrollY = window.scrollY;
    disableScroll();
    navLinks.style.transform = "translate(0)";
    overlay.style.display = "block";
});

function cerrarMenu() {
    enableScroll();
    navLinks.style.transform = "translateX(100%)";
    overlay.style.display = "none";
}

overlay.addEventListener("click", cerrarMenu);

const links = navLinks.querySelectorAll("a");
links.forEach(link => link.addEventListener("click", cerrarMenu));

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll) navbar.style.top = "-80px";
    else navbar.style.top = "0";
    lastScroll = currentScroll;
});

const cards = document.querySelectorAll(".card-us");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;
let interval;

function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

function changeCard(nextIndex) {
    const current = cards[index];
    current.classList.remove("active");
    current.classList.add("exit-left");

    index = nextIndex;
    const next = cards[index];

    next.classList.add("enter-right");

    setTimeout(() => {
        current.classList.remove("exit-left");
        next.classList.remove("enter-right");
        next.classList.add("active");
        updateDots();
    }, 800);
}

function nextCard() {
    changeCard((index + 1) % cards.length);
}

function prevCard() {
    changeCard((index - 1 + cards.length) % cards.length);
}

function startAuto() {
    interval = setInterval(nextCard, 15000);
}

function resetAuto() {
    clearInterval(interval);
    startAuto();
}

nextBtn.addEventListener("click", () => {
    nextCard();
    resetAuto();
});

prevBtn.addEventListener("click", () => {
    prevCard();
    resetAuto();
});

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        const newIndex = Number(dot.dataset.index);
        if (newIndex !== index) {
            changeCard(newIndex);
            resetAuto();
        }
    });
});

startAuto();
