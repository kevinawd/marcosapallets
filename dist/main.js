const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("elementos");
const overlay   = document.getElementById("overlay");

let lastScroll = 0;

menuBtn.addEventListener("click", () => {
    navLinks.style.transform="translate(0)";
    overlay.style.display="block"
});

overlay.addEventListener("click", () => {
    navLinks.style.transform="translateX(100%)";
    overlay.style.display="none";
});

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        navbar.style.top = "-80px";
    } else {
        navbar.style.top = "0";
    }

    lastScroll = currentScroll;
});
