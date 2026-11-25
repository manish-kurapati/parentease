// Generates the animated service illustrations in assets/service-art/.
// Pure SVG + CSS animation, so they play in every browser (including Safari/iOS)
// when used as a plain <img>. Run: node scripts/make-service-motion.mjs
import { mkdir, writeFile } from 'node:fs/promises';

const out = new URL('../assets/service-art/', import.meta.url);
await mkdir(out, { recursive: true });

const O = '#10294d';      // outline
const W = '#fbfdff';      // fur
const BL = '#a9c8f0';     // blush / inner ear
const BLOB = '#b5d0ef';   // backdrop
const SH = '#8fb5e3';     // ground shadow
const ACC = '#5f93d6';    // accent blue

const blob = `<path d="M200 24C256 24 288 78 320 136C352 194 392 248 381 310C370 366 318 380 200 380C82 380 30 366 19 310C8 248 48 194 80 136C112 78 144 24 200 24Z" fill="${BLOB}"/>`;
const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="8" fill="${SH}" opacity=".75"/>`;
const limb = (d, w = 13) => `<path d="${d}" fill="none" stroke="${O}" stroke-width="${w + 7}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${W}" stroke-width="${w}" stroke-linecap="round"/>`;
const line = (d, sw = 3.4, color = O) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

// Facial features, in bear-local coordinates (origin = ground under the bear).
const eyesOpen = `<g class="blink"><ellipse cx="-18" cy="-125" rx="4.6" ry="5.6" fill="${O}"/><ellipse cx="18" cy="-125" rx="4.6" ry="5.6" fill="${O}"/></g>`;
const nose = `<ellipse cx="0" cy="-113" rx="5.2" ry="3.8" fill="${O}"/>`;
const faces = {
  worried: `${line('M-27 -139q8-6 15-2M12 -141q7-4 15 2', 3)}${eyesOpen}${nose}${line('M-6 -101q6-5 12 0', 3)}`,
  calm: `${line('M-23 -125q5 4 10 0M13 -125q5 4 10 0', 3.2)}${nose}${line('M-5 -104q5 4 10 0', 3)}`,
  happy: `${line('M-23 -123q5-6 10 0M13 -123q5-6 10 0', 3.2)}${nose}${line('M-6 -104q6 6 12 0', 3)}`,
  sad: `${line('M-23 -126q5 4 10 0M13 -126q5 4 10 0', 3.2)}${line('M-26 -136q7-2 13-7M13 -143q6 5 13 7', 2.6)}${nose}${line('M-6 -100q6-5 12 0', 3)}`,
  soft: `${line('M-26 -138q8-4 14-1M12 -139q6-3 14 1', 2.6)}<g class="blink"><ellipse cx="-18" cy="-123" rx="4.4" ry="5" fill="${O}"/><ellipse cx="18" cy="-123" rx="4.4" ry="5" fill="${O}"/></g>${nose}${line('M-5 -102q5-3 10 0', 3)}`,
  looking: `<g class="glance"><ellipse cx="-18" cy="-125" rx="4.6" ry="5.6" fill="${O}"/><ellipse cx="18" cy="-125" rx="4.6" ry="5.6" fill="${O}"/></g>${nose}${line('M-4 -103q4 2 8 0', 3)}`,
};

// A sitting bear. `face` may be a key of `faces` or raw markup; `arms` replaces the default knee-hug.
function bear({ x, y, s = 1, face = 'calm', arms, extra = '', cls = 'breathe' }) {
  const f = faces[face] ?? face;
  const a = arms ?? limb('M-42 -70Q-40 -38 -14 -36') + limb('M42 -70Q40 -38 14 -36');
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}">
    <path d="M-52 -12C-60 -62 -40 -98 0 -98S60 -62 52 -12C48 0 -48 0 -52 -12Z" fill="${W}" stroke="${O}" stroke-width="3.6"/>
    <ellipse cx="-25" cy="-9" rx="22" ry="13" fill="${W}" stroke="${O}" stroke-width="3.6"/>
    <ellipse cx="25" cy="-9" rx="22" ry="13" fill="${W}" stroke="${O}" stroke-width="3.6"/>
    ${a}
    <circle cx="-40" cy="-162" r="16" fill="${W}" stroke="${O}" stroke-width="3.6"/><circle cx="-40" cy="-162" r="8" fill="${BL}"/>
    <circle cx="40" cy="-162" r="16" fill="${W}" stroke="${O}" stroke-width="3.6"/><circle cx="40" cy="-162" r="8" fill="${BL}"/>
    <ellipse cx="0" cy="-124" rx="57" ry="48" fill="${W}" stroke="${O}" stroke-width="3.6"/>
    <ellipse cx="-34" cy="-110" rx="9" ry="6" fill="${BL}" opacity=".85"/><ellipse cx="34" cy="-110" rx="9" ry="6" fill="${BL}" opacity=".85"/>
    ${f}${extra}
  </g></g>`;
}

// Thought cloud with trailing bubbles, centred on (cx, cy). Trail drifts toward the bear's head.
const cloud = (cx, cy, inner = '', fill = W) => `<g transform="translate(${cx} ${cy})"><g class="float">
  <circle cx="10" cy="46" r="6" fill="${fill}" stroke="${O}" stroke-width="3"/><circle cx="18" cy="62" r="3.6" fill="${fill}" stroke="${O}" stroke-width="2.6"/>
  <path d="M-40 24C-64 24 -66 -6 -44 -10C-46 -33 -17 -42 -5 -27C3 -46 36 -44 39 -21C62 -23 68 9 47 22C40 27 -30 27 -40 24Z" fill="${fill}" stroke="${O}" stroke-width="3.2"/>
  ${inner}</g></g>`;

const heart = (cls = '') => `<path class="${cls}" d="M0 10C-18 -2 -22 -14 -14 -21C-8 -26 -2 -22 0 -16C2 -22 8 -26 14 -21C22 -14 18 -2 0 10Z" fill="${ACC}" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>`;

const baseCss = `
  .breathe{animation:breathe 3.4s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}
  .float{animation:float 4s ease-in-out infinite alternate}
  .blink{animation:blink 5s infinite;transform-box:fill-box;transform-origin:center}
  @keyframes breathe{to{transform:scale(1.012,1.03)}}
  @keyframes float{to{transform:translateY(-5px)}}
  @keyframes blink{0%,90%,100%{transform:scaleY(1)}93%{transform:scaleY(.1)}}
  @media (prefers-reduced-motion:reduce){*{animation:none!important}}`;

const svg = (body, css) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-hidden="true">
<style>${baseCss}${css}</style>
${blob}
${body}
</svg>
`;

const art = {
  // Tangled thoughts slowly unravel into calm waves; the bear's eyes close as it settles.
  anxiety: svg(`
    ${shadow(200, 320, 72)}
    ${cloud(196, 82, `
      <path class="tangle" d="M-24 2C-20 -18 10 -18 14 -4S-8 14 -14 2S4 -22 22 -10S20 16 4 10S-4 -12 10 -12" fill="none" stroke="${O}" stroke-width="2.6" stroke-linecap="round"/>
      <g class="waves">${line('M-28 -6q8-7 16 0t16 0t16 0', 2.8, ACC)}${line('M-20 6q8-7 16 0t16 0', 2.8, BL)}</g>`)}
    ${bear({ x: 200, y: 318, face: `<g class="awake">${faces.worried}</g><g class="settled">${faces.calm}</g>` })}
    <g class="ticks">${line('M266 168l14-14M274 190l18-4M258 150l4-16', 3.2)}</g>`, `
    .tangle{animation:tangle 7s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
    .waves,.settled{animation:settle 7s ease-in-out infinite;opacity:0}
    .awake,.ticks{animation:awake 7s ease-in-out infinite}
    .ticks{animation-name:jitter}
    @keyframes tangle{0%{opacity:1;transform:rotate(-8deg)}12%{transform:rotate(8deg)}24%{transform:rotate(-6deg)}36%{opacity:1;transform:rotate(4deg)}48%,86%{opacity:0;transform:rotate(0) scale(.6)}100%{opacity:1;transform:rotate(-8deg)}}
    @keyframes settle{0%,38%{opacity:0}52%,84%{opacity:1}96%,100%{opacity:0}}
    @keyframes awake{0%,38%{opacity:1}50%,86%{opacity:0}98%,100%{opacity:1}}
    @keyframes jitter{0%,8%,16%,24%,32%{opacity:1}4%,12%,20%,28%{opacity:.35}42%,90%{opacity:0}100%{opacity:1}}`),

  // A tired bear lies flat and breathes slowly while stress marks flicker above.
  stress: svg(`
    ${shadow(205, 322, 112)}
    <g class="breathe">
      <ellipse cx="288" cy="304" rx="27" ry="17" fill="${W}" stroke="${O}" stroke-width="3.6"/>
      <ellipse cx="226" cy="286" rx="80" ry="36" fill="${W}" stroke="${O}" stroke-width="3.6"/>
      <circle cx="116" cy="244" r="15" fill="${W}" stroke="${O}" stroke-width="3.6"/><circle cx="116" cy="244" r="7.5" fill="${BL}"/>
      <circle cx="180" cy="236" r="15" fill="${W}" stroke="${O}" stroke-width="3.6"/><circle cx="180" cy="236" r="7.5" fill="${BL}"/>
      <ellipse cx="150" cy="278" rx="52" ry="42" fill="${W}" stroke="${O}" stroke-width="3.6"/>
      <ellipse cx="122" cy="292" rx="9" ry="6" fill="${BL}" opacity=".85"/><ellipse cx="182" cy="289" rx="9" ry="6" fill="${BL}" opacity=".85"/>
      ${line('M124 280q7 4 14 0M162 277q7 4 14 0', 3.2)}
      <ellipse cx="152" cy="291" rx="5" ry="3.6" fill="${O}"/>
      ${line('M146 303q6-3 12 0', 3)}
      <ellipse cx="128" cy="318" rx="22" ry="9" fill="${W}" stroke="${O}" stroke-width="3.6"/>
      <ellipse cx="174" cy="318" rx="22" ry="9" fill="${W}" stroke="${O}" stroke-width="3.6"/>
    </g>
    <g class="marks">${line('M124 208l-8-13', 3.6)}${line('M150 200v-16', 3.6)}${line('M176 208l8-13', 3.6)}</g>`, `
    .marks path{animation:mark 2.4s ease-in-out infinite}
    .marks path:nth-child(2){animation-delay:.25s}.marks path:nth-child(3){animation-delay:.5s}
    .breathe{animation-duration:4s}
    @keyframes mark{0%,100%{opacity:.15;transform:translateY(3px)}40%,60%{opacity:1;transform:translateY(0)}}`),

  // A big bear holds a little one close; a heart rises and pulses between them.
  relationships: svg(`
    ${shadow(212, 320, 108)}
    <g transform="translate(212 92)"><g class="heart">${heart()}</g></g>
    ${bear({ x: 168, y: 318, face: 'happy', arms: limb('M-42 -70Q-40 -38 -14 -36') + limb('M40 -66C74 -62 108 -50 136 -44') })}
    ${bear({ x: 270, y: 318, s: 0.62, face: 'happy', cls: 'lean' })}`, `
    .heart{animation:pulse 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
    .lean{animation:lean 3.4s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}
    @keyframes pulse{0%,100%{transform:translateY(4px) scale(.88)}45%{transform:translateY(-6px) scale(1.12)}60%{transform:translateY(-6px) scale(1)}}
    @keyframes lean{to{transform:rotate(-5deg)}}`),

  // Busy mind: a brain in a thought cloud, sparks firing around it, eyes glancing side to side.
  adhd: svg(`
    ${shadow(200, 320, 72)}
    ${cloud(196, 82, `<path d="M0 -15C-20 -20 -29 -4 -21 6C-23 17 -6 20 0 14C6 20 23 17 21 6C29 -4 20 -20 0 -15ZM0 -15V14M-13 -5q6 4 0 9M13 -5q-6 4 0 9" fill="${BL}" stroke="${O}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`)}
    <g class="sparks">${line('M248 52l9-12', 3.2)}${line('M258 72l14-3', 3.2)}${line('M240 38l1-14', 3.2)}</g>
    ${bear({ x: 200, y: 318, face: 'looking' })}`, `
    .sparks path{animation:spark 1.8s ease-in-out infinite}
    .sparks path:nth-child(2){animation-delay:.3s}.sparks path:nth-child(3){animation-delay:.6s}
    .glance{animation:glance 4.5s ease-in-out infinite}
    @keyframes spark{0%,100%{opacity:0}30%,60%{opacity:1}}
    @keyframes glance{0%,18%{transform:translateX(0)}26%,44%{transform:translateX(-5px)}52%,70%{transform:translateX(5px)}78%,100%{transform:translateX(0)}}`),

  // A bear holds a small teddy and rocks gently; a heart glows softly in the thought cloud.
  trauma: svg(`
    ${shadow(200, 320, 72)}
    ${cloud(196, 82, `<g transform="translate(0 2) scale(.95)"><g class="glow">${heart()}</g></g>`)}
    ${bear({ x: 200, y: 318, face: 'soft', cls: 'rock', arms: `
      <g transform="translate(0 -44) scale(1.35)">
        <circle cx="-10" cy="-14" r="5" fill="${BL}" stroke="${O}" stroke-width="2.6"/><circle cx="10" cy="-14" r="5" fill="${BL}" stroke="${O}" stroke-width="2.6"/>
        <ellipse cx="0" cy="12" rx="15" ry="13" fill="${BL}" stroke="${O}" stroke-width="2.6"/>
        <circle cx="0" cy="-4" r="13" fill="${BL}" stroke="${O}" stroke-width="2.6"/>
        <circle cx="-4" cy="-6" r="1.6" fill="${O}"/><circle cx="4" cy="-6" r="1.6" fill="${O}"/><ellipse cx="0" cy="-1" rx="2.2" ry="1.6" fill="${O}"/>
      </g>
      ${limb('M-44 -74Q-40 -44 -22 -38')}${limb('M44 -74Q40 -44 22 -38')}` })}`, `
    .rock{animation:rock 4s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}
    .glow{animation:glow 3s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
    @keyframes rock{from{transform:rotate(-2deg)}to{transform:rotate(2deg)}}
    @keyframes glow{0%,100%{transform:scale(.9);opacity:.75}50%{transform:scale(1.08);opacity:1}}`),

  // A bear sits on a bench under a small rain cloud; drops fall slowly.
  depression: svg(`
    ${shadow(200, 340, 104)}
    <g fill="${W}" stroke="${O}" stroke-width="3.4" stroke-linejoin="round">
      <rect x="112" y="234" width="176" height="12" rx="5"/><rect x="112" y="256" width="176" height="12" rx="5"/>
      <rect x="124" y="300" width="9" height="38" rx="3"/><rect x="267" y="300" width="9" height="38" rx="3"/>
    </g>
    ${bear({ x: 200, y: 304, face: 'sad' })}
    <rect x="104" y="292" width="192" height="13" rx="5" fill="${W}" stroke="${O}" stroke-width="3.4"/>
    <g transform="translate(200 62)"><g class="float">
      <path d="M-40 24C-64 24 -66 -6 -44 -10C-46 -33 -17 -42 -5 -27C3 -46 36 -44 39 -21C62 -23 68 9 47 22C40 27 -30 27 -40 24Z" fill="#e3ecf8" stroke="${O}" stroke-width="3.2"/>
      <g class="rain" fill="${ACC}">
        <path d="M-22 34c-4 6-4 10 0 10s4-4 0-10Z"/><path d="M0 34c-4 6-4 10 0 10s4-4 0-10Z"/><path d="M22 34c-4 6-4 10 0 10s4-4 0-10Z"/>
      </g>
    </g></g>`, `
    .rain path{animation:drop 2.1s ease-in infinite;opacity:0}
    .rain path:nth-child(2){animation-delay:.7s}.rain path:nth-child(3){animation-delay:1.4s}
    .breathe{animation-duration:4.6s}
    @keyframes drop{0%{opacity:0;transform:translateY(0)}15%{opacity:1}80%{opacity:.8}100%{opacity:0;transform:translateY(20px)}}`),
};

for (const [id, markup] of Object.entries(art)) {
  await writeFile(new URL(`${id}.svg`, out), markup);
}
console.log(`Wrote ${Object.keys(art).length} illustrations to assets/service-art/`);
