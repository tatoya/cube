let coins = 0;
let clickPower = 1;
let multiplier = 1;
let autoClickers = 0;

const coinsElement = document.getElementById('coins');
const multiplierElement = document.getElementById('multiplier');
const autoClickersElement = document.getElementById('autoClickers');
const clickPowerCostElement = document.getElementById('clickPowerCost');
const autoClickerCostElement = document.getElementById('autoClickerCost');
const multiplierCostElement = document.getElementById('multiplierCost');

// Инициализация Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание куба
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Освещение
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 5;

// Анимация
const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};
animate();

// Обработка кликов
renderer.domElement.addEventListener('click', (event) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    coins += clickPower * multiplier;
    updateUI();
  }
});

// Автокликеры
setInterval(() => {
  coins += autoClickers * multiplier;
  updateUI();
}, 1000);

// Магазин
function buyClickPower() {
  const cost = Math.pow(2, clickPower);
  if (coins >= cost) {
    coins -= cost;
    clickPower += 1;
    updateUI();
  }
}

function buyAutoClicker() {
  const cost = 50 * (autoClickers + 1);
  if (coins >= cost) {
    coins -= cost;
    autoClickers += 1;
    updateUI();
  }
}

function buyMultiplier() {
  const cost = 100 * multiplier;
  if (coins >= cost) {
    coins -= cost;
    multiplier *= 2;
    updateUI();
  }
}

// Обновление интерфейса
function updateUI() {
  coinsElement.textContent = coins;
  multiplierElement.textContent = multiplier;
  autoClickersElement.textContent = autoClickers;
  clickPowerCostElement.textContent = Math.pow(2, clickPower);
  autoClickerCostElement.textContent = 50 * (autoClickers + 1);
  multiplierCostElement.textContent = 100 * multiplier;
}
