import { mkdir, writeFile } from 'node:fs/promises';

const out = new URL('../assets/services/', import.meta.url);
await mkdir(out, { recursive: true });

const breathe = '<animateTransform attributeName="transform" type="translate" values="0 0;0 4;0 0" dur="3s" repeatCount="indefinite"/>';
const blink = '<animate attributeName="ry" values="7;7;1;7;7" keyTimes="0;.65;.69;.73;1" dur="4s" repeatCount="indefinite"/>';
const scenarios = {
  anxiety: {
    blob:'#bad0f0',
    back:`<g fill="none" stroke="#294a79" stroke-linecap="round" stroke-linejoin="round">
      <g opacity=".92">
        <path d="M237 112c-28-28 4-59 45-37 57-39 99 30 38 47 38 27-11 55-50 30-29 27-70-12-29-37 14-8 33-14 56-7" stroke-width="4.5" stroke-dasharray="490 490">
          <animate attributeName="stroke-dashoffset" values="0;155;0" dur="2.5s" repeatCount="indefinite"/>
        </path>
        <path d="M240 91c-5 28 89 73 105 18M260 130c63-58 82-29 39 16M263 74c-33 46 22 76 76 66" stroke-width="3.7"/>
        <animateTransform attributeName="transform" type="rotate" values="-7 290 115;7 290 115;-7 290 115" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".72;1;.72" dur="2.5s" repeatCount="indefinite"/>
      </g>
      <path d="M343 103q23-10 32-30M350 124q24-1 39-16" stroke="#527bb0" stroke-width="3" stroke-dasharray="7 8">
        <animate attributeName="opacity" values="0;.9;0" dur="2.5s" repeatCount="indefinite"/>
      </path>
    </g>`,
    face:`<path d="M250 263q13-11 23 0M328 259q12-11 24-1" fill="none" stroke="#163969" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="268" cy="282" rx="7" ry="8" fill="#163969">${blink}</ellipse><ellipse cx="342" cy="279" rx="7" ry="8" fill="#163969">${blink}</ellipse>
      <ellipse cx="308" cy="302" rx="9" ry="7" fill="#163969"/><path d="M306 325q12-10 24 3" fill="none" stroke="#163969" stroke-width="4" stroke-linecap="round"/>`,
    front:`<g stroke="#163969" stroke-width="4" stroke-linecap="round"><path d="M393 222l17-20M405 246l22-5M380 209l5-17"/></g>`
  },
  depression: {
    blob:'#b3c9e7',
    back:`<g><path d="M206 131c-14-14 2-33 19-30 7-31 49-33 58-7 15-15 44-5 44 15 18-3 32 14 25 29Z" fill="#7895bd" opacity=".6"/>
      <g fill="#5d7da7"><ellipse cx="250" cy="158" rx="3" ry="8"><animate attributeName="cy" values="153;177;153" dur="2s" repeatCount="indefinite"/></ellipse><ellipse cx="291" cy="165" rx="3" ry="8"><animate attributeName="cy" values="160;183;160" dur="2.4s" repeatCount="indefinite"/></ellipse></g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="4s" repeatCount="indefinite"/></g>`,
    face:`<path d="M253 280q12 4 24 0M330 277q12 4 24 0" fill="none" stroke="#163969" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="268" cy="290" rx="6" ry="5" fill="#163969">${blink}</ellipse><ellipse cx="343" cy="287" rx="6" ry="5" fill="#163969">${blink}</ellipse>
      <ellipse cx="309" cy="307" rx="9" ry="7" fill="#163969"/><path d="M304 330q15-8 27 1" fill="none" stroke="#163969" stroke-width="4" stroke-linecap="round"/>`,
    front:`<path d="M397 317q19-15 22 5-3 20-22 23-16-7-15-21 1-12 15-7Z" fill="#d7e7f5" stroke="#567cab" stroke-width="3"><animate attributeName="opacity" values=".35;.9;.35" dur="3s" repeatCount="indefinite"/></path>`
  },
  stress: {
    blob:'#c2d9f3',
    back:`<g fill="none" stroke="#5b86bb" stroke-width="5" stroke-linecap="round"><path d="M128 229q-24-18 1-37t0-37"><animate attributeName="opacity" values=".2;1;.2" dur="2.1s" repeatCount="indefinite"/></path><path d="M465 235q24-18-1-37t0-37"><animate attributeName="opacity" values="1;.2;1" dur="2.5s" repeatCount="indefinite"/></path><path d="M152 331q-31-13-9-35M448 336q30-13 9-35"/></g>`,
    face:`<path d="M251 277q15 9 30-1M328 274q15 9 30-1" fill="none" stroke="#163969" stroke-width="4" stroke-linecap="round"/><ellipse cx="308" cy="303" rx="9" ry="7" fill="#163969"/><path d="M297 326q13 10 26 0" fill="none" stroke="#163969" stroke-width="4" stroke-linecap="round"/>`,
    front:`<g fill="none" stroke="#6589b3" stroke-width="3" stroke-linecap="round"><path d="M327 335q26-18 47 0"><animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/></path><path d="M337 346q37-11 52 7"><animate attributeName="opacity" values="0;.8;0" dur="3s" repeatCount="indefinite"/></path></g>`
  },
  relationships: {
    blob:'#bcd4ef',
    back:`<g fill="#5079ad" opacity=".55"><path d="M132 350q8-75 20-93 14 24 10 96M167 350q25-58 44-57 5 38-15 60"/></g>`,
    face:`<ellipse cx="268" cy="283" rx="7" ry="7" fill="#163969">${blink}</ellipse><ellipse cx="342" cy="280" rx="7" ry="7" fill="#163969">${blink}</ellipse><ellipse cx="307" cy="301" rx="9" ry="7" fill="#163969"/><path d="M300 321q15 19 32 0" fill="none" stroke="#163969" stroke-width="4" stroke-linecap="round"/>`,
    front:`<g transform="translate(392 316)"><path d="M0 13c-22-27-51 4 0 37 51-33 22-64 0-37Z" fill="#9cbce2" stroke="#163969" stroke-width="4"><animate attributeName="fill" values="#9cbce2;#e3a9b8;#9cbce2" dur="3s" repeatCount="indefinite"/></path><animateTransform attributeName="transform" type="translate" values="392 316;392 311;392 316" dur="3s" repeatCount="indefinite"/></g>`
  },
  adhd: {
    blob:'#b9d3f1',
    back:`<g fill="none" stroke="#5783b8" stroke-width="3" opacity=".7"><path d="M142 390q-28-58 2-90M463 390q23-54-9-86"/></g>`,
    face:`<ellipse cx="268" cy="283" rx="7" ry="7" fill="#163969">${blink}</ellipse><ellipse cx="342" cy="280" rx="7" ry="7" fill="#163969">${blink}</ellipse><ellipse cx="307" cy="302" rx="9" ry="7" fill="#163969"/><path d="M299 323q14 17 31 0" fill="none" stroke="#163969" stroke-width="4" stroke-linecap="round"/>`,
    front:`<g fill="none" stroke="#315d94" stroke-width="4" stroke-linecap="round"><path d="M215 118q14-26 30 0t30 0 30 0 30 0 30 0"><animate attributeName="opacity" values=".3;1;.3" dur="2.3s" repeatCount="indefinite"/></path><path d="M429 218q17-23 28-2t20-4"><animateTransform attributeName="transform" type="translate" values="0 0;5 -4;0 0" dur="2s" repeatCount="indefinite"/></path></g>`
  },
  trauma: {
    blob:'#bbd5f2',
    back:`<g fill="none" stroke="#6b96c5" stroke-width="4"><ellipse cx="300" cy="409" rx="110" ry="24"/><ellipse cx="300" cy="409" rx="80" ry="14"><animate attributeName="rx" values="60;105;60" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;.2;1" dur="3s" repeatCount="indefinite"/></ellipse></g>`,
    face:`<ellipse cx="268" cy="281" rx="7" ry="7" fill="#163969">${blink}</ellipse><ellipse cx="342" cy="278" rx="7" ry="7" fill="#163969">${blink}</ellipse><ellipse cx="307" cy="300" rx="9" ry="7" fill="#163969"/><path d="M299 322q14 13 30 0" fill="none" stroke="#163969" stroke-width="4" stroke-linecap="round"/>`,
    front:`<g transform="translate(396 302)"><path d="M0 16c-20-30-52-2 0 38 52-40 20-68 0-38Z" fill="#e4edf9" stroke="#315d94" stroke-width="4"/><path d="M1 14l-9 17 11 7-5 11" fill="none" stroke="#315d94" stroke-width="3"/><path d="M-7 31l9 4" fill="none" stroke="#8caed5" stroke-width="3"><animate attributeName="opacity" values="0;1;0" dur="3.4s" repeatCount="indefinite"/></path><animateTransform attributeName="transform" type="translate" values="396 302;396 298;396 302" dur="3.4s" repeatCount="indefinite"/></g>`
  }
};

function svg(c){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 520" width="600" height="520">
    <path d="M33 373C9 326 50 238 119 167S239 45 327 56c69 9 102 75 161 120 63 48 94 104 80 178-12 63-45 115-118 127H151C81 472 46 421 33 373Z" fill="${c.blob}"/>
    <ellipse cx="304" cy="438" rx="195" ry="31" fill="#7294c0" opacity=".48"/>
    <g fill="#5779a8" opacity=".76"><path d="M118 423q-43-47-23-84 30 2 39 61-7-83 14-100 31 19 15 95 19-51 47-47 9 43-24 75Z"/></g>
    ${c.back}
    <g transform="translate(106 135) scale(.65)"><g>${breathe}
      <path d="M219 340c-20 30-28 72-18 94 13 24 38 22 65 13h94c27 9 52 11 65-13 10-22 2-64-18-94-27-39-59-54-94-54s-67 15-94 54Z" fill="#fffdfa" stroke="#163969" stroke-width="5" stroke-linejoin="round"/>
      <ellipse cx="305" cy="372" rx="83" ry="73" fill="#fffdfa" stroke="#163969" stroke-width="5"/>
      <ellipse cx="227" cy="210" rx="33" ry="34" fill="#fffdfa" stroke="#163969" stroke-width="5"/><ellipse cx="375" cy="202" rx="33" ry="34" fill="#fffdfa" stroke="#163969" stroke-width="5"/>
      <ellipse cx="227" cy="210" rx="13" ry="15" fill="#c9dcf5"/><ellipse cx="375" cy="202" rx="13" ry="15" fill="#c9dcf5"/>
      <path d="M210 240c6-54 42-88 94-89 58-2 99 35 103 88 6 72-42 113-103 114-59 1-103-43-94-113Z" fill="#fffdfa" stroke="#163969" stroke-width="5"/>
      <path d="M224 241q-20-5-28 17" fill="none" stroke="#163969" stroke-width="5" stroke-linecap="round"/>
      ${c.face}
      <path d="M233 365c-24-4-33 28-21 57 10 24 34 30 56 18 18-10 27-34 13-54-12-18-32-20-48-21Z" fill="#fffdfa" stroke="#163969" stroke-width="5"><animateTransform attributeName="transform" type="rotate" values="-2 244 394;3 244 394;-2 244 394" dur="3s" repeatCount="indefinite"/></path>
      <path d="M371 362c24-4 37 26 25 57-10 25-35 30-57 19-18-9-27-33-15-54 10-18 31-20 47-22Z" fill="#fffdfa" stroke="#163969" stroke-width="5"><animateTransform attributeName="transform" type="rotate" values="2 357 393;-3 357 393;2 357 393" dur="3s" repeatCount="indefinite"/></path>
      <ellipse cx="258" cy="432" rx="43" ry="26" fill="#fffdfa" stroke="#163969" stroke-width="5"/><ellipse cx="349" cy="432" rx="43" ry="26" fill="#fffdfa" stroke="#163969" stroke-width="5"/>
    </g></g>
    ${c.front}
  </svg>`;
}
for(const [id,c] of Object.entries(scenarios))await writeFile(new URL(`${id}.svg`,out),svg(c));

const pageScenes={
  about:{
    ...scenarios.relationships,
    back:`<path d="M203 143q-46-44-62 8-7 29 15 48" fill="none" stroke="#6d95c2" stroke-width="9" stroke-linecap="round"/><path d="M400 142q46-44 62 8 7 29-15 48" fill="none" stroke="#6d95c2" stroke-width="9" stroke-linecap="round"/>`,
    front:`<g transform="translate(401 322)"><path d="M0 9c-16-22-39 4 0 31 39-27 16-53 0-31Z" fill="#f4f8ff" stroke="#315d94" stroke-width="4"/><animateTransform attributeName="transform" type="translate" values="401 322;401 317;401 322" dur="3s" repeatCount="indefinite"/></g>`
  },
  pricing:{
    ...scenarios.adhd,
    back:`<g transform="translate(390 95)"><rect x="0" y="0" width="95" height="125" rx="10" fill="#eef7ff" stroke="#315d94" stroke-width="4"/><path d="M19 35h55M19 57h55M19 79h38" stroke="#779dca" stroke-width="5" stroke-linecap="round"/><path d="m18 103 9 8 15-18" fill="none" stroke="#315d94" stroke-width="5" stroke-linecap="round"/><animateTransform attributeName="transform" type="translate" values="390 95;390 89;390 95" dur="3s" repeatCount="indefinite"/></g>`,
    front:''
  },
  services:{
    ...scenarios.relationships,
    back:`<g fill="#eef7ff" stroke="#315d94" stroke-width="3"><circle cx="205" cy="145" r="24"><animate attributeName="cy" values="145;138;145" dur="3s" repeatCount="indefinite"/></circle><circle cx="302" cy="99" r="24"><animate attributeName="cy" values="99;93;99" dur="2.7s" repeatCount="indefinite"/></circle><circle cx="400" cy="145" r="24"><animate attributeName="cy" values="145;138;145" dur="3.3s" repeatCount="indefinite"/></circle></g>`,
    front:''
  },
  faq:{
    ...scenarios.anxiety,
    back:`<g transform="translate(374 94)"><path d="M2 16q0-16 17-16h82q17 0 17 16v66q0 16-17 16H55l-21 18 2-18H19Q2 98 2 82Z" fill="#eef7ff" stroke="#315d94" stroke-width="4"/><path d="M42 37q0-19 21-19 21 0 21 17 0 14-18 20v8" fill="none" stroke="#315d94" stroke-width="5" stroke-linecap="round"/><circle cx="65" cy="78" r="4" fill="#315d94"/><animateTransform attributeName="transform" type="translate" values="374 94;374 88;374 94" dur="3s" repeatCount="indefinite"/></g>`,
    front:''
  },
  contact:{
    ...scenarios.relationships,
    back:`<g transform="translate(381 111)"><rect width="125" height="87" rx="8" fill="#eef7ff" stroke="#315d94" stroke-width="4"/><path d="m3 12 59 45 59-45" fill="none" stroke="#315d94" stroke-width="4"/><animateTransform attributeName="transform" type="translate" values="381 111;381 104;381 111" dur="3s" repeatCount="indefinite"/></g>`,
    front:''
  },
  book:{
    ...scenarios.relationships,
    back:`<g transform="translate(391 99)"><rect width="106" height="105" rx="11" fill="#eef7ff" stroke="#315d94" stroke-width="4"/><path d="M0 30h106M25-8v18M81-8v18" stroke="#315d94" stroke-width="5" stroke-linecap="round"/><circle cx="55" cy="65" r="13" fill="#7ca9d6"><animate attributeName="r" values="11;16;11" dur="3s" repeatCount="indefinite"/></circle><animateTransform attributeName="transform" type="translate" values="391 99;391 94;391 99" dur="3s" repeatCount="indefinite"/></g>`,
    front:''
  }
};
const heroOut=new URL('../assets/page-heroes/',import.meta.url);
await mkdir(heroOut,{recursive:true});
for(const [id,c] of Object.entries(pageScenes))await writeFile(new URL(`${id}.svg`,heroOut),svg(c));
