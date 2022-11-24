//Get the button
let scrollToTopBtn = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button

const scrollFunction = function () {
    window.scrollY > 1000 ? scrollToTopBtn.style.display = "block": scrollToTopBtn.style.display = "none";
};
window.addEventListener("scroll", scrollFunction);


const backToTop = function () {
    window.scrollTo(0,0);
}
// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", backToTop);


