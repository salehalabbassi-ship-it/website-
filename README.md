# Nexa — Agency Website

A modern, responsive marketing site for **Nexa**, a design & engineering studio.
Built with plain HTML, CSS, and JavaScript — no build step, no dependencies.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup and content |
| `styles.css` | All styling, layout, and responsive rules |
| `script.js`  | Nav, scroll reveals, animated counters, contact form |

## Sections

- **Hero** with animated stat counters
- **Trusted-by** logo marquee
- **Services** — branding, product, development, growth
- **Selected work** — project showcase grid
- **Process** — four-step engagement model
- **About** + client testimonial
- **Contact** — validated form (client-side demo)
- **Footer**

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
  (e.g. Formspree, Netlify Forms) to receive submissions.
