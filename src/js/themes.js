const refs = {
  iconSun: document.querySelector('[data-action="light"]'),
  iconMoon: document.querySelector('[data-action="dark"]'),
  //   textCard: document.querySelectorAll('.item__capt'), //! Не чипляється до H2
  footerContainer: document.querySelector('.footer'),
  footerText: document.querySelector('.footer .container p'),
};

console.log(5);

refs.iconMoon.addEventListener('click', onDarkTheme);

function onDarkTheme() {
  document.body.style.backgroundColor = '#252525';
  refs.footerContainer.style.backgroundColor = '#252525';
  refs.footerContainer.style.color = '#ffffff';
  document.body.style.сolor = '#ffffff';

  //   refs.textCard.style.color = '#ffffff';

  refs.iconMoon.removeEventListener('click', onDarkTheme);
  refs.iconSun.addEventListener('click', onLightTheme);
}

refs.iconSun.addEventListener('click', onLightTheme);

function onLightTheme() {
  document.body.style.backgroundColor = '#ffffff';
  refs.footerContainer.style.backgroundColor = '#f7f7f7';
  refs.footerContainer.style.color = '#000000';
  document.body.style.сolor = '#000000';
  //   refs.textCard.style.color = '#000000';

  refs.iconSun.removeEventListener('click', onLightTheme);
  refs.iconMoon.addEventListener('click', onDarkTheme);
}
