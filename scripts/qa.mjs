import { chromium } from 'playwright-core';
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const routes=['/','/about','/pricing','/services','/faq','/contact-us','/book',...['anxiety','stress','relationships','adhd','trauma','depression'].map(x=>'/services/'+x)];
try{
  for(const width of [1440,390]){
    const page=await browser.newPage({viewport:{width,height:900}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const route of routes){
      const response=await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'domcontentloaded'});
      await page.waitForTimeout(150);
      const data=await page.evaluate(()=>({title:document.title,h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth+1,links:[...document.querySelectorAll('nav a')].filter(a=>a.offsetParent!==null).length}));
      if(response.status()!==200||!data.h1||data.overflow||errors.length)console.log(JSON.stringify({width,route,status:response.status(),...data,errors}));
      if(width===1440&&route==='/'){
        await page.screenshot({path:'C:/Users/manis/AppData/Local/Temp/parentease-hero-v4.png'});
        await page.locator('.services-preview').screenshot({path:'C:/Users/manis/AppData/Local/Temp/parentease-services-home-v4.png'});
      }
      if(width===1440&&route==='/services')await page.locator('.all-services').screenshot({path:'C:/Users/manis/AppData/Local/Temp/parentease-services-v4.png'});
      if(width===1440&&route==='/about'){
        await page.screenshot({path:'C:/Users/manis/AppData/Local/Temp/parentease-about-v5.png',fullPage:true});
        const start=await page.locator('.site-logo').boundingBox();
        await page.evaluate(()=>scrollTo(0,700));
        const scrolled=await page.locator('.site-logo').boundingBox();
        if(Math.abs(start.y-scrolled.y)>1)throw new Error('Logo moved while scrolling');
        if(!await page.locator('.desktop-nav').isVisible())throw new Error('Navigation disappeared');
      }
      if(width===390&&route==='/faq')await page.locator('.page-hero').screenshot({path:'C:/Users/manis/AppData/Local/Temp/parentease-faq-mobile-v5.png'});
      if(width===390&&route==='/')await page.screenshot({path:'C:/Users/manis/AppData/Local/Temp/parentease-home-mobile-v3.png',fullPage:true});
    }
    console.log('checked',width,routes.length,'routes');
    await page.close();
  }
}finally{await browser.close();}
