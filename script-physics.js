const canvas = document.getElementById('gravityCanvas');
const ctx = canvas.getContext('2d');
const dropBtn = document.getElementById('dropBall');

let ball = {
  x: canvas.width / 2,
  y: 50,
  radius: 15,
  velocity: 0,
  gravity: 0.5,
  bouncing: false
};

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ff4d4d";
  ctx.fill();
  ctx.closePath();
}

function updateBall() {
  if (ball.bouncing) {
    ball.velocity += ball.gravity;
    ball.y += ball.velocity;
    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.velocity = 0;
      ball.bouncing = false;
    }
    drawBall();
    requestAnimationFrame(updateBall);
  }
}

dropBtn.addEventListener('click', () => {
  ball.y = 50;
  ball.velocity = 0;
  ball.bouncing = true;
  updateBall();
});
