const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const min = 1;
const max = 100;
const answer = Math.floor(Math.random() * (max - min + 1)) + min;
let attempts = 0;

console.log('Welcome to the Number Guessing Game!');
console.log(`I'm thinking of a number between ${min} and ${max}. Can you guess it?`);

function askGuess() {
  rl.question('Your guess: ', (input) => {
    const guess = Number(input.trim());
    attempts++;
    if (isNaN(guess) || guess < min || guess > max) {
      console.log(`Please enter a number between ${min} and ${max}.`);
      askGuess();
    } else if (guess < answer) {
      console.log('Too low! Try again.');
      askGuess();
    } else if (guess > answer) {
      console.log('Too high! Try again.');
      askGuess();
    } else {
      console.log(`Correct! You guessed it in ${attempts} attempts. 🎉`);
      rl.close();
    }
  });
}

askGuess();