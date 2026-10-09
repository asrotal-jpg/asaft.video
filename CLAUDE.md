# asaft.video — Asaf Tal's portfolio

Static site served by GitHub Pages from `docs/` on `main`, custom domain asaft.video (DNS at Porkbun).

- Edit content, CSS and JS in `build.js` (one generator; WORKS/ADS/CREDITS data at the top, CSS and JS as template strings).
- Rebuild with `node build.js` (writes `docs/`), then commit `build.js` and `docs/` together and push to `main`.
- Never edit files in `docs/` by hand; `docs/CNAME` and `docs/.nojekyll` are the only hand-made files there.
- Images and videos are hosted on the Wix media CDN (static.wixstatic.com / video.wixstatic.com) of the free Wix site; keep that site. It is still published (instant-syxqjanvyiqf-asrotal-1407.wix-site-host.com, an old copy of the portfolio), with robots.txt set to `Disallow: /` so it stays out of search engines.
- Exceptions live in `media/` (build.js copies it into `docs/media/`): the moving news poster, rendered by `python3 tools/news_poster.py`, and `og-head-wide.jpg`, the home page share image (1000x525: wide, so WhatsApp shows the full preview with a shorter picture than a square; under about 300px wide WhatsApp falls back to a small thumbnail and cuts the text).
- Hebrew is served at the root, English under `docs/en/`. Interface text is in `UI.he` / `UI.en`, English content in `EN` (keyed by slug). `node build.js [outdir] [blue|yellow]` picks the colour theme; blue (#2b8aff) is live, yellow was the earlier look.
- Every page carries `<meta name="robots" content="noindex">`: the owner doesn't want the site in Google. Don't add a robots.txt Disallow (Google would then never see the noindex).
- Site language is Hebrew (RTL). The owner prefers short Hebrew replies.
