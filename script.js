const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
const snake = [];
let count = 0;
let direction = 'right';

snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

const position = () => {
  return {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
  };
}

let food = position();

const createBG = () => {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
};

const createLittleSnake = () => {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'green';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
};

const update = (event) => {
  if (event.keyCode === 37 && direction !== 'right') direction = 'left';
  if (event.keyCode === 38 && direction !== 'down') direction = 'up';
  if (event.keyCode === 39 && direction !== 'left') direction = 'right';
  if (event.keyCode === 40 && direction !== 'up') direction = 'down';

};

const drawFood = () => {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
};

document.addEventListener('keydown', update);

const startGame = () => {
  if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
  if (snake[0].x < 0 * box && direction === 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(game);
      alert(`😲 Game over 😭\n You eat ${count} foods`)
    }
  }

  createBG();
  createLittleSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'right') snakeX += box;
  if (direction === 'left') snakeX -= box;
  if (direction === 'up') snakeY -= box;
  if (direction === 'down') snakeY += box;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    console.log('Antes de comer:', count);
    count++;
    food = position()
    console.log('Depois de comer:', count);
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
};

const game = setInterval(startGame, 100);