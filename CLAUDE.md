# asaft.video — Asaf Tal's portfolio

Static site served by GitHub Pages from `docs/` on `main`, custom domain asaft.video (DNS at Porkbun).

- Edit content, CSS and JS in `build.js` (one generator; WORKS/ADS/CREDITS data at the top, CSS and JS as template strings).
- Rebuild with `node build.js` (writes `docs/`), then commit `build.js` and `docs/` together and push to `main`.
- Never edit files in `docs/` by hand; `docs/CNAME` and `docs/.nojekyll` are the only hand-made files there.
- Images and videos are hosted on the Wix media CDN (static.wixstatic.com / video.wixstatic.com) of the free Wix site; keep that site.
- Site language is Hebrew (RTL). The owner prefers short Hebrew replies.
