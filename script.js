let canvas = document.querySelector('#canvas');
let width = 600;
let height = 600;
let ctx = canvas.getContext('2d');
let blockSize = 30;
let keys = [];

canvas.width = width;
canvas.height = height;

let wall = new Image();
wall.src = 'images/zed.png';

let hero = new Image();
hero.src = 'images/down.png';

let darek2 = new Image();
darek2.src = 'images/darek2.png';

let darek3 = new Image();
darek3.src = 'images/darek3.png';

let hulka = new Image();
hulka.src = 'images/hulka.png';

let hvezda = new Image();
hvezda.src = 'images/hvezda.png';

let kapr = new Image();
kapr.src = 'images/kapr.png';

let ponozky = new Image();
ponozky.src = 'images/ponozky.png';

let rukavice = new Image();
rukavice.src = 'images/rukavice.png';

let player = {
  x: 8,
  y: 1,
};

let board = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let game = {
  timeElement: document.getElementById('time'),
  scoreElement: document.getElementById('score'),
  endElement: document.querySelector('#end'),
  videoElement: document.querySelector('#end video'),
  score: 0,
  time: 0,
};

function generateBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) {
        ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }

  for (let i = 0; i < items.length; i++) {
    ctx.drawImage(
      items[i].imageObject,
      items[i].x * blockSize,
      items[i].y * blockSize,
      blockSize,
      blockSize,
    );
  }
}

function draw() {
  ctx.clearRect(
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize,
  );

  generateBoard();
  movement();
  collect();

  ctx.drawImage(
    hero,
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize,
  );
}

function startGame() {
  game.time = 60;
  createitems();
  draw();
  timer();
}

function timer() {
  function startTimer(duration, display) {
    let timer = duration,
      minutes,
      seconds;

    let time = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      //v??hra
      if (game.score === 6) {
        endGame('win');
        clearInterval(time);
      }

      //prohra
      if (timer === 0) {
        endGame('loss');
        clearInterval(time);
      }

      display.innerText = minutes + ':' + seconds;

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  startTimer(game.time, game.timeElement);
}

function endGame(type) {
  if (type === 'win') {
    game.videoElement.src = 'animations/codemas vyhra.mp4';
  }

  if (type === 'loss') {
    game.videoElement.src = 'animations/codemas prohra.mp4';
  }

  canvas.style.display = 'none';
  // zp??sob zobrazen?? elementu
  game.endElement.style.display = 'block';
}

window.addEventListener('load', startGame);

document.body.addEventListener('keydown', function (e) {
  keys[e.keyCode] = true;
  draw();
});

document.body.addEventListener('keyup', function (e) {
  keys[e.keyCode] = false;
  draw();
});

function canMove(x, y) {
  return (
    y >= 0 &&
    y < board.length &&
    x >= 0 &&
    x < board[y].length &&
    board[y][x] != 1
  );
}

function movement() {
  if (keys[39] && canMove(player.x + 1, player.y)) {
    // ??ipka doprava
    hero.src = 'images/right.png';
    player.x++;
  }

  if (keys[37] && canMove(player.x - 1, player.y)) {
    // ??ipka doleva
    hero.src = 'images/left.png';
    player.x--;
  }

  if (keys[38] && canMove(player.x, player.y - 1)) {
    // ??ipka nahoru
    hero.src = 'images/up.png';
    player.y--;
  }

  if (keys[40] && canMove(player.x, player.y + 1)) {
    // ??ipka dol??
    hero.src = 'images/down.png';
    player.y++;
  }
}

let items = [];

function createitems() {
  items.push({
    x: 1,
    y: 1,
    imageObject: darek2,
  });

  items.push({
    x: 1,
    y: 15,
    imageObject: darek3,
  });

  items.push({
    x: 14,
    y: 12,
    imageObject: hulka,
  });

  items.push({
    x: 15,
    y: 18,
    imageObject: hvezda,
  });

  items.push({
    x: 5,
    y: 11,
    imageObject: kapr,
  });

  items.push({
    x: 15,
    y: 1,
    imageObject: ponozky,
  });

  items.push({
    x: 14,
    y: 5,
    imageObject: rukavice,
  });
}

function collect() {
  for (let i = 0; i < items.length; i++) {
    console.log(player.x + ' ' + items[i].x);
    if (player.x == items[i].x && player.y == items[i].y) {
      items.splice(i, 1);
      increaseScore();
    }
  }
}

/* pocitani skore */

function increaseScore() {
  game.score++;
  game.scoreElement.textContent = `${game.score}/7`;
}
