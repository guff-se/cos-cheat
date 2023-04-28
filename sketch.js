let time = 0;
const canvases = [];

window.addEventListener('DOMContentLoaded', () => {
  const curvesContainer = document.getElementById('curves-container');

  for (let i = 0; i < curves.length; i++) {
    // Create curve container elements
    const curveContainer = document.createElement('div');
    curveContainer.classList.add('curve-container');
    
    const functionText = document.createElement('h3');
    functionText.textContent = curves[i].text;
    
    const descriptionText = document.createElement('p');
    descriptionText.textContent = curves[i].description;

    const canvas = document.createElement('canvas');
    canvas.id = `curve${i + 1}`;
    canvas.classList.add('curve');
    canvas.width = 700;
    canvas.height = 200;
    canvases.push(canvas);

    // Append elements to the container
    curveContainer.appendChild(functionText);
    curveContainer.appendChild(descriptionText);
    curveContainer.appendChild(canvas);

    // Append container to the curves-container
    curvesContainer.appendChild(curveContainer);
  }

  draw();
});


function draw() {
  for (let i = 0; i < curves.length; i++) {
    const curve = curves[i].func;
    drawCurve(canvases[i], curve);
  }

  time += 0.01;
  requestAnimationFrame(draw);
}


function drawCurve(canvas, curve) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgb(50, 50, 50)';
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let x = 0; x < canvas.width; x++) {
    const t = time;
    const scaledX = x / 30; // Scale the x-axis by a factor of 10
    const y = map(curve(t, scaledX), -1, 1, 0, canvas.height);
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}

function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function windowResized() {
  for (let canvas of canvases) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}
