let time = 0;
let selectedCurveIndex = 0;
const curveCanvas = document.createElement('canvas');

window.addEventListener('DOMContentLoaded', () => {
  const curveSelector = document.getElementById('curve-selector');
  const customFunctionInput = document.getElementById('custom-function');
      
  const canvasContainer = document.getElementById('curves-container');
  const containerWidth = canvasContainer.clientWidth; // Get the container width

  curveCanvas.id = 'curve-canvas';
  curveCanvas.width = containerWidth - 20;
  curveCanvas.height = 250;
  curveCanvas.style.margin = '10px';

  canvasContainer.appendChild(curveCanvas);

  updateCurveInfo();
    
  for (let i = 0; i < curves.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = curves[i].text;
    curveSelector.appendChild(option);
    curves[i].func = createFunction(curves[i].text);
  }

  curveSelector.addEventListener('change', (event) => {
    selectedCurveIndex = parseInt(event.target.value);
    customFunctionInput.value = curves[selectedCurveIndex].text;
    curves[selectedCurveIndex].func = createFunction(curves[selectedCurveIndex].text);
    updateCurveInfo();
  });


    customFunctionInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action (e.g., submitting a form)
        curves[selectedCurveIndex].func = createFunction(customFunctionInput.value);
      }
    });

  customFunctionInput.value = curves[selectedCurveIndex].text;

  draw();
});

function draw() {
  const curve = curves[selectedCurveIndex].func;
  drawCurve(curveCanvas, curve);

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

  for (let x = 10; x < canvas.width-10; x++) {
    const t = time;
    const scaledX = x / 30;
    const y = map(curve(t, scaledX), -1, 1, 20, canvas.height-40);
    ctx.lineTo(x, y);
  }

  ctx.stroke();

// Draw the rainbow spectrum
    for (let x = 0; x < canvas.width - 20; x++) {
      const t = time;
      const scaledX = (x + 10) / 30; // Scale the x-axis by a factor of 10 and add 10px margin
      const hue = map(curve(t, scaledX), -1, 1, 0, 360); // Map the y value to hue (0-360)

      // Set the fillStyle to the calculated hue
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

      // Draw a vertical line with the calculated color and 10px margin on the left, 20px margin on top
      ctx.fillRect(x + 10, canvas.height - 20, 1, 10);
    }
}

function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function createFunction(expression) {
  const func = new Function('t', 'x', 'cos', `return ${expression}`);
  return (t, x) => func(t, x, Math.cos);
}

function updateCurveInfo() {
  const titleElement = document.getElementById('curve-title');
  const descriptionElement = document.getElementById('curve-description');
  titleElement.textContent = curves[selectedCurveIndex].text;
  descriptionElement.textContent = curves[selectedCurveIndex].description;
}
