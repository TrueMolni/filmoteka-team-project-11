import { getRefs } from './refs';
import throttle from 'lodash.throttle';

const refs = getRefs();

export function scrollCloseModal() {
    const scrolled = window.pageYOffset;
    const coords = window.innerHeight / 3;
    if (scrolled > coords) {
    refs.toTopBtn.classList.add('btn-to-top--visible');
    };
}

export function scrollOpenModal() {
    refs.toTopBtn.classList.remove('btn-to-top--visible');
}

window.addEventListener('scroll', throttle(onScroll, 500));
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


