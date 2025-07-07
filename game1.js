const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const difficulties = {
  easy: { min: 1, max: 20, attempts: 7 },
  medium: { min: 1, max: 50, attempts: 8 },
  hard: { min: 1, max: 100, attempts: 10 }
};

let highScore = null;

function askDifficulty() {
  return new Promise((resolve) => {
    rl.question('Choose difficulty (easy/medium/hard): ', (diff) => {
      const d = diff.trim().toLowerCase();
      if (difficulties[d]) {
        resolve(d);
      } else {
        console.log('Invalid difficulty. Please type easy, medium, or hard.');
        resolve(askDifficulty());
      }
    });
  });
}

function askReplay() {
  return new Promise((resolve) => {
    rl.question('Do you want to play again? (y/n): ', (answer) => {
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

async function playGame() {
  console.log('Welcome to the Advanced Number Guessing Game!');
  const difficulty = await askDifficulty();

  const { min, max, attempts } = difficulties[difficulty];
  const answer = Math.floor(Math.random() * (max - min + 1)) + min;
  let lastDiff = null;
  let tries = 0;
  let remaining = attempts;
  let won = false;

  console.log(`I'm thinking of a number between ${min} and ${max}.`);
  console.log(`You have ${attempts} attempts. Good luck!`);

  async function makeGuess() {
    if (remaining <= 0) {
      console.log(`Out of attempts! The number was ${answer}.`);
      return;
    }
    rl.question(`Guess (${remaining} left): `, (input) => {
      const guess = Number(input.trim());
      tries++;
      remaining--;
      if (isNaN(guess) || guess < min || guess > max) {
        console.log(`Please enter a number between ${min} and ${max}.`);
        makeGuess();
        return;
      }
      if (guess === answer) {
        console.log(`🎉 Correct! You guessed it in ${tries} tries.`);
        if (!highScore || tries < highScore) {
          highScore = tries;
          console.log("🏆 New session high score!");
        } else {
          console.log(`Session high score: ${highScore} guesses.`);
        }
        won = true;
        next();
        return;
      }
      // Hints
      const diff = Math.abs(answer - guess);
      if (lastDiff !== null) {
        if (diff < lastDiff) {
          console.log("Warmer! 🔥");
        } else if (diff > lastDiff) {
          console.log("Colder! ❄️");
        } else {
          console.log("Same distance as before!");
        }
      } else {
        console.log(guess > answer ? "Too high!" : "Too low!");
      }
      lastDiff = diff;
      makeGuess();
    });
  }

  async function next() {
    const again = await askReplay();
    if (again) {
      playGame();
    } else {
      console.log("Thanks for playing!");
      rl.close();
    }
  }

  makeGuess();
}

playGame();