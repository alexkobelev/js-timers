import '../styles/style.scss';

class Time {
  constructor(counter, max) {
    this.counter = counter;
    this.max = max;
  }

  increase() {
    this.counter++;
    if (this.counter === this.max) {
      this.counter = 0;
      return true;
    }
    return false;
  }

  formatTime() {
    return this.counter < 10 ? `0${this.counter}` : this.counter;
  }
}

class Timer {
  constructor() {
    this.seconds = new Time(0, 60);
    this.minutes = new Time(0, 60);
    this.hours = new Time(0, 24);

    this.secondsElement = document.querySelector('.timer__seconds');
    this.minutesElement = document.querySelector('.timer__minutes');
    this.hoursElement = document.querySelector('.timer__hours');

    this.startButton = document.querySelector('.timer__start');
    this.pauseButton = document.querySelector('.timer__pause');
    this.stopButton = document.querySelector('.timer__stop');

    this.startButton.addEventListener('click', () => {
      this.start();
      this.startButton.style.display = 'none';
      this.pauseButton.style.display = 'block';
    });

    this.pauseButton.addEventListener('click', () => {
      this.pause();
      this.startButton.style.display = 'block';
      this.pauseButton.style.display = 'none';
    });

    this.stopButton.addEventListener('click', () => {
      this.stop();
      this.startButton.style.display = 'block';
      this.pauseButton.style.display = 'none';
    });
  }

  start() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => this.updateTimer(), 1000);
  }

  pause() {
    clearInterval(this.interval);
  }

  stop() {
    clearInterval(this.interval);
    this.resetTimer();
  }

  resetTimer() {
    this.seconds.counter = 0;
    this.minutes.counter = 0;
    this.hours.counter = 0;

    this.secondsElement.innerHTML = '';
    this.minutesElement.innerHTML = '';
    this.hoursElement.innerHTML = '';
  }

  updateTimer() {
    let secCount = this.seconds.increase();
    this.secondsElement.innerHTML = this.seconds.formatTime();

    if (secCount) {
      let minCount = this.minutes.increase();
      this.minutesElement.innerHTML = this.minutes.formatTime() + ':';

      if (minCount) {
        this.hours.increase();
        this.hoursElement.innerHTML = this.hours.formatTime() + ':';
      }
    }
  }
}

let timerId = 0;

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="add-timer">
      <button class="add-timer__button"></button>
    </div>
  </div>
`;

let addTimerButton = document.querySelector('.add-timer');

addTimerButton.addEventListener('click', () => {
  let timerHtmlTemplate = `
    <div class="timer timer-${timerId}">
      <div class="timer__time ">
        <span class="timer__text timer__hours"></span>
        <span class="timer__text timer__minutes"></span>
        <span class="timer__text timer__seconds"></span>
      </div>
      <div class="timer__buttons">
        <button class="timer__button timer__start"></button>
        <button class="timer__button timer__pause"></button>
        <button class="timer__button timer__stop"></button>
      </div>
    </div>
  `;
  addTimerButton.insertAdjacentHTML('beforebegin', timerHtmlTemplate);
  let timer = new Timer();
  timerId += 1;
});
