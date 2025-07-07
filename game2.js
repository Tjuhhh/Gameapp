const readline = require('readline');
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');

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

// Make sure color is always a function
function printFiglet(text, color = chalk.cyan) {
  return new Promise((resolve) => {
    figlet(text, (err, data) => {
      if (!err) {
        if (typeof color === 'function') {
          console.log(color(data));
        } else {
          console.log(data);
        }
      }
      resolve();
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function chooseDifficulty() {
  return new Promise((resolve) => {
    rl.question(
      chalk.yellow('Choose difficulty ') +
        chalk.bold('(easy/medium/hard): '),
      (diff) => {
        const d = diff.trim().toLowerCase();
        if (difficulties[d]) {
          resolve(d);
        } else {
          console.log(chalk.red('Invalid difficulty! Try again.'));
          resolve(chooseDifficulty());
        }
      }
    );
  });
}

async function replayPrompt() {
  return new Promise((resolve) => {
    rl.question(
      chalk.yellow('Play again? (y/n): '),
      (ans) => resolve(ans.trim().toLowerCase() === 'y')
    );
  });
}

async function game() {
  await printFiglet('Guess The Number!', chalk.green);

  const difficulty = await chooseDifficulty();
  const { min, max, attempts } = difficulties[difficulty];
  const answer = Math.floor(Math.random() * (max - min + 1)) + min;
  let lastDiff = null;
  let tries = 0;
  let remaining = attempts;
  let won = false;
  let lower = min;
  let upper = max;

  console.log(
    chalk.cyan(
      `\nI'm thinking of a number between ${min} and ${max}.`
    )
  );
  console.log(chalk.magenta(`You have ${attempts} attempts. Good luck! 🎯\n`));

  async function makeGuess() {
    if (remaining <= 0) {
      await printFiglet('Game Over', chalk.red);
      console.log(
        chalk.redBright(`The number was ${answer}. Better luck next time!`)
      );
      return;
    }
    rl.question(
      chalk.yellow(`Guess (${remaining} left): `),
      async (input) => {
        const spinner = ora('Thinking...').start();
        await sleep(400 + Math.random() * 400);
        spinner.stop();

        const guess = Number(input.trim());
        tries++;
        remaining--;
        if (isNaN(guess) || guess < min || guess > max) {
          console.log(
            chalk.bgRed.whiteBright(` Please enter a number between ${min} and ${max}. `)
          );
          makeGuess();
          return;
        }
        if (guess === answer) {
          await printFiglet('You Win!', chalk.green);
          console.log(
            chalk.bgGreen.whiteBright.bold(
              ` 🎉 Correct! You guessed it in ${tries} tries. `
            )
          );
          if (!highScore || tries < highScore) {
            highScore = tries;
            console.log(chalk.bold.yellowBright('🏆 New session high score!'));
          } else {
            console.log(
              chalk.blueBright(`Session high score: ${highScore} guesses.`)
            );
          }
          won = true;
          next();
          return;
        }
        // Give hints
        let hintMsg = '';
        const diff = Math.abs(answer - guess);
        if (lastDiff !== null) {
          if (diff < lastDiff) {
            hintMsg = chalk.greenBright('Warmer! 🔥');
          } else if (diff > lastDiff) {
            hintMsg = chalk.cyanBright('Colder! ❄️');
          } else {
            hintMsg = chalk.gray('Same distance as before!');
          }
        } else {
          hintMsg = guess > answer
            ? chalk.redBright('Too high! 📈')
            : chalk.blueBright('Too low! 📉');
        }
        if (guess < answer) lower = Math.max(lower, guess + 1);
        if (guess > answer) upper = Math.min(upper, guess - 1);

        const rangeHint = chalk.gray(
          `Range: [${lower} .. ${upper}]`
        );

        lastDiff = diff;
        console.log(hintMsg, rangeHint);
        makeGuess();
      }
    );
  }

  async function next() {
    const again = await replayPrompt();
    if (again) {
      console.clear();
      await game();
    } else {
      await printFiglet('Goodbye!', chalk.cyan);
      rl.close();
    }
  }

  makeGuess();
}

game();