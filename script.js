// --- Quiz Logic ---
const quizData = [
    {
      question: "What does HTML stand for?",
      answers: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HyperText Machine Language", "HighText Markdown Language"],
      correct: 1
    },
    {
      question: "Which planet has the most gravity?",
      answers: ["Earth", "Jupiter", "Mars", "Saturn"],
      correct: 1
    },
    {
      question: "What is the speed of light?",
      answers: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"],
      correct: 0
    }
  ];
  
  let currentQuestion = 0;
  
  const startBtn = document.getElementById('startQuiz');
  const quizContainer = document.getElementById('quizContainer');
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const nextBtn = document.getElementById('nextBtn');
  
  startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    quizContainer.classList.remove('hidden');
    loadQuestion();
  });
  
  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });
  
  function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = '';
  
    q.answers.forEach((answer, index) => {
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.onclick = () => checkAnswer(index);
      answersEl.appendChild(btn);
    });
  
    nextBtn.classList.add('hidden');
  }
  
  function checkAnswer(selected) {
    const correctIndex = quizData[currentQuestion].correct;
    const buttons = answersEl.querySelectorAll('button');
    buttons.forEach((btn, index) => {
      btn.disabled = true;
      if (index === correctIndex) {
        btn.style.backgroundColor = 'green';
      } else if (index === selected) {
        btn.style.backgroundColor = 'red';
      }
    });
    nextBtn.classList.remove('hidden');
  }
  
  function showResults() {
    questionEl.textContent = "You've completed the quiz!";
    answersEl.innerHTML = '';
    nextBtn.classList.add('hidden');
  }
  
  // --- Gravity Drop Simulation ---
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
  
      // Stop when it hits the bottom
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
  const graphCanvas = document.getElementById('graphCanvas');
  const gtx = graphCanvas.getContext('2d');
  const plotBtn = document.getElementById('plotGraph');
  const input = document.getElementById('functionInput');
  
  plotBtn.addEventListener('click', () => {
    const funcText = input.value;
    drawGraph(funcText);
  });
  
  function drawGraph(funcText) {
    gtx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  
    const scale = 20; // pixels per unit
    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;
  
    // Draw axes
    gtx.strokeStyle = "#aaa";
    gtx.beginPath();
    gtx.moveTo(0, centerY);
    gtx.lineTo(graphCanvas.width, centerY);
    gtx.moveTo(centerX, 0);
    gtx.lineTo(centerX, graphCanvas.height);
    gtx.stroke();
  
    // Draw graph
    gtx.beginPath();
    gtx.strokeStyle = "#0066cc";
    let first = true;
  
    for (let px = 0; px < graphCanvas.width; px++) {
      const x = (px - centerX) / scale;
      let y;
  
      try {
        y = eval(funcText); // ⚠️ Caution: using eval, only for safe hackathon demo use
      } catch (e) {
        alert("Invalid function. Please try again.");
        return;
      }
  
      const py = centerY - y * scale;
  
      if (first) {
        gtx.moveTo(px, py);
        first = false;
      } else {
        gtx.lineTo(px, py);
      }
    }
  
    gtx.stroke();
  }
  const cellImage = document.getElementById('cellImage');
  const tooltip = document.getElementById('tooltip');
  
  // Simple simulated "click zones" for demo purposes
  const cellParts = [
    { name: "Nucleus", x: 180, y: 170, r: 40, info: "The control center of the cell that contains DNA." },
    { name: "Mitochondria", x: 270, y: 120, r: 30, info: "The powerhouse of the cell, produces energy." },
    { name: "Golgi Apparatus", x: 100, y: 220, r: 25, info: "Modifies and packages proteins for transport." }
  ];
  
  cellImage.addEventListener('click', (e) => {
    const rect = cellImage.getBoundingClientRect();
    const scaleX = cellImage.width / cellImage.naturalWidth;
    const scaleY = cellImage.height / cellImage.naturalHeight;
    const x = (e.clientX - rect.left) / scaleX;
    const y = (e.clientY - rect.top) / scaleY;
  
    const part = cellParts.find(p => Math.hypot(p.x - x, p.y - y) < p.r);
  
    if (part) {
      tooltip.style.left = `${e.clientX + 10}px`;
      tooltip.style.top = `${e.clientY + 10}px`;
      tooltip.innerHTML = `<strong>${part.name}</strong><br>${part.info}`;
      tooltip.style.display = 'block';
    } else {
      tooltip.style.display = 'none';
    }
  });
      