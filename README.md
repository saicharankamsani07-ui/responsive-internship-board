# Internship Explorer — Responsive Internship Board

A beginner-friendly, accessible internship listing website made with **HTML, CSS, and vanilla JavaScript** (no frameworks).

> **Note:** All internship records are fictional demonstration data, not real vacancies.

## Features
- Semantic HTML structure, visible form labels, and skip-to-content link
- Responsive cards for desktop, tablet, and mobile
- Live search by role, company, or location
- Domain dropdown populated from JSON data
- Clear-filters button
- Loading, empty-results, and fetch-error states with retry
- Keyboard-operable controls, visible focus styles, and live result count
- Safe DOM rendering with `textContent`

## Project files
```
index.html
style.css
script.js
internships.json
screenshots/
README.md
```

## Run locally
The project fetches a local JSON file, so **do not open `index.html` using `file://`**.

**VS Code:** Install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

**Alternative:** In this folder, run `python -m http.server 8000` and visit `http://localhost:8000`.

## How to test
1. Type `Python` in search; only matching listings should appear.
2. Select `Data Science`; only that domain should appear.
3. Search for `zzzzzzz`; the empty state should appear.
4. Select **Clear filters**; all internships should reappear.
5. Press Tab to navigate the controls and cards; press Enter/Space to activate buttons.
6. Resize the browser to phone, tablet, and desktop widths.
7. To test the error state, temporarily rename `internships.json` and refresh; restore the file to recover.

## Screenshots
Add your own screenshots after running the site:

**Desktop**
![Desktop screenshot](screenshots/desktop.png)

**Mobile**
![Mobile screenshot](screenshots/mobile.png)

## Publish to GitHub Pages
1. Create a **public** GitHub repository named `responsive-internship-board`.
2. Upload all files and the `screenshots` directory; commit changes.
3. In the repository, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for the deployed URL to appear in Pages settings; test it.
6. Replace the placeholders below with your own URLs.

**GitHub repository:** `ADD_YOUR_GITHUB_REPO_URL`

**Live preview:** `ADD_YOUR_GITHUB_PAGES_URL`

## Submission
Submit the **public GitHub repository URL** as your one proof link. It includes source code, screenshots, README, and a link to the deployed preview.

## Accessibility notes
Uses semantic headings and regions, labeled controls, keyboard focus indicators, `aria-live` for the result count, and a skip link. Cards use descriptive links; their detail popups display sample data and are not real application forms.
