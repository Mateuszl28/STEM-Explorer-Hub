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
  const scale = 20;
  const centerX = graphCanvas.width / 2;
  const centerY = graphCanvas.height / 2;

  gtx.strokeStyle = "#aaa";
  gtx.beginPath();
  gtx.moveTo(0, centerY);
  gtx.lineTo(graphCanvas.width, centerY);
  gtx.moveTo(centerX, 0);
  gtx.lineTo(centerX, graphCanvas.height);
  gtx.stroke();

  gtx.beginPath();
  gtx.strokeStyle = "#0066cc";
  let first = true;

  for (let px = 0; px < graphCanvas.width; px++) {
    const x = (px - centerX) / scale;
    let y;
    try {
      y = eval(funcText);
    } catch (e) {
      alert("Invalid function. Try something like x*x or Math.sin(x).");
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
