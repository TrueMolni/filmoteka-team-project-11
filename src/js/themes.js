const refs = {
  iconSun: document.querySelector('[data-action="light"]'),
  iconMoon: document.querySelector('[data-action="dark"]'),
  footerContainer: document.querySelector('.footer'),
  footerText: document.querySelector('.footer .container p'),
  body: document.querySelector('.themes'),
};

refs.iconMoon.addEventListener('click', onDarkTheme);

function onDarkTheme() {
  document.body.style.backgroundColor = '#252525';
  refs.footerContainer.style.backgroundColor = '#252525';
  refs.footerContainer.style.color = '#ffffff';
  refs.body.style.color = '#ffffff';

  refs.iconMoon.removeEventListener('click', onDarkTheme);
  refs.iconSun.addEventListener('click', onLightTheme);

  refs.iconSun.classList.remove('hidden-icon');
  refs.iconMoon.classList.add('hidden-icon');
}

refs.iconSun.addEventListener('click', onLightTheme);

function onLightTheme() {
  document.body.style.backgroundColor = '#ffffff';
  refs.footerContainer.style.backgroundColor = '#f7f7f7';
  refs.footerContainer.style.color = '#000000';
  refs.body.style.color = '#000000';

  refs.iconSun.removeEventListener('click', onLightTheme);
  refs.iconMoon.addEventListener('click', onDarkTheme);

  refs.iconMoon.classList.remove('hidden-icon');
  refs.iconSun.classList.add('hidden-icon');
}
