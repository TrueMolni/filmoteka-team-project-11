import { getRefs } from './refs';

import {
  setLightThemModalOurTeam,
  setDarkThemModalOurTeam,
} from './modalOurTeam';

const refs = getRefs();

// const refs = {
//   iconSun: document.querySelector('[data-action="light"]'),
//   iconMoon: document.querySelector('[data-action="dark"]'),
//   footerContainer: document.querySelector('.footer'),
//   footerText: document.querySelector('.footer__descr'),
//   footerBtn: document.querySelector('.footer__btn'),
// };

refs.iconMoon.addEventListener('click', onDarkTheme);
refs.iconSun.addEventListener('click', onLightTheme);

setDefaultTheme();

function onDarkTheme() {
  localStorage.setItem('themes', JSON.stringify('DarkTheme'));
  setDarkThemModalOurTeam(refs);

  document.body.classList.toggle('dark-theme');
  refs.footerContainer.classList.toggle('footer__dark-theme');
  refs.footerText.classList.toggle('footer__dark-theme');
  refs.footerBtn.classList.toggle('footer__btn-dark');

  refs.iconMoon.removeEventListener('click', onDarkTheme);
  refs.iconSun.addEventListener('click', onLightTheme);

  refs.iconSun.classList.remove('hidden-icon');
  refs.iconMoon.classList.add('hidden-icon');
}

function onLightTheme() {
  localStorage.setItem('themes', JSON.stringify('LightTheme'));
  setLightThemModalOurTeam(refs);

  document.body.classList.toggle('dark-theme');
  refs.footerContainer.classList.toggle('footer__dark-theme');
  refs.footerText.classList.toggle('footer__dark-theme');
  refs.footerBtn.classList.toggle('footer__btn-dark');

  refs.iconSun.removeEventListener('click', onLightTheme);
  refs.iconMoon.addEventListener('click', onDarkTheme);

  refs.iconMoon.classList.remove('hidden-icon');
  refs.iconSun.classList.add('hidden-icon');
}

//!Функція бере дані з локал стореджа та втановлює темну тему, якщо користувач вже був на сайті та вибрав для себе темну тему
function setDefaultTheme() {
  const getlocalStorage = JSON.parse(localStorage.getItem('themes'));

  if (getlocalStorage === 'DarkTheme') {
    setDarkThemModalOurTeam(refs);

    document.body.classList.toggle('dark-theme');
    refs.footerContainer.classList.toggle('footer__dark-theme');
    refs.footerText.classList.toggle('footer__dark-theme');
    refs.footerBtn.classList.toggle('footer__btn-dark');

    refs.iconMoon.removeEventListener('click', onDarkTheme);
    refs.iconSun.addEventListener('click', onLightTheme);

    refs.iconSun.classList.remove('hidden-icon');
    refs.iconMoon.classList.add('hidden-icon');
  }
}
