const cellImage = document.getElementById('cellImage');
const tooltip = document.getElementById('tooltip');

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
