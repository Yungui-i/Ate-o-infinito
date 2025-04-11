const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];

const colors = [
    'rgba(173,216,230,', // light blue
    'rgba(255,182,193,', // light pink
    'rgba(216,191,216,', // thistle
    'rgba(255,255,255,'  // soft white
];

for (let i = 0; i < 120; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.3 + 0.05,
        speedX: Math.random() * 0.3 - 0.15,
        baseOpacity: Math.random() * 0.5 + 0.2,
        angle: Math.random() * 2 * Math.PI,
        color: color
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.angle += 0.01;
        const flicker = Math.sin(p.angle) * 0.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${(p.baseOpacity + flicker).toFixed(2)})`;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = 12;
        ctx.fill();

        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) p.y = height;
        if (p.x > width || p.x < 0) p.x = Math.random() * width;
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();

// Movimento da rosa com o mouse
const rose = document.getElementById('rose');
const container = document.getElementById('container');
const loveText = document.getElementById('love-text');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // range -1 to 1
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

document.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    const touchX = (touch.clientX / window.innerWidth - 0.5) * 2;
    const touchY = (touch.clientY / window.innerHeight - 0.5) * 2;

    mouseX = touchX;
    mouseY = touchY;
  }

  e.preventDefault(); // impede o scroll padrão enquanto desliza
}, { passive: false });


function animateInteraction() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    const rotateDeg = currentX * 30;
    const translateX = currentX * 25;
    const translateY = currentY * 25;

    loveText.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px))`;


    rose.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) rotate(${rotateDeg}deg)`;

    // Movimento sutil de fundo (parallax de partículas)
    canvas.style.transform = `translate(${translateX * 0.3}px, ${translateY * 0.3}px)`;

    
    const petal1 = document.getElementById('petal1');
    const petal2 = document.getElementById('petal2');
    const petal3 = document.getElementById('petal3');
    const leaf1 = document.getElementById('leaf1');
    const leaf2 = document.getElementById('leaf2');
    const stem = document.getElementById('stem');


    const petalWiggle = currentX * 5;
    const leafWiggle = currentY * 3;

    if (petal1) petal1.setAttribute('transform', `rotate(${petalWiggle} 100 80)`);
    if (petal2) petal2.setAttribute('transform', `rotate(${-petalWiggle} 100 85)`);
    if (petal3) petal3.setAttribute('transform', `rotate(${petalWiggle / 2} 100 90)`);

    if (leaf1) leaf1.setAttribute('transform', `rotate(${leafWiggle} 100 160)`);
    if (leaf2) leaf2.setAttribute('transform', `rotate(${-leafWiggle} 100 180)`);

    stem.setAttribute('transform', `rotate(${rotateDeg / 10} 100 130)`);
    leaf1.setAttribute('transform', `rotate(${rotateDeg / 10} 100 130)`);
    leaf2.setAttribute('transform', `rotate(${rotateDeg / 10} 100 130)`);



    requestAnimationFrame(animateInteraction);
}

animateInteraction();


window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
