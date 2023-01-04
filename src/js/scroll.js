const toTopBtn = document.querySelector('.btn-to-top');

// Повісити на закриття модалки
// const scrolled = window.pageYOffset;
// const coords = window.innerHeight / 3;
//   if (scrolled > coords) {
//     toTopBtn.classList.add('btn-to-top--visible');
//   };

// При відкритті модалки
// toTopBtn.classList.remove('btn-to-top--visible');

window.addEventListener('scroll', onScroll);
toTopBtn.addEventListener('click', onToTopBtn);

function onScroll() {
    const scrolled = window.pageYOffset;
    const coords = window.innerHeight / 3;
    if (scrolled > coords) {
        toTopBtn.classList.add('btn-to-top--visible');
    };
    if (scrolled <= coords && toTopBtn) {
        toTopBtn.classList.remove('btn-to-top--visible');
    };
};

function onToTopBtn() {
    if (window.pageYOffset > 0) {
        window.scrollTo({
            top,
            behavior: "smooth"
        });
    };
};

onScroll();
onToTopBtn();


