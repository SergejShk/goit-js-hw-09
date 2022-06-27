const refs = {
  btnStartRef: document.querySelector('[data-start]'),
  bttStopRef: document.querySelector('[data-stop]'),
};

let changeColor = null;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const onStartChangeColor = e => {
  changeColor = setInterval(() => {
    document.body.style.background = getRandomHexColor();
    refs.btnStartRef.setAttribute('disabled', '');
  }, 1000);
};

const onStopChangeColor = e => {
  clearInterval(changeColor);
  refs.btnStartRef.removeAttribute('disabled', '');
};

refs.btnStartRef.addEventListener('click', onStartChangeColor);
refs.bttStopRef.addEventListener('click', onStopChangeColor);
