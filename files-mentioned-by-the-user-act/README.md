# Hosting Stack UK

A production-ready first version of a static affiliate information website about WordPress hosting. The homepage is complete; the remaining pages are functional foundations for later editorial and legal content. The site uses semantic HTML, modern CSS and a small amount of vanilla JavaScript—no package manager, build step or server is required.

## Project structure

```text
.
├── index.html
├── kinsta-review.html
├── wordpress-hosting-guide.html
├── about.html
├── affiliate-disclosure.html
├── privacy-policy.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── images/.gitkeep
```

## Run locally

Open `index.html` directly in a browser, or serve the directory so routing and browser tooling behave like production:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. No dependencies need to be installed.

## Publish with GitHub Pages

1. Push the files to a GitHub repository.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the branch containing the site and the `/ (root)` folder, then save.
5. After GitHub provides the public address, complete every item in “Before launch” below.

All internal links are relative, so the site works in a GitHub Pages project repository as well as at a custom domain.

## Customisation

- **Brand and tagline:** search all HTML files and this README for `Hosting Stack UK` and the current tagline. The brand is deliberately plain text so it is easy to replace.
- **Colours, spacing and radii:** edit custom properties at the top of `assets/css/styles.css`.
- **Typography:** change `--font` and the type-scale properties in `:root`. If using another web font, update the font request in `index.html` and add the same request to inner pages, or self-host optimised font files.
- **Images:** add compressed `.avif` with `.webp` fallbacks to `assets/images/`. Use `<picture>`, meaningful `alt` text for informative images, empty `alt` text for decorative images, and explicit dimensions or `aspect-ratio` to prevent layout shift.
- **Kinsta affiliate URL:** the homepage contains an HTML comment beside “Read the Full Kinsta Review”. Replace the internal URL only after an approved affiliate link is supplied. Add appropriate link attributes according to the affiliate programme’s current requirements.

## Before launch

Replace every `https://example.com` placeholder with the final HTTPS domain:

- Update the canonical link in every HTML file.
- Update all `<loc>` values in `sitemap.xml`.
- Update the sitemap address in `robots.txt`.
- If hosted in a GitHub Pages project subdirectory, include that path in canonical and sitemap URLs.

Also:

- Replace starter comments with researched content on the review, guide and About pages.
- Have the privacy policy, affiliate disclosure and other legal wording reviewed for the actual business, location, services and data practices.
- Add any required Open Graph image metadata only after a real social image exists.
- Do not publish the contact form as working until a form service is configured.

## Connect the contact form

GitHub Pages cannot process forms. Create a form with Formspree or another reputable static-form provider, then replace the empty `action` value in `contact.html` with the provider’s HTTPS endpoint. Keep `method="post"`, retain native `required` and input types, test success and error paths, add spam protection if needed, and update the privacy policy to identify the processor and retention practice. Do not add a simulated JavaScript success message.

## Testing

- Test at 320px, common phone widths, tablet, laptop and large desktop sizes using browser responsive mode.
- Navigate every page and mobile-menu control using only a keyboard. Check Escape, focus visibility, focus order and menu focus containment.
- Enable reduced motion in the operating system and confirm that content appears without entrance movement.
- Disable JavaScript and confirm that all content and desktop navigation remain readable and usable.
- Check all internal links and inspect the browser console for errors.
- Run Lighthouse in Chrome DevTools in a production-like local-server session. Audit Performance, Accessibility, Best Practices and SEO on the homepage and representative inner pages. Record actual results rather than assuming target scores.

The intended Lighthouse targets are 95+ for Performance and Accessibility, and 100 for Best Practices and SEO, but no exact score is claimed by this repository.
