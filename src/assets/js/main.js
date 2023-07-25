import '../styles/style.scss';
import { Timer } from '../js/timer.js';

let timerId = 0;

function createPlusButtonHtml() {
  return `
  <div class="container">
    <div class="add-timer">
      <button class="add-timer__button"></button>
    </div>
  </div>
`;
}

function createTimerHtml() {
  return `
    <div class="timer__time-container ">
      <span class="timer__time"></span>
    </div>
    <div class="timer__buttons">
      <button class="timer__button timer__start"></button>
      <button class="timer__button timer__pause"></button>
      <button class="timer__button timer__stop"></button>
    </div>
  `;
}

function createTimerElement() {
  const timerElement = document.createElement('div');
  timerElement.className = `timer timer-${timerId}`;
  timerElement.innerHTML = createTimerHtml();
  return timerElement;
}

function createTimer() {
  const timerElement = createTimerElement();

  plusButton.parentNode.insertBefore(timerElement, plusButton);

  const timerElements = {
    time: timerElement.querySelector('.timer__time'),
    start: timerElement.querySelector('.timer__start'),
    pause: timerElement.querySelector('.timer__pause'),
    stop: timerElement.querySelector('.timer__stop'),
  };

  new Timer(
    timerElements.time,
    timerElements.start,
    timerElements.pause,
    timerElements.stop
  );

  timerId += 1;
}

document.querySelector('#app').innerHTML = createPlusButtonHtml();
const plusButton = document.querySelector('.add-timer');
plusButton.addEventListener('click', createTimer);
