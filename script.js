'use strict';

//query strings used in game
const queryStrings = {
  message: document.querySelector('.message'),
  highscore: document.querySelector('.highscore'),
  number: document.querySelector('.number'),
  body: document.querySelector('body'),
  guess: document.querySelector('.guess'),
  score: document.querySelector('.score'),
};

let secretNumber,
  score,
  highscore = 0;

//all the game initilizers
const gameInit = () => {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  changeMessage('Start guessing...');
  queryStrings.highscore.textContent = highscore;
  queryStrings.number.textContent = '?';
  queryStrings.body.style.backgroundColor = '#222';
  queryStrings.number.style.width = '15rem';
  queryStrings.guess.value = 0;
  updateScore(score);
};

const isHighScore = score => {
  if (score > highscore) {
    highscore = score;
  }
};

//player guessed correctly
const guessCorrect = () => {
  changeMessage('🎉 Correct Number!');
  isHighScore(score);
  queryStrings.highscore.textContent = highscore;
  queryStrings.number.textContent = secretNumber;
  queryStrings.body.style.backgroundColor = '#60b347';
  queryStrings.number.style.width = '30rem';
};

//changes message to what message was passed
const changeMessage = message => (queryStrings.message.textContent = message);

//updates score
const updateScore = score => (queryStrings.score.textContent = score);

//initilizes the game
gameInit();

//user clicks the 'check' button
document.querySelector('.check').addEventListener('click', e => {
  const guess = Number(queryStrings.guess.value);

  if (!guess) {
    changeMessage('⛔️ No Number Entered!');
  } else if (guess === secretNumber) {
    guessCorrect();
  } else if (guess !== secretNumber) {
    if (score > 1) {
      changeMessage(guess > secretNumber ? '📈 Too High' : '📉 Too low!');
      score--;
      updateScore(score);
    } else {
      changeMessage('You Lost');
    }
  }
});

//user clicks the 'again' button
document.querySelector('.again').addEventListener('click', e => {
  gameInit();
});
