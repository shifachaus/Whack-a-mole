let scoreEl = document.querySelector(".score");
let timeEl = document.querySelector(".time");
let startBtn = document.querySelector(".start");
let pauseBtn = document.querySelector(".pause");
let square = document.querySelectorAll(".square");

let score = 0;
let timeLeft = 0;
let position = null;
let timerId = null;
let randomMoleId = null;

const randomMole = () => {
  square.forEach((sq) => {
    sq.classList.remove("mole");
  });

  let findRandomPosition = square[Math.floor(Math.random() * square.length)];
  findRandomPosition.classList.add("mole");
  position = findRandomPosition.id;
};

square.forEach((sq) => {
  sq.addEventListener("mousedown", () => {
    if (timerId !== null) {
      if (sq.id === position) {
        score++;
        scoreEl.textContent = `Your score ${score}`;
        // Prevent multiple click
        position = null;
      }
    }
  });
});

const countDown = () => {
  timeLeft--;
  timeEl.textContent = `Time left ${timeLeft}`;

  if (timeLeft === 0) {
    // Stop Game
    clearInterval(randomMoleId);
    clearInterval(timerId);
    pauseBtn.style.display = "none";
  }
};

const startGame = () => {
  score = 0;
  timeLeft = 60;
  randomMoleId = setInterval(randomMole, 1000);
  timerId = setInterval(countDown, 1000);

  pauseBtn.style.display = "block";
};

const pauseResumeGame = () => {
  // Pause
  if (pauseBtn.textContent === "Pause") {
    clearInterval(timerId);
    clearInterval(randomMoleId);
    timerId = null;
    randomMoleId = null;
    pauseBtn.textContent = "Resume";
  } else {
    pauseBtn.textContent = "Pause";
    randomMoleId = setInterval(randomMole, 1000);
    timerId = setInterval(countDown, 1000);
  }
};

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseResumeGame);
