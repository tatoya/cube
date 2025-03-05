let coins = 0;

const coinsElement = document.getElementById('coins');

// Инициализация Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание текстуры с белой точкой
const createDotTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  // Заливаем фон зеленым цветом
  context.fillStyle = '#00ff00';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Рисуем белую точку
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
  context.fillStyle = '#ffffff';
  context.fill();

  return new THREE.CanvasTexture(canvas);
};

// Создание куба с текстурой
const materials = [
  new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Правая грань
  new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Левая грань
  new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Верхняя грань
  new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Нижняя грань
  new THREE.MeshPhongMaterial({ map: createDotTexture() }), // Передняя грань (с точкой)
  new THREE.MeshPhongMaterial({ color: 0x00ff00 }), // Задняя грань
];

const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Освещение
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Позиция камеры
camera.position.z = 5;

// Центрирование куба
cube.position.set(0, 0, 0);

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

  // Преобразование координат мыши в нормализованные координаты (-1 to 1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Проверка пересечения луча с кубом
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    coins += 1; // Добавляем 1 монету за клик
    updateUI();
  }
});

// Обновление интерфейса
function updateUI() {
  coinsElement.textContent = coins;
}
