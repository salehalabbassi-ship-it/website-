# NEXA — Design & Engineering Studio

A modern, responsive marketing site for **NEXA**, a design and engineering
studio based in Jeddah, K.S.A., delivering practical solutions from concept to
construction support. Built with plain HTML, CSS, and JavaScript — no build
step, no dependencies.

## Brand

- **Palette:** charcoal `#1f1f1f`, brand gold `#F8D858` (deep gold `#D9A441`
  for legible accents), light gray `#F4F4F4`.
- **Type:** Barlow Condensed (display) + Inter (body).
- **Logo:** the NEXA wordmark (compass "A") in `assets/` — dark version for
  light areas, white version for the dark footer.
- **Tagline:** "Journey of Success".

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup and content |
| `styles.css` | Styling, layout, and responsive rules |
| `script.js`  | Nav, scroll reveals, stat counters, contact form |
| `assets/`    | Logo and favicon images |

## Sections

- **Hero** — positioning, tagline, and a charcoal stat band
- **Services** — Design · Engineering · Project & Support Services
- **Sectors** — the eight sectors NEXA serves
- **Why NEXA** — detail-oriented, flexible pricing, professional, reliable
- **About** — studio intro with Vision & Mission panels and core values
- **Contact** — validated form + studio contact details
- **Footer**

## NEXA Workspace (`/admin`)

A private team tool at `/admin`: Dashboard, Leads, Projects, Proposals (PDF
quotations with 15% VAT), Follow-ups, Templates, Conversations, Analysis and
Settings — Arabic/English, backed by a Google Sheet. It runs in demo mode until
connected. Setup steps: [`admin/README.md`](admin/README.md).

## Run it

No tooling required. Open `index.html` directly, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes

- Fully responsive (desktop → mobile) with an accessible mobile menu.
- Respects `prefers-reduced-motion`.
- The contact form is a front-end demo; wire it to a backend or form service
  (e.g. Formspree) to receive submissions.
- Project imagery and case studies are intentionally not included yet — those
  are planned for a later development pass.
