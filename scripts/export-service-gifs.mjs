import { chromium } from 'playwright-core';
import { spawnSync } from 'node:child_process';
import { copyFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ffmpeg = process.env.FFMPEG_PATH || 'C:/Users/manis/AppData/Local/Temp/parentease-ffmpeg/package/ffmpeg.exe';
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const jobs = [
  ...['anxiety','stress','relationships','adhd','trauma','depression'].map(id=>({id,folder:'services'})),
  ...['about','pricing','services','faq','contact','book'].map(id=>({id,folder:'page-heroes'})),
].filter(job=>!process.env.ASSET_ID||job.id===process.env.ASSET_ID);
const directory = await mkdtemp(join(tmpdir(),'parentease-gif-'));
const browser = await chromium.launch({headless:true,executablePath:chrome});
try {
  const page = await browser.newPage({viewport:{width:600,height:520},deviceScaleFactor:1});
  for(const {id,folder} of jobs){
    const svg=resolve('assets',folder,id+'.svg');
    await page.goto(pathToFileURL(svg).href);
    await page.evaluate(()=>document.documentElement.pauseAnimations());
    for(let frame=0;frame<20;frame++){
      await page.evaluate(t=>document.documentElement.setCurrentTime(t),frame/8);
      await page.screenshot({path:join(directory,`${id}-${String(frame).padStart(2,'0')}.png`),omitBackground:true});
    }
    await copyFile(join(directory,`${id}-00.png`),resolve('assets',folder,id+'.png'));
    const input=join(directory,id+'-%02d.png');
    const output=resolve('assets',folder,id+'.gif');
    const filters='[0:v]fps=8,split[a][b];[a]palettegen=reserve_transparent=1:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:alpha_threshold=128';
    const run=spawnSync(ffmpeg,['-loglevel','error','-y','-framerate','8','-i',input,'-filter_complex',filters,'-loop','0',output],{encoding:'utf8'});
    if(run.status!==0)throw new Error(`${id}: ${run.stderr}`);
    console.log(output);
  }
}finally{
  await browser.close();
  await rm(directory,{recursive:true,force:true});
}
