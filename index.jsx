import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import './App.css';

function App() {
  const [coins, setCoins] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  
  const mountRef = useRef(null);

  // Инициализация Three.js сцены
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

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
    const handleClick = (event) => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cube);
      
      if (intersects.length > 0) {
        setCoins(prev => prev + clickPower * multiplier);
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Автокликеры
    const autoClickerInterval = setInterval(() => {
      setCoins(prev => prev + autoClickers * multiplier);
    }, 1000);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.domElement.removeEventListener('click', handleClick);
      clearInterval(autoClickerInterval);
    };
  }, [autoClickers, clickPower, multiplier]);

  // Магазин
  const ShopItem = ({ title, cost, onClick }) => (
    <div className="shop-item">
      <h3>{title}</h3>
      <p>Cost: {cost} coins</p>
      <button onClick={onClick}>Buy</button>
    </div>
  );

  return (
    <div className="App">
      <div className="overlay">
        <h1>CUBE COIN: {coins}</h1>
        <div className="stats">
          <p>Multiplier: x{multiplier}</p>
          <p>Auto-clickers: {autoClickers}</p>
        </div>
        
        <div className="shop">
          <ShopItem
            title="Upgrade Click Power (+1)"
            cost={Math.pow(2, clickPower)}
            onClick={() => {
              if (coins >= Math.pow(2, clickPower)) {
                setCoins(prev => prev - Math.pow(2, clickPower));
                setClickPower(prev => prev + 1);
              }
            }}
          />
          
          <ShopItem
            title="Buy Auto-clicker"
            cost={50 * (autoClickers + 1)}
            onClick={() => {
              if (coins >= 50 * (autoClickers + 1)) {
                setCoins(prev => prev - 50 * (autoClickers + 1));
                setAutoClickers(prev => prev + 1);
              }
            }}
          />
          
          <ShopItem
            title="Upgrade Multiplier (x2)"
            cost={100 * multiplier}
            onClick={() => {
              if (coins >= 100 * multiplier) {
                setCoins(prev => prev - 100 * multiplier);
                setMultiplier(prev => prev * 2);
              }
            }}
          />
        </div>
      </div>
      <div ref={mountRef} />
    </div>
  );
}

export default App;
