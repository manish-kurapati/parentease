const services=[
  {id:'anxiety',name:'Anxiety',sub:'When your mind will not settle',copy:'A place for worry, racing thoughts, and the pressure to keep everything together.',detail:'Parenting can make ordinary uncertainty feel enormous. Here, you can explore anxious patterns and find steadier ways through the what-ifs.'},
  {id:'stress',name:'Stress & burnout',sub:'Find a little breathing room',copy:'Support for the endless mental load and feeling there is never enough of you.',detail:'When you are holding everyone else, your own needs can disappear. We make room to look at the load you carry.'},
  {id:'relationships',name:'Relationships',sub:'Come back to connection',copy:'Explore communication, conflict, and the relationships that shape your family life.',detail:'A thoughtful conversation can help you understand patterns and make space for repair.'},
  {id:'adhd',name:'ADHD',sub:'Find your rhythm',copy:'Make sense of attention, overwhelm, and the everyday systems that do or do not work for you.',detail:'You can explore the ways attention and executive functioning affect daily life, and discover practical support that respects how your mind works.'},
  {id:'trauma',name:'Trauma',sub:'A steadier space',copy:'A gentle place to speak about experiences that still feel close.',detail:'You can move at your own pace, with care for your sense of safety, boundaries, and the present moment.'},
  {id:'depression',name:'Depression',sub:'For the heavier days',copy:'A gentle place to talk about feeling flat, exhausted, or unlike yourself.',detail:'Some days even small tasks ask too much. Your experience deserves to be taken seriously, at a pace that feels possible.'}
];
const faq=[
  ['Getting started','What happens in a first session?','The first conversation is a chance to share what brings you here and what kind of support you hope for. You can go at your own pace.'],
  ['Getting started','Do I need to know exactly what is wrong?','No. You can begin with a feeling, a question, or simply the sense that things have been difficult.'],
  ['Getting started','Can I choose what we talk about?','Yes. Your concerns and comfort help shape the conversation.'],
  ['Sessions','Will sessions be online?','The planned ParentEase experience is for private online sessions. The final format and availability will be shared before bookings open.'],
  ['Sessions','How long is a session?','Session lengths and availability are being finalised and will be confirmed before you commit.'],
  ['Sessions','Is this only for parents?','ParentEase is designed with parents and caregivers in mind. We are finalising the full scope of who we can support.'],
  ['Privacy','Will my school or employer see what I share?','The planned reporting view is aggregate only. Personal session details should stay private; the final privacy policy will explain exactly how information is handled.'],
  ['Privacy','Is ParentEase an emergency service?','No. This website is not an emergency or crisis service. If you or someone else is in immediate danger, contact local emergency services.']
];
const arrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const link=(label='Book a session')=>`<a class="book-link" href="/book"><span>${label}</span><span class="book-link__arrow">${arrow}</span></a>`;
const pic=s=>`<img class="service-art" src="/assets/service-animations/${s.id}.webp" alt="" aria-hidden="true">`;
const card=(s,i)=>`<a class="service-card" href="/services/${s.id}"><div class="service-card__art">${pic(s)}</div><div class="service-card__copy"><span class="eyebrow">0${i+1} / Support</span><h3>${s.name}</h3><p>${s.copy}</p><span class="text-arrow">${arrow}</span></div></a>`;
function header(home=false){const nav=[['Home','/'],['About','/about'],['Pricing','/pricing'],['Services','/services'],['FAQ','/faq'],['Contact us','/contact-us']];const items=nav.map(([label,url])=>`<a href="${url}" ${location.pathname===url?'aria-current="page"':''}>${label}</a>`).join('');return `<header class="site-header ${home?'site-header--home':''}"><a class="site-logo" href="/" aria-label="ParentEase home"><img src="/assets/parentease-logo.png" alt="ParentEase"><img class="site-logo__light" src="/assets/parentease-logo.png" alt="" aria-hidden="true"></a><nav class="desktop-nav" aria-label="Main navigation">${items}</nav><button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button><nav class="mobile-nav" aria-label="Mobile navigation">${items}${link()}</nav></header>`;}
function footer(){return `<footer class="site-footer"><div class="site-footer__top"><div><span class="eyebrow">ParentEase</span><h2>You deserve support,<br><em>too.</em></h2>${link('Begin here')}</div><div class="site-footer__links"><div><span class="eyebrow">Explore</span><a href="/about">Our story</a><a href="/services">What we help with</a><a href="/pricing">Pricing</a></div><div><span class="eyebrow">Get in touch</span><a href="/faq">Questions</a><a href="/contact-us">Contact us</a><a href="/book">Book a session</a></div></div></div><div class="site-footer__bottom"><span>&copy; ${new Date().getFullYear()} ParentEase</span><span>Made with care for the people who care.</span></div></footer>`;}
const heading=(k,t,p='')=>`<div class="section-heading reveal"><span class="eyebrow">${k}</span><h2>${t}</h2>${p?`<p>${p}</p>`:''}</div>`;
const pageHero=(n,t,p)=>{const route=location.pathname.split('/')[1]||'about';const id=route==='services'&&location.pathname.split('/')[2]?location.pathname.split('/')[2]:null;const key=route==='contact-us'?'contact':['about','pricing','services','faq','contact','book'].includes(route)?route:'about';const art=id?`<img class="page-hero__art service-art" src="/assets/service-animations/${id}.webp" alt="" aria-hidden="true">`:`<img class="page-hero__art" src="/assets/page-heroes/${key}.gif" alt="" aria-hidden="true">`;return `<section class="page-hero"><div class="page-hero__inner"><span class="eyebrow">${n} / ParentEase</span><h1>${t}</h1><p>${p}</p></div>${art}</section>`;};
const cta=(t,p)=>`<section class="closing-cta"><span class="eyebrow">A first step</span><h2>${t}</h2><p>${p}</p>${link()}</section>`;
const questions=rows=>`<div class="faq-list">${rows.map(([,q,a],i)=>`<details class="faq-item"><summary><span class="faq-item__number">${String(i+1).padStart(2,'0')}</span><span>${q}</span><span class="faq-item__plus" aria-hidden="true"></span></summary><p>${a}</p></details>`).join('')}</div>`;
const calmArt=`<div class="calm-art" aria-hidden="true"><svg viewBox="0 0 500 170" role="presentation"><path class="calm-art__thread calm-art__thread--back" d="M28 92 C90 92 104 33 168 33 S245 137 312 137 S392 71 472 71"/><path class="calm-art__thread calm-art__thread--front" d="M28 108 C96 108 117 142 174 142 S240 42 310 42 S394 103 472 103"/><circle class="calm-art__point calm-art__point--one" cx="168" cy="33" r="5"/><circle class="calm-art__point calm-art__point--two" cx="312" cy="137" r="5"/><circle class="calm-art__point calm-art__point--three" cx="472" cy="86" r="5"/></svg></div>`;
function home(){return `${header(true)}<main><section class="hero" aria-label="Interactive polar bear scene"><video id="scene" class="hero__video" src="/assets/polar-bears.mp4" poster="/assets/poster.jpg" preload="auto" muted playsinline aria-label="A polar bear and cub in a snowy landscape"></video><canvas id="stars" class="hero__stars" aria-hidden="true"></canvas><a class="hero__book" href="/book"><span>Book my session</span><span class="hero__book-arrow">${arrow}</span></a><div class="hero__fade" aria-hidden="true"></div></section><div class="home-content"><section class="home-intro wide-section"><span class="eyebrow">A softer place to begin</span><h1>For the days you need<br>someone to <em>hold space.</em></h1><p>Parenting asks a lot of you. You deserve a place where your own feelings can take up room.</p><a class="quiet-link" href="/about">Get to know us ${arrow}</a>${calmArt}</section><section class="services-preview wide-section">${heading('The ways we can help','Whatever you are carrying,<br><em>you can start here.</em>','There is no perfect reason to reach out. Explore the kind of support that feels right for you.')}<div class="service-grid">${services.map(card).join('')}</div><a class="quiet-link quiet-link--dark" href="/services">Explore all support ${arrow}</a></section><section class="approach wide-section"><div class="approach__art"><img src="/assets/services/parenting.png" alt="Polar bear and cub walking together" loading="lazy"></div><div>${heading('Our approach','Care that begins<br>with <em>listening.</em>','Support should feel considered, personal, and free of pressure. You can arrive exactly as you are.')}<a class="quiet-link quiet-link--dark" href="/about">More about ParentEase ${arrow}</a></div></section><section class="process wide-section">${heading('A simple beginning','One step at a time.')}<div class="steps"><div><span>01</span><h3>Tell us what is on your mind</h3><p>Choose a topic or start with &ldquo;I am not sure yet.&rdquo;</p></div><div><span>02</span><h3>Share your preferences</h3><p>Let us know how you would like to connect.</p></div><div><span>03</span><h3>Begin a conversation</h3><p>We will make the next step clear when booking opens.</p></div></div></section><section class="home-faq wide-section">${heading('Good to know','Questions are welcome.')}${questions(faq.slice(0,3))}<a class="quiet-link quiet-link--dark" href="/faq">See all questions ${arrow}</a></section>${cta('You do not have to figure<br>it all out <em>alone.</em>','Start with a little space for yourself. The rest can follow.')}</div></main>${footer()}`;}
function about(){return `${header()}<main>${pageHero('01','A little more<br>about <em>us.</em>','ParentEase is being shaped around a simple belief: the people caring for others deserve thoughtful care of their own.')}<section class="story wide-section"><div class="story__quote"><span class="eyebrow">Why we exist</span><p>&ldquo;There should be room for the person behind the parent.&rdquo;</p></div><div class="story__body"><p>Everyday life can ask you to be patient, steady, and available, even when you are running low yourself. We are creating a place to pause, be heard, and find your footing again.</p><p>Our polar bears are a reminder that care can be quiet and close: a presence beside you as you find your own way forward.</p></div></section><section class="values wide-section">${heading('What guides us','A calmer kind of care.')}<div class="value-grid"><article><span>01</span><h3>Room to be human</h3><p>You do not have to show up with the right words or a polished version of your life.</p></article><article><span>02</span><h3>Care with intention</h3><p>We want every part of the experience to feel considered, clear, and respectful of your time.</p></article><article><span>03</span><h3>Support that fits</h3><p>Different people need different kinds of space. Your own experience is where we begin.</p></article></div></section><section class="about-visual wide-section"><img src="/assets/service-animations/anxiety.webp" alt="A polar bear with a worry cloud" loading="lazy"><div>${heading('For you, too','Care does not have to<br>wait until you are <em>empty.</em>')}<p>Whether you are facing something specific or simply want someone to talk to, you are welcome to start the conversation.</p></div></section>${cta('Let this be a<br><em>gentle beginning.</em>','Make a little room for yourself today.')}</main>${footer()}`;}
function pricing(){return `${header()}<main>${pageHero('02','Clear steps.<br><em>No surprises.</em>','We are finalising session options and rates. You will see every detail before confirming a booking.')}<section class="pricing-main wide-section">${heading('Session options','Find the support that fits.','Final session format, availability, and prices will be published here before bookings open.')}<div class="pricing-grid"><article><span class="eyebrow">Individual support</span><h3>For your own space</h3><p>One-to-one conversations focused on what you are carrying as a parent or caregiver.</p><strong>Pricing coming soon</strong><a href="/services">Explore services ${arrow}</a></article><article><span class="eyebrow">Guided beginning</span><h3>Not sure where to start?</h3><p>Share what is on your mind and we will help you understand the next step when appointments become available.</p><strong>Details coming soon</strong><a href="/book">Start an enquiry ${arrow}</a></article></div></section><section class="process wide-section">${heading('How it will work','A thoughtful first step.')}<div class="steps"><div><span>01</span><h3>Choose an area of support</h3><p>Explore topics or tell us you are unsure.</p></div><div><span>02</span><h3>Share a few preferences</h3><p>Let us know what you are looking for.</p></div><div><span>03</span><h3>Review the details</h3><p>See the format and price before deciding.</p></div></div></section>${cta('The right time to begin<br>is <em>your time.</em>','You can start by telling us what you need, without committing to a session.')}</main>${footer()}`;}
function serviceList(){return `${header()}<main>${pageHero('03','Support for<br><em>real life.</em>','The hard days, the changing days, and all the days in between. Find a place to begin.')}<section class="all-services wide-section">${heading('Explore our services','What is on your mind?','You do not need to fit neatly into one category. These are simply places to start the conversation.')}<div class="service-grid">${services.map(card).join('')}</div></section><section class="services-note wide-section"><span class="eyebrow">A gentle reminder</span><h2>You can feel more than one thing at once.</h2><p>We will help you find the support that makes sense for your whole experience.</p></section>${cta('The first step can<br>be <em>small.</em>','Tell us a little about what you are carrying.')}</main>${footer()}`;}
function serviceDetail(s){return `${header()}<main>${pageHero('03 / What we help with',s.name,s.copy)}<section class="service-detail wide-section"><div class="service-detail__art">${pic(s)}</div><div><span class="eyebrow">${s.sub}</span><h2>There is room for<br><em>all of it.</em></h2><p>${s.detail}</p>${link('Begin a conversation')}</div></section><section class="other-services wide-section">${heading('Keep exploring','You may also be looking for...')}<div class="service-grid">${services.filter(x=>x.id!==s.id).slice(0,3).map(card).join('')}</div></section>${cta('Start where you are.<br><em>That is enough.</em>','Your first step does not need to be a big one.')}</main>${footer()}`;}
function faqPage(){return `${header()}<main>${pageHero('04','Questions are<br><em>welcome here.</em>','A little clarity can make the first step feel easier.')}<section class="faq-page wide-section">${[...new Set(faq.map(f=>f[0]))].map(g=>`<div class="faq-group"><div><span class="eyebrow">${g}</span><h2>${g==='Getting started'?'Begin here':g==='Sessions'?'The practical things':'Your peace of mind'}</h2></div>${questions(faq.filter(f=>f[0]===g))}</div>`).join('')}</section>${cta('Still wondering<br>about <em>something?</em>','Send us a note and we will help you find the answer.')}</main>${footer()}`;}
function formFields(){return `<label>Your name<input name="name" type="text" autocomplete="name" required placeholder="What should we call you?"></label><label>Email address<input name="email" type="email" autocomplete="email" required placeholder="you@example.com"></label>`;}
function contact(){return `${header()}<main>${pageHero('05','Come as<br><em>you are.</em>','A question, a thought, or a place to start &mdash; we would love to hear from you.')}<section class="form-layout wide-section"><div><span class="eyebrow">Get in touch</span><h2>Tell us what is<br>on your <em>mind.</em></h2><p>This frontend preview lets you compose a message. Sending will be connected when the ParentEase backend is ready.</p><img src="/assets/service-animations/relationships.webp" alt="A polar bear holding its cub" loading="lazy"></div><form id="contact-form" class="editorial-form">${formFields()}<label>What can we help with?<textarea name="message" required rows="5" placeholder="Begin wherever feels right..."></textarea></label><button type="submit">Preview your message ${arrow}</button><p class="form-note">Preview only &mdash; no message is sent.</p><div class="form-result" role="status" hidden></div></form></section></main>${footer()}`;}
function book(){return `${header()}<main>${pageHero('06','Let us begin<br><em>gently.</em>','Tell us a little about the support you are looking for. You can decide the next step when booking opens.')}<section class="form-layout wide-section"><div><span class="eyebrow">A first conversation</span><h2>There is no perfect<br>way to <em>begin.</em></h2><p>Choose what feels closest. If you are unsure, that is a perfectly good place to start.</p><img src="/assets/service-animations/anxiety.webp" alt="A polar bear with a worry cloud" loading="lazy"></div><form id="booking-form" class="editorial-form"><fieldset><legend>What would you like support with?</legend><div class="choice-grid">${services.map(s=>`<label><input type="radio" name="service" value="${s.name}"><span>${s.name}</span></label>`).join('')}<label><input type="radio" name="service" value="I am not sure yet" checked><span>I am not sure yet</span></label></div></fieldset>${formFields()}<label>Anything you would like us to know? <small>(optional)</small><textarea name="note" rows="4" placeholder="A sentence is enough."></textarea></label><button type="submit">Preview your enquiry ${arrow}</button><p class="form-note">Frontend preview. This does not reserve a session or send your details.</p><div class="form-result" role="status" hidden></div></form></section></main>${footer()}`;}
const path=decodeURIComponent(location.pathname).replace(/\/$/,'')||'/';
const detail=path.startsWith('/services/')?services.find(s=>'/services/'+s.id===path):null;
const pages={'/':home,'/about':about,'/pricing':pricing,'/services':serviceList,'/faq':faqPage,'/contact-us':contact,'/book':book};
document.querySelector('#app').innerHTML=detail?serviceDetail(detail):(pages[path]||(()=>`${header()}${pageHero('404','A little off<br><em>the path.</em>','The page you are looking for is not here.')}${footer()}`))();
document.title=`${detail?detail.name:path==='/'?'A softer place to begin':path.split('/').pop().replaceAll('-',' ').replace(/^./,c=>c.toUpperCase())} | ParentEase`;
document.body.classList.toggle('home-page',path==='/');
const DARK='#082243';
const LIGHT='#a8cdf7';
const WHITE='#ffffff';
const sectionPalette=[LIGHT,DARK,WHITE,DARK];
const waves=[
  'M0 0H1440V54C1210 125 1000 25 760 77S250 119 0 48Z',
  'M0 0H1440V92C1160 12 950 78 740 64S240 25 0 82Z',
  'M0 0H1440V55C1170 47 1010 120 790 91S280 18 0 75Z',
  'M0 0H1440V78C1130 115 970 20 725 67S210 115 0 47Z'
];
function setTheme(element,color){element.classList.add(color===DARK?'theme-dark':'theme-light');element.style.background=color;}
function addCurve(before,from,to,index,extra=''){
  const curve=document.createElement('div');
  curve.className=`section-curve ${extra}`.trim();
  curve.setAttribute('aria-hidden','true');
  curve.style.setProperty('--curve-from',from);
  curve.style.setProperty('--curve-to',to);
  curve.style.setProperty('--curve-height',`${[108,122,98,116][index%waves.length]}px`);
  curve.innerHTML=`<svg viewBox="0 0 1440 140" preserveAspectRatio="none" focusable="false"><path d="${waves[index%waves.length]}"/></svg>`;
  before.before(curve);
}
function themeSections(container,firstColor,home=false){
  const sections=[...container.children].filter(el=>el.tagName==='SECTION');
  setTheme(sections[0],firstColor);
  let previous=firstColor;
  for(const [index,section] of sections.slice(1).entries()){
    const next=sectionPalette[(index+1)%sectionPalette.length];
    section.classList.add('interior-section');
    setTheme(section,next);
    addCurve(section,previous,next,index,home?'section-curve--home':'');
    previous=next;
  }
  const footer=document.querySelector('.site-footer');
  const footerColor=sectionPalette[sections.length%sectionPalette.length];
  setTheme(footer,footerColor);
  addCurve(footer,previous,footerColor,sections.length-1,`section-curve--footer ${home?'section-curve--home':''}`);
}
if(path==='/')themeSections(document.querySelector('.home-content'),LIGHT,true);
else themeSections(document.querySelector('main'),LIGHT);
const siteHeader=document.querySelector('.site-header');
const firstHero=document.querySelector('.hero,.page-hero');
const surfaces=[...document.querySelectorAll('main section,.section-curve,footer')];
function updateHeaderTone(){
  const probe=siteHeader.getBoundingClientRect().top+siteHeader.offsetHeight/2;
  const surface=surfaces.find(el=>{const r=el.getBoundingClientRect();return r.top<=probe&&r.bottom>probe;});
  let dark=surface?.classList.contains('theme-dark')||surface?.classList.contains('hero');
  if(surface?.classList.contains('section-curve')){
    const style=getComputedStyle(surface);
    const position=(probe-surface.getBoundingClientRect().top)/surface.offsetHeight;
    dark=style.getPropertyValue(position<.5?'--curve-from':'--curve-to').trim()===DARK;
  }
  siteHeader.classList.toggle('on-dark',Boolean(dark));
  siteHeader.classList.toggle('is-floating',firstHero.getBoundingClientRect().bottom<100);
}
updateHeaderTone();
window.addEventListener('scroll',updateHeaderTone,{passive:true});
window.addEventListener('resize',updateHeaderTone);
const toggle=document.querySelector('.menu-toggle');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));document.querySelector('.mobile-nav').classList.toggle('is-open',!open);});
const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
for(const form of document.querySelectorAll('#contact-form,#booking-form'))form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const result=form.querySelector('.form-result');result.textContent=`Your ${form.id==='booking-form'?'enquiry':'message'} preview is ready, ${data.get('name')}. Nothing has been sent or booked yet. This form will be connected when the backend is ready.`;result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});});

/* Scroll motion: content floats up into view as it enters, then drifts gently (parallax) while scrolling.
   Elements are tagged automatically; nested matches are skipped so each block animates once. */
(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const targets=[
    ['main .page-hero__inner > *',-22],['main .page-hero__art',36],
    ['main .eyebrow',-10],['main h1',-22],['main h2',-18],['main .faq-item',0],
    ['main .story__quote',-24],['main .steps > *',0],['main .value-grid > *',0],['main .pricing-grid > *',0],['main .choice-grid > *',0],
    ['main .service-detail__art',40],['main .form-layout img',30],['main .editorial-form > *',0],['main .calm-art',26],
    ['main p',-8],['main .book-link',-8],['main .quiet-link',-8],['main h3',-10],
    ['.site-footer h2',-14],['.site-footer .eyebrow',0],['.site-footer .book-link',0],['.site-footer__links > div',0],
  ];
  const skip=el=>el.closest('.hero,.site-header,[data-float]');
  const tagged=[];
  for(const [selector,drift] of targets)for(const el of document.querySelectorAll(selector)){
    if(skip(el))continue;
    el.dataset.float='';el.classList.remove('reveal');
    // Cards in a grid drift at alternating speeds so the rows feel like they are floating.
    const column=el.matches('.service-card,.steps > *,.value-grid > *,.pricing-grid > *')?[...el.parentElement.children].indexOf(el)%3:-1;
    el._drift=column>=0?[-14,22,-6][column]:drift;
    tagged.push(el);
  }
  const reveal=new IntersectionObserver(entries=>{
    const entering=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top||a.boundingClientRect.left-b.boundingClientRect.left);
    entering.forEach((e,i)=>{e.target.style.setProperty('--float-delay',`${Math.min(i,6)*90}ms`);e.target.classList.add('is-in');});
    // Hide again only when it leaves below the fold, so scrolling down replays the motion but scrolling up never blanks the page.
    for(const e of entries)if(!e.isIntersecting&&e.boundingClientRect.top>0)e.target.classList.remove('is-in');
  },{rootMargin:'0px 0px -8% 0px',threshold:.12});
  tagged.forEach(el=>reveal.observe(el));
  const drifting=tagged.filter(el=>el._drift);
  let ticking=false;
  const drift=()=>{
    ticking=false;const h=innerHeight;
    for(const el of drifting){
      const r=el.getBoundingClientRect();
      if(r.bottom<-200||r.top>h+200)continue;
      const offset=((r.top+r.height/2)-h/2)/h;
      el.style.translate=`0 ${(offset*el._drift).toFixed(1)}px`;
    }
  };
  const queue=()=>{if(!ticking){ticking=true;requestAnimationFrame(drift);}};
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);drift();
})();
