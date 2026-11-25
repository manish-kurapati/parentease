# ParentEase frontend

Run locally:

```powershell
npm install
npm run dev
```

Open <http://127.0.0.1:4173/>.

Vercel deploys the frontend as a static site using `vercel.json`. The local Node server is only for development; Vercel does not need a server function or a build command.

Routes: `/`, `/about`, `/pricing`, `/services`, `/faq`, `/contact-us`, `/book`, and six individual routes under `/services/`.

The booking and contact forms validate and preview entries in the browser. They do not submit data, reserve sessions, or take payment. Pricing and availability are placeholders until confirmed.

The six active service animations are the supplied transparent WebP files in `assets/service-animations/`. The older SVG, PNG, and GIF assets in `assets/services/` remain available to the illustration scripts (`npm run art:svg` and `npm run art:gif`).

Check routes/layout with `npm run test:layout` and interactions with `npm run test:interactions`.
