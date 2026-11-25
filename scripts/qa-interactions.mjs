import { chromium } from 'playwright-core';
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('#scene').evaluate(v=>new Promise(resolve=>v.readyState>=1?resolve():v.addEventListener('loadedmetadata',resolve,{once:true})));
  const before=await page.locator('#scene').evaluate(v=>v.currentTime);
  await page.mouse.move(350,300);await page.mouse.move(900,300,{steps:6});
  await page.waitForTimeout(500);
  const after=await page.locator('#scene').evaluate(v=>v.currentTime);
  if(after<=before)throw new Error('Hero video did not scrub');
  await page.goto('http://127.0.0.1:4173/book');
  await page.locator('input[name=name]').fill('Test Parent');
  await page.locator('input[name=email]').fill('test@example.com');
  await page.locator('#booking-form button').click();
  if(!await page.locator('.form-result').isVisible())throw new Error('Booking preview did not appear');
  const mobile=await browser.newPage({viewport:{width:390,height:844}});
  await mobile.goto('http://127.0.0.1:4173/');
  await mobile.locator('.menu-toggle').click();
  if(!await mobile.locator('.mobile-nav').isVisible())throw new Error('Mobile menu did not open');
  await mobile.locator('.mobile-nav a[href="/faq"]').click();
  if(!mobile.url().endsWith('/faq'))throw new Error('Mobile navigation failed');
  console.log(JSON.stringify({heroScrub:{before,after},bookingPreview:true,mobileNavigation:true}));
}finally{await browser.close();}
