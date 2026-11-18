# Maths Games | Mr Walker Maths

A curated, student-facing directory of 11 original maths games, hosted as a dependency-free static website.

## Version 1

- Eleven approved game cards with concise descriptions, maths topics and course tags.
- Distinct illustrative previews, four incorporating original artwork copied from the source game repositories.
- Responsive layouts: three columns on desktop, two on tablets and one on phones.
- Search matches titles, descriptions, topics and courses. Course and topic filters work together.
- Keyboard navigation, visible focus states, a useful empty-search state and reduced-motion support.
- Games open in new tabs. Cards do not embed any game or require accounts.
- Single source of truth for content: `games.js`.

## Artwork note

`assets/previews/` contains **illustrative promotional artwork, not captured gameplay screenshots**. We can replace these with approved 16:9 screenshots in a future review without changing the application. The Index Shuffle, Shadow Bearings, Snowshift and EQUA//NOVA thumbnails reuse original SVG artwork from those games' repositories.

## Run locally

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a browser. No build step is required.

## Test

```sh
npm test
```

Checks cover all eleven selected games, metadata integrity, asset existence, exclusion of unselected games, and page UI contracts.

## Before publishing

- [ ] Visually check the site at desktop, tablet and phone widths.
- [ ] Verify external game URLs against current production sites, particularly recently migrated custom domains.
- [ ] Decide whether to replace illustrative thumbnails with live gameplay screenshots.
- [ ] Enable GitHub Pages when this pull request has been reviewed and merged.
- [ ] Configure a custom domain only after deciding on the final hostname.

The excluded prototypes Yangzhou and Graphlings are intentionally not listed.
