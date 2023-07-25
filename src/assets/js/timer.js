export class Timer {
  constructor(timeElement, start, pause, stop) {
    this.counter = 0;
    this.timeElement = timeElement;
    this.startButton = start;
    this.pauseButton = pause;
    this.stopButton = stop;

    this.startButton.addEventListener('click', () => {
      this.startTimer();
      this.startButton.style.display = 'none';
      this.pauseButton.style.display = 'block';
      this.changeColor();
    });

    this.pauseButton.addEventListener('click', () => {
      this.pauseTimer();
      this.startButton.style.display = 'block';
      this.pauseButton.style.display = 'none';
      this.changeColor();
    });

    this.stopButton.addEventListener('click', () => {
      this.stopTimer();
      this.startButton.style.display = 'block';
      this.pauseButton.style.display = 'none';
      this.changeColor();
    });
  }

  get hours() {
    return this.counter > 3599 ? Math.floor(this.counter / 3600) : '';
  }

  get minutes() {
    return this.counter > 59 ? Math.floor(this.counter / 60) % 60 : '';
  }
  get seconds() {
    return this.counter > 59 ? this.counter % 60 : this.counter;
  }

  changeColor() {
    this.timeElement.parentNode.classList.toggle('timer_running');
    this.startButton.firstElementChild.classList.toggle('timer_running');
    this.pauseButton.firstElementChild.classList.toggle('timer_running');
    this.stopButton.firstElementChild.classList.toggle('timer_running');
  }

  formatTime(hours, minutes, seconds) {
    if (minutes > 0 && seconds < 10) {
      seconds = `0${seconds}`;
    }

    if (hours > 0 && minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (hours > 0) {
      return `${hours}:${minutes}:${seconds}`;
    } else if (minutes > 0) {
      return `${minutes}:${seconds}`;
    } else {
      return `${seconds}`;
    }
  }

  updateTimer() {
    this.counter++;
    this.timeElement.textContent = this.formatTime(
      this.hours,
      this.minutes,
      this.seconds
    );
  }

  startTimer() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => this.updateTimer(), 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.resetTimer();
  }

  resetTimer() {
    this.counter = 0;
    this.timeElement.textContent = '';
  }
}
