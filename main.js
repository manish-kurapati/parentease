const video = document.querySelector('#scene');
const frame = document.querySelector('#scene-frame');
const canvas = document.querySelector('#stars');
if (video && canvas) {
const context = canvas.getContext('2d');
const sampleCanvas = document.createElement('canvas');
const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });

const SENSITIVITY = 0.8;
const STAR_COUNT = 70;
const FRAME_COUNT = 24;
const mobileHero = window.matchMedia('(max-width: 760px)');
const stars = [];
let targetTime = 0;
let targetFrame = 0;
let currentFrame = 0;
const frameImages = [];
const frameReady = [];
let seeking = false;
let previousX = null;
let activePointer = null;
let skyPixels = null;
let viewportWidth = 0;
let viewportHeight = 0;
let pixelRatio = 1;
let videoWidth = 1920;
let videoHeight = 1080;

// Fixed positions keep the stars anchored in the sky while the video scrubs.
let seed = 42891;
function random() {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 4294967296;
}

for (let i = 0; i < STAR_COUNT; i += 1) {
  stars.push({
    x: 0.025 + random() * 0.95,
    y: 0.015 + random() * 0.25,
    size: 0.45 + random() * 1.05,
    phase: random() * Math.PI * 2,
    speed: 0.55 + random() * 1.35,
    shine: random(),
    visible: false,
  });
}

function resize() {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(viewportWidth * pixelRatio);
  canvas.height = Math.round(viewportHeight * pixelRatio);
  canvas.style.width = `${viewportWidth}px`;
  canvas.style.height = `${viewportHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function updateSkyMask() {
  const source = mobileHero.matches ? frame : video;
  if (mobileHero.matches ? !frame.complete || !frame.naturalWidth : video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
  videoWidth = mobileHero.matches ? frame.naturalWidth : video.videoWidth || videoWidth;
  videoHeight = mobileHero.matches ? frame.naturalHeight : video.videoHeight || videoHeight;
  sampleCanvas.width = 256;
  sampleCanvas.height = Math.round(256 * videoHeight / videoWidth);
  sampleContext.drawImage(source, 0, 0, sampleCanvas.width, sampleCanvas.height);
  skyPixels = sampleContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height).data;

  for (const star of stars) {
    const x = Math.min(sampleCanvas.width - 1, Math.floor(star.x * sampleCanvas.width));
    const y = Math.min(sampleCanvas.height - 1, Math.floor(star.y * sampleCanvas.height));
    const index = (y * sampleCanvas.width + x) * 4;
    const red = skyPixels[index];
    const green = skyPixels[index + 1];
    const blue = skyPixels[index + 2];
    // The dark, saturated blue is open sky; the pale bear and clouds fail this test.
    star.visible = red < 55 && green < 140 && blue > green * 1.2 && blue > red * 2;
  }
}

function drawStars(now) {
  context.clearRect(0, 0, viewportWidth, viewportHeight);
  const scale = Math.max(viewportWidth / videoWidth, viewportHeight / videoHeight);
  const offsetX = (viewportWidth - videoWidth * scale) / 2;
  const offsetY = (viewportHeight - videoHeight * scale) / 2;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  for (const star of stars) {
    if (!star.visible) continue;
    const x = offsetX + star.x * videoWidth * scale;
    const y = offsetY + star.y * videoHeight * scale;
    if (x < -10 || x > viewportWidth + 10 || y < -10 || y > viewportHeight + 10) continue;

    const pulse = still ? 0.62 : 0.55 + 0.45 * Math.sin(now * 0.001 * star.speed + star.phase);
    const alpha = (0.35 + pulse * 0.55) * Math.min(1, (0.38 - star.y) * 5);
    const radius = star.size * Math.min(1.3, Math.max(0.75, scale * 1.35));

    const glow = context.createRadialGradient(x, y, 0, x, y, radius * 5);
    glow.addColorStop(0, `rgba(243, 249, 255, ${alpha * 0.65})`);
    glow.addColorStop(0.3, `rgba(192, 224, 255, ${alpha * 0.22})`);
    glow.addColorStop(1, 'rgba(192, 224, 255, 0)');
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, radius * 5, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.3)})`;
    context.beginPath();
    context.arc(x, y, Math.max(0.45, radius * 0.6), 0, Math.PI * 2);
    context.fill();

    if (star.shine > 0.91 && pulse > 0.73) {
      context.strokeStyle = `rgba(232, 244, 255, ${(pulse - 0.73) * 1.8})`;
      context.lineWidth = 0.7;
      context.beginPath();
      context.moveTo(x - radius * 3.4, y);
      context.lineTo(x + radius * 3.4, y);
      context.moveTo(x, y - radius * 3.4);
      context.lineTo(x, y + radius * 3.4);
      context.stroke();
    }
  }
  requestAnimationFrame(drawStars);
}

function seekToTarget() {
  if (seeking || !Number.isFinite(video.duration) || video.duration <= 0) return;
  if (Math.abs(video.currentTime - targetTime) < 1 / 120) return;
  seeking = true;
  video.currentTime = targetTime;
}

function showMobileFrame() {
  const index = Math.round(targetFrame);
  const image = frameImages[index];
  if (!frameReady[index] || index === currentFrame) return;
  currentFrame = index;
  frame.src = image.src;
}

function loadMobileFrames() {
  if (frameImages.length) return;
  for (let index = 0; index < FRAME_COUNT; index += 1) {
    const image = new Image();
    image.onload = async () => {
      try { await image.decode?.(); } catch { /* A loaded image remains usable. */ }
      frameReady[index] = true;
      showMobileFrame();
    };
    image.src = `/assets/hero-frames/${String(index).padStart(2, '0')}.webp`;
    frameImages[index] = image;
  }
}

if (frame) {
  frame.addEventListener('load', updateSkyMask);
  if (frame.complete) updateSkyMask();
  if (mobileHero.matches) loadMobileFrames();
  mobileHero.addEventListener('change', () => {
    if (mobileHero.matches) loadMobileFrames();
    updateSkyMask();
  });
}

video.addEventListener('loadedmetadata', () => {
  video.pause();
  updateSkyMask();
});
video.addEventListener('loadeddata', updateSkyMask);
video.addEventListener('seeked', () => {
  seeking = false;
  updateSkyMask();
  seekToTarget();
});

window.addEventListener('pointerdown', (event) => {
  if (mobileHero.matches && !event.target.closest('.hero')) return;
  activePointer = event.pointerId;
  previousX = event.clientX;
});
window.addEventListener('pointerup', () => { activePointer = null; previousX = null; });
window.addEventListener('pointercancel', () => { activePointer = null; previousX = null; });
window.addEventListener('pointerleave', () => { previousX = null; });
window.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'touch' && activePointer !== event.pointerId) return;
  if (previousX === null) { previousX = event.clientX; return; }
  const delta = event.clientX - previousX;
  previousX = event.clientX;
  if (mobileHero.matches) {
    targetFrame = Math.max(0, Math.min(FRAME_COUNT - 1,
      targetFrame + delta / viewportWidth * SENSITIVITY * (FRAME_COUNT - 1)));
    showMobileFrame();
    return;
  }
  if (!Number.isFinite(video.duration) || video.duration <= 0) return;
  targetTime = Math.max(0, Math.min(video.duration - 0.001,
    targetTime + delta / viewportWidth * SENSITIVITY * video.duration));
  seekToTarget();
});

resize();
window.addEventListener('resize', resize);
requestAnimationFrame(drawStars);
}
