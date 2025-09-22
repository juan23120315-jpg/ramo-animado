// script.js

// 1) Fondo estrellado en <canvas>
const canvas = document.getElementById('stars');
const ctx    = canvas.getContext('2d');
let W, H;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Generación de estrellas
const stars = Array.from({ length: 200 }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  r: Math.random() * 1.5,
  o: Math.random()
}));

// Generador de estrellas fugaces
function shootingStar() {
  return {
    x: Math.random() * W,
    y: Math.random() * H / 2,
    len: Math.random() * 80 + 40,
    speed: Math.random() * 8 + 4,
    life: 0,
    maxLife: 80
  };
}
let meteors = [];

// Dibuja fondo y meteoros
function draw() {
  // Fondo negro
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // Estrellas fijas
  ctx.fillStyle = '#fff';
  stars.forEach(s => {
    ctx.globalAlpha = s.o;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Añade meteoros aleatorios
  if (Math.random() < 0.02) meteors.push(shootingStar());

  // Dibuja y actualiza cada meteoro
  meteors.forEach(m => {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.len, m.y + m.len / 2);
    ctx.stroke();

    m.x += m.speed;
    m.y -= m.speed / 2;
    m.life++;
  });

  // Limpia meteoros caducos
  meteors = meteors.filter(m => m.life < m.maxLife);

  requestAnimationFrame(draw);
}
draw();


// 2) Mostrar el mensaje romántico tras florecer
const msg = document.querySelector('.message');
setTimeout(() => {
  msg.classList.add('show');
}, 6000);


// 3) Música de fondo y botón de play
const music = document.getElementById('bg-music');
const btn   = document.getElementById('playMusic');

// Intentar autoplay; si falla, mostrar botón
btn.style.display = 'none';
music.play().catch(() => {
  btn.style.display = 'block';
});

// Al hacer click en el botón, reproducir y ocultar el botón
btn.addEventListener('click', () => {
  music.play();
  btn.style.display = 'none';
});
