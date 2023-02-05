


const menu = document.getElementById("tm-menu");
const backdrop = document.getElementById("tm-backdrop");
const menuCloseButton = document.getElementById("tm-menu-close");
const menuOpenButton = document.getElementById("tm-menu-open");
const upButton = document.getElementById("tm-up");
// const top  = document.documentElement.scrollTop;


menuOpenButton.addEventListener("click", () => {
    menu.classList.add("tm-menu-open");
    backdrop.classList.add("tm-backdrop-visible");
})

menuCloseButton.addEventListener("click", () => {
    menu.classList.remove("tm-menu-open");
    backdrop.classList.remove("tm-backdrop-visible");
})

backdrop.addEventListener("click", () => {
    menu.classList.remove("tm-menu-open");
    backdrop.classList.remove("tm-backdrop-visible");
})

upButton.addEventListener("click", ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
})

window.addEventListener("scroll",(e)=>{
    if (document.documentElement.scrollTop > 100) {
        upButton.style.opacity = "1"
        upButton.style.visibility = "visible"
    } else {
        upButton.style.opacity = "0"
        upButton.style.visibility = "hidden"
    }
})