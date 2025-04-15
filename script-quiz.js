const questions = [
  {
    q: "📐 What is the area of a triangle with base 10 and height 5?",
    options: ["50", "25", "30", "15"],
    correct: 0
  },
  {
    q: "🧬 What part of the cell contains genetic material?",
    options: ["Mitochondria", "Ribosomes", "Nucleus", "Cytoplasm"],
    correct: 2
  },
  {
    q: "🌌 Which planet has the strongest gravity?",
    options: ["Earth", "Mars", "Saturn", "Jupiter"],
    correct: 3
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById('quizQuestion');
const answersEl = document.getElementById('quizAnswers');
const nextBtn = document.getElementById('nextQuestion');
const scoreEl = document.getElementById('quizScore');
const badgeArea = document.getElementById('badgeArea');
const downloadBtn = document.getElementById('downloadPDF');
const chatDisplay = document.getElementById('chatDisplay');
const helpBtn = document.getElementById('helpBtn');

// Hint and explanation data
const hints = [
  "Use the formula: (base * height) / 2",
  "Where is the DNA stored in a eukaryotic cell?",
  "Jupiter is the biggest planet – think about mass!"
];

const explanations = [
  "Area of triangle = (10 × 5) / 2 = 25.",
  "Nucleus stores the genetic material in eukaryotic cells.",
  "Jupiter has the most gravity due to its massive size."
];

// Load a quiz question
function loadQuestion() {
  const q = questions[current];
  questionEl.textContent = q.q;
  answersEl.innerHTML = '';
  chatDisplay.innerHTML = ''; // reset chatbot
  badgeArea.innerHTML = '';   // reset badge
  downloadBtn.style.display = 'none'; // hide PDF button

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'answer-btn';
    btn.onclick = () => checkAnswer(idx);
    answersEl.appendChild(btn);
  });

  nextBtn.classList.add('hidden');
}

// Check selected answer
function checkAnswer(selected) {
  const correct = questions[current].correct;
  const buttons = document.querySelectorAll('.answer-btn');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correct) btn.style.backgroundColor = "green";
    else if (idx === selected) btn.style.backgroundColor = "red";
  });

  if (selected === correct) score++;
  scoreEl.textContent = `Score: ${score}/${questions.length}`;
  chatDisplay.innerHTML = `<strong>Explanation:</strong> ${explanations[current]}`;
  nextBtn.classList.remove('hidden');
}

// Show hint when clicked
helpBtn.addEventListener('click', () => {
  const hint = hints[current];
  chatDisplay.innerHTML = `<strong>Hint:</strong> ${hint}`;
});

// Next question logic
nextBtn.addEventListener('click', () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// Final result + badge + PDF
function showResults() {
  questionEl.textContent = "🎉 Quiz completed!";
  answersEl.innerHTML = '';
  nextBtn.style.display = 'none';
  scoreEl.textContent = `Final Score: ${score} / ${questions.length}`;

  // Show badge
  const badge = document.createElement('div');
  badge.style.padding = "10px";
  badge.style.border = "2px solid gold";
  badge.style.background = "linear-gradient(to right, gold, orange)";
  badge.style.color = "#000";
  badge.style.borderRadius = "10px";
  badge.style.display = "inline-block";
  badge.style.marginTop = "10px";
  badge.innerHTML = "🏅 <strong>STEM Explorer Badge:</strong> Quiz Completed!";
  badgeArea.appendChild(badge);

  // Show download button
  downloadBtn.style.display = 'inline-block';
}

// PDF Certificate logic
downloadBtn.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();

  doc.setFontSize(22);
  doc.text("🏅 STEM Explorer Certificate", 20, 30);
  doc.setFontSize(16);
  doc.text(`This certifies that you have completed the STEM quiz.`, 20, 50);
  doc.text(`Final Score: ${score} / ${questions.length}`, 20, 65);
  doc.text(`Date: ${date}`, 20, 80);

  doc.setFontSize(12);
  doc.setTextColor(150);
  doc.text("STEM Explorer Hub © 2025", 20, 280);

  doc.save("STEM-Quiz-Certificate.pdf");
});

// Start quiz on load
window.addEventListener('load', loadQuestion);
