import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const count = 24;
const output = new URL('../assets/hero-frames/', import.meta.url);
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});

try {
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#scene').evaluate(video => new Promise(resolve => {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) resolve();
    else video.addEventListener('loadeddata', resolve, { once: true });
  }));

  for (let frame = 0; frame < count; frame += 1) {
    const data = await page.locator('#scene').evaluate(async (video, { frame, count }) => {
      const time = frame / (count - 1) * Math.max(0, video.duration - 0.04);
      if (Math.abs(video.currentTime - time) > 0.001) {
        await new Promise(resolve => {
          video.addEventListener('seeked', resolve, { once: true });
          video.currentTime = time;
        });
      }
      const canvas = document.createElement('canvas');
      canvas.width = 960;
      canvas.height = 540;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/webp', 0.82).split(',')[1];
    }, { frame, count });
    await writeFile(new URL(`${String(frame).padStart(2, '0')}.webp`, output), Buffer.from(data, 'base64'));
  }
  console.log(`Exported ${count} mobile hero frames`);
} finally {
  await browser.close();
}
