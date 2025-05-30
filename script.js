
const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Initialize cubes in grid positions
cubes.forEach((cube, index) => {
  const cols = 3;
  const spacing = 100;
  const x = (index % cols) * spacing + 10;
  const y = Math.floor(index / cols) * spacing + 10;

  cube.style.left = `${x}px`;
  cube.style.top = `${y}px`;

  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;
    offsetX = e.clientX - cube.getBoundingClientRect().left;
    offsetY = e.clientY - cube.getBoundingClientRect().top;
    cube.style.zIndex = 1000;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Constrain within bounds
  newLeft = Math.max(0, Math.min(newLeft, container.offsetWidth - activeCube.offsetWidth));
  newTop = Math.max(0, Math.min(newTop, container.offsetHeight - activeCube.offsetHeight));

  activeCube.style.left = `${newLeft}px`;
  activeCube.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (activeCube) {
    activeCube.style.zIndex = 1;
    activeCube = null;
  }
});
