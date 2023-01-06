import { getRefs } from './refs';
const refs = getRefs();

// Повісити на закриття модалки
// const scrolled = window.pageYOffset;
// const coords = window.innerHeight / 3;
//   if (scrolled > coords) {
//     toTopBtn.classList.add('btn-to-top--visible');
//   };

// При відкритті модалки
// toTopBtn.classList.remove('btn-to-top--visible');


window.addEventListener('scroll', onScroll);
refs.toTopBtn.addEventListener('click', onToTopBtn);

function onScroll() {
    setThemOnButtonToTop()
    const scrolled = window.pageYOffset;
    const coords = window.innerHeight / 3;
    if (scrolled > coords) {
        refs.toTopBtn.classList.add('btn-to-top--visible');
    };
    if (scrolled <= coords && refs.toTopBtn) {
        refs.toTopBtn.classList.remove('btn-to-top--visible');
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

function setThemOnButtonToTop() {
    if (refs.iconSun.classList.contains('hidden-icon')) {
        refs.toTopBtn.classList.remove('btn-to-top--dark');
    } else  {
        refs.toTopBtn.classList.add('btn-to-top--dark');
    };
};

onScroll();
onToTopBtn();


