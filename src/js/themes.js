const refs = {
  iconSun: document.querySelector('[data-action="light"]'),
  iconMoon: document.querySelector('[data-action="dark"]'),
  footerContainer: document.querySelector('.footer'),
  footerText: document.querySelector('.footer .container p'),
  body: document.querySelector('.themes'),
};

refs.iconMoon.addEventListener('click', onDarkTheme);
refs.iconSun.addEventListener('click', onLightTheme);

setDefaultTheme();

function onDarkTheme() {
  document.body.style.backgroundColor = '#252525';
  refs.body.style.color = '#ffffff';

  refs.footerContainer.style.backgroundColor = '#151515';
  refs.footerContainer.style.color = '#ffffff';

  refs.iconMoon.removeEventListener('click', onDarkTheme);
  refs.iconSun.addEventListener('click', onLightTheme);

  refs.iconSun.classList.remove('hidden-icon');
  refs.iconMoon.classList.add('hidden-icon');

  localStorage.setItem('themes', JSON.stringify('DarkTheme'));
}

function onLightTheme() {
  document.body.style.backgroundColor = '#ffffff';
  refs.body.style.color = '#000000';

  refs.footerContainer.style.backgroundColor = '#f7f7f7';
  refs.footerContainer.style.color = '#000000';

  refs.iconSun.removeEventListener('click', onLightTheme);
  refs.iconMoon.addEventListener('click', onDarkTheme);

  refs.iconMoon.classList.remove('hidden-icon');
  refs.iconSun.classList.add('hidden-icon');

  localStorage.setItem('themes', JSON.stringify('LightTheme'));
}

//!Функція бере дані з локал стореджа та втановлює темну тему, якщо користувач вже був на сайті та вибрав для себе темну тему
function setDefaultTheme() {
  const getlocalStorage = JSON.parse(localStorage.getItem('themes'));

  if (getlocalStorage === 'DarkTheme') {
    document.body.style.backgroundColor = '#151515  ';
    refs.body.style.color = '#ffffff';

    refs.footerContainer.style.backgroundColor = '#252525';
    refs.footerContainer.style.color = '#ffffff';

    refs.iconMoon.removeEventListener('click', onDarkTheme);
    refs.iconSun.addEventListener('click', onLightTheme);

    refs.iconSun.classList.remove('hidden-icon');
    refs.iconMoon.classList.add('hidden-icon');
  }
}
