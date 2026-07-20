# itsemmanuel.com Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild itsemmanuel.com as a hand-written, dependency-free, single-page site that
replaces the stock BootstrapMade template and stale content with a terminal-inspired design
and content that reflects Emmanuel's current identity as a security engineer and published
cybersecurity researcher.

**Architecture:** One static `index.html`, one `assets/css/style.css`, one `assets/js/main.js`.
No build step, no framework, no external JS libraries. Deployed exactly as today via GitHub
Pages + the existing `CNAME` file. Content tasks fill in distinct, non-overlapping `<section>`
blocks established by the foundation task, so they can be executed independently without
touching the same lines of the file.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, Grid/Flexbox), vanilla ES6 JS. Google
Fonts (JetBrains Mono + Inter) via a single `<link>`, same pattern the current site already
uses. Python 3 (preinstalled on macOS) for local static-file serving during verification.

## Global Constraints

- No build tooling, no npm dependencies, no JS frameworks - plain HTML/CSS/JS only.
- No vendor libraries (Bootstrap, AOS, Swiper, GLightbox, Isotope, PureCounter, Typed.js,
  Waypoints, php-email-form, icon-font libraries) - all removed, replaced with hand-written
  equivalents and inline SVG icons.
- No PHP or server-side code - GitHub Pages serves static files only.
- No phone number, no Google Maps embed, no Twitter/Instagram links.
- No NIW/USCIS legal language, no membership ID numbers, no financial/transcript info, no
  third-party (recommendation letter authors') personal information anywhere in committed
  content.
- No internal Amazon codenames or dollar figures (e.g. "SpyHawk", "$5.5 million", "86%
  reduction vs Azure Sentinel") - Amazon work is described qualitatively only.
- Do not describe CODiE Awards as a judging role (he was not matched to one) and do not
  reference "Hackathon Raptors Fellowship" anywhere in site content.
- Background `#0a0e0f`, primary text `#e6edf3`, accent green `#43e97b` (verified 12.2:1
  contrast against the background), accent amber `#f5b83d` (verified 10.9:1 contrast) -
  amber and magenta accents used sparingly (tags, hover states), never as body text color
  on their own for large blocks.
- All motion (typed-cursor effect, scroll reveal) must be disabled under
  `prefers-reduced-motion: reduce`.
- Every image needs real, descriptive `alt` text - never `alt=""` on a meaningful image.

---

## Task 1: Clean slate and page skeleton

**Files:**
- Delete: `assets/vendor/` (entire directory), `forms/` (entire directory), `debug.log`,
  `assets/img/author2.jpg`, `assets/img/144.png`, `assets/img/testimonials/` (entire
  directory), `assets/img/1.jpg`, `assets/img/2.jpg`, `assets/img/3.jpg`, `assets/img/img1.jpg`
  (old portfolio-gallery images, unused in the new design)
- Modify: `index.html` (full rewrite)
- Create: `assets/css/style.css` (new, minimal reset + font import for this task only - full
  visual system comes in Task 4)
- Create: `assets/js/main.js` (new, empty file for now - filled in Task 5)

**Interfaces:**
- Produces: empty `<section id="about" class="section"></section>`,
  `<section id="experience" class="section section-alt"></section>`,
  `<section id="publications" class="section"></section>`,
  `<section id="press" class="section section-alt"></section>`,
  `<section id="focus" class="section"></section>`,
  `<section id="contact" class="section section-alt"></section>` - later content tasks
  replace these exact empty tags with populated markup.
- Produces: `#typed-role` span in the hero (Task 5 JS writes into it).
- Produces: `#nav-toggle` button and `#nav-menu` list (Task 5 JS wires up).

- [ ] **Step 1: Delete legacy directories and files**

```bash
cd /Users/soft/projects/itsemmanuel-com
rm -rf assets/vendor forms
rm -f debug.log
rm -f assets/img/author2.jpg assets/img/144.png assets/img/1.jpg assets/img/2.jpg assets/img/3.jpg assets/img/img1.jpg
rm -rf assets/img/testimonials
```

- [ ] **Step 2: Verify deletion**

Run: `find assets -maxdepth 1 -type d; ls forms 2>&1; ls debug.log 2>&1`
Expected: `assets` lists only `css`, `img`, `js` (no `vendor`); `forms` and `debug.log` report
"No such file or directory".

- [ ] **Step 3: Write the new `index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emmanuel Joshua - Security Engineer &amp; Cybersecurity Researcher</title>
  <meta name="description" content="Emmanuel Joshua is a Security Engineer at Amazon working on AI-driven threat detection, and a published cybersecurity researcher.">
  <link rel="icon" href="assets/img/favicon.png">
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header id="header">
    <nav id="navbar" class="navbar">
      <div class="container navbar-inner">
        <a href="#hero" class="logo">emmanuel<span class="cursor">_</span></a>
        <button id="nav-toggle" class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">
          <span></span><span></span><span></span>
        </button>
        <ul id="nav-menu" class="nav-menu">
          <li><a href="#about" class="nav-link">01. about</a></li>
          <li><a href="#experience" class="nav-link">02. experience</a></li>
          <li><a href="#publications" class="nav-link">03. publications</a></li>
          <li><a href="#press" class="nav-link">04. press</a></li>
          <li><a href="#focus" class="nav-link">05. focus</a></li>
          <li><a href="#contact" class="nav-link">06. contact</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <main id="main">
    <section id="hero" class="hero">
      <div class="container hero-content">
        <p class="prompt">emmanuel@security:~$ whoami</p>
        <h1>I'm Emmanuel<span class="cursor">_</span></h1>
        <p class="hero-role">A <span id="typed-role" class="typed-role"></span></p>
        <div class="hero-actions">
          <a href="#contact" class="btn btn-primary">Get in touch</a>
          <a href="#publications" class="btn btn-ghost">See my research</a>
        </div>
      </div>
    </section>

    <section id="about" class="section"></section>
    <section id="experience" class="section section-alt"></section>
    <section id="publications" class="section"></section>
    <section id="press" class="section section-alt"></section>
    <section id="focus" class="section"></section>
    <section id="contact" class="section section-alt"></section>
  </main>

  <footer id="footer">
    <div class="container footer-content">
      <p>&copy; 2026 Emmanuel Joshua.</p>
      <a href="#hero" class="back-to-top" aria-label="Back to top">^ top</a>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Write a minimal placeholder-free base stylesheet (full system comes in Task 4)**

```css
:root {
  --bg: #0a0e0f;
  --text: #e6edf3;
  --font-sans: 'Inter', -apple-system, sans-serif;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--text); font-family: var(--font-sans); }
.container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }
```

- [ ] **Step 5: Create an empty `main.js` so the `<script>` tag doesn't 404**

```javascript
// Filled in by Task 5.
```

- [ ] **Step 6: Serve locally and verify the skeleton loads clean**

Run:
```bash
cd /Users/soft/projects/itsemmanuel-com
python3 -m http.server 8123 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8123/
curl -s http://localhost:8123/ | grep -c "vendor/bootstrap\|typed.min.js\|swiper-bundle"
kill %1
```
Expected: first command prints `200`; second command prints `0` (no leftover vendor
references in the served HTML).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Strip legacy template and vendor stack, add new page skeleton"
```

---

## Task 2: Content-safety checker script

**Files:**
- Create: `scripts/check-content-safety.sh`

**Interfaces:**
- Produces: an executable script `./scripts/check-content-safety.sh <file>...` that exits 0
  if none of the forbidden terms appear in the given files, and exits 1 (printing which term
  and which file) if any do. Used by Task 13 against the final `index.html`.

- [ ] **Step 1: Write the script**

```bash
#!/usr/bin/env bash
# check-content-safety.sh - fails if any forbidden term appears in the given files.
set -euo pipefail

FORBIDDEN=(
  "SpyHawk"
  "\$5.5 million"
  "Azure Sentinel"
  "CODiE"
  "Hackathon Raptors"
  "Raptors Fellowship"
  "National Interest Waiver"
  "beneficiary"
  "100229187"
  "8143670"
)

if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <file>..." >&2
  exit 2
fi

found=0
for file in "$@"; do
  [ -f "$file" ] || continue
  for term in "${FORBIDDEN[@]}"; do
    if grep -qiF -- "$term" "$file"; then
      echo "FORBIDDEN TERM FOUND: '$term' in $file"
      found=1
    fi
  done
done

if [ "$found" -eq 1 ]; then
  exit 1
fi
echo "OK: no forbidden terms found in: $*"
exit 0
```

- [ ] **Step 2: Make it executable**

```bash
chmod +x scripts/check-content-safety.sh
```

- [ ] **Step 3: Write a failing fixture and confirm the script catches it**

```bash
mkdir -p /tmp/content-safety-test
printf 'This mentions SpyHawk internally.\n' > /tmp/content-safety-test/bad.html
./scripts/check-content-safety.sh /tmp/content-safety-test/bad.html
echo "exit code: $?"
```
Expected: prints `FORBIDDEN TERM FOUND: 'SpyHawk' in /tmp/content-safety-test/bad.html`,
then `exit code: 1`.

- [ ] **Step 4: Write a clean fixture and confirm the script passes it**

```bash
printf 'This is a clean sentence about threat detection.\n' > /tmp/content-safety-test/good.html
./scripts/check-content-safety.sh /tmp/content-safety-test/good.html
echo "exit code: $?"
```
Expected: prints `OK: no forbidden terms found in: ...`, then `exit code: 0`.

- [ ] **Step 5: Clean up fixtures and commit**

```bash
rm -rf /tmp/content-safety-test
git add scripts/check-content-safety.sh
git commit -m "Add content-safety checker script"
```

---

## Task 3: Link checker script

**Files:**
- Create: `scripts/check-links.sh`

**Interfaces:**
- Produces: an executable script `./scripts/check-links.sh <html-file>` that extracts every
  `href="http..."` URL from the file, requests each with `curl`, and exits 1 if any returns a
  4xx/5xx or fails to connect (printing the offending URL and status), exits 0 otherwise.

- [ ] **Step 1: Write the script**

```bash
#!/usr/bin/env bash
# check-links.sh - extracts http(s) links from an HTML file and verifies each resolves.
set -uo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <html-file>" >&2
  exit 2
fi

file="$1"
urls=$(grep -oE 'href="https?://[^"]+"' "$file" | sed -E 's/^href="//;s/"$//' | sort -u)

if [ -z "$urls" ]; then
  echo "No external links found in $file"
  exit 0
fi

failed=0
while IFS= read -r url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 15 "$url")
  if [[ "$status" =~ ^[45] ]]; then
    echo "BROKEN LINK ($status): $url"
    failed=1
  else
    echo "OK ($status): $url"
  fi
done <<< "$urls"

exit "$failed"
```

- [ ] **Step 2: Make it executable**

```bash
chmod +x scripts/check-links.sh
```

- [ ] **Step 3: Write a failing fixture and confirm the script catches a broken link**

```bash
mkdir -p /tmp/link-test
printf '<a href="https://itsemmanuel-com-does-not-exist-404.example/">bad</a>\n' > /tmp/link-test/bad.html
./scripts/check-links.sh /tmp/link-test/bad.html
echo "exit code: $?"
```
Expected: a line starting with `BROKEN LINK` (or a non-2xx/3xx status for the nonexistent
domain), then `exit code: 1`.

- [ ] **Step 4: Write a passing fixture and confirm the script accepts a known-good link**

```bash
printf '<a href="https://scholar.google.com/citations?hl=en&user=wsowYJ4AAAAJ">scholar</a>\n' > /tmp/link-test/good.html
./scripts/check-links.sh /tmp/link-test/good.html
echo "exit code: $?"
```
Expected: a line starting with `OK (200)`, then `exit code: 0`.

- [ ] **Step 5: Clean up fixtures and commit**

```bash
rm -rf /tmp/link-test
git add scripts/check-links.sh
git commit -m "Add outbound link checker script"
```

---

## Task 4: Visual system (full CSS)

**Files:**
- Modify: `assets/css/style.css` (replace the minimal Task 1 version with the full system)

**Interfaces:**
- Consumes: the class/id names from Task 1's `index.html` (`.navbar`, `.nav-menu`,
  `.nav-link`, `.hero`, `.hero-content`, `.prompt`, `.cursor`, `.typed-role`, `.hero-actions`,
  `.btn`, `.btn-primary`, `.btn-ghost`, `.section`, `.section-alt`, `.footer-content`,
  `.back-to-top`, `.skip-link`).
- Produces (for content tasks to consume): `.section-title` (h2 + eyebrow label wrapper),
  `.section-label` (small monospace `01.` style eyebrow above a heading), `.lede` (intro
  paragraph under a section title), `.timeline`, `.timeline-item`, `.timeline-role`,
  `.timeline-org`, `.timeline-date`, `.timeline-list` (bullet list inside a timeline item),
  `.card-grid`, `.card`, `.card-title`, `.card-body`, `.pub-list`, `.pub-item`, `.pub-title`,
  `.pub-meta`, `.pub-links`, `.tag`, `.tag-row`, `.quote-block`, `.quote-attribution`,
  `.press-list`, `.press-item`, `.contact-grid`, `.contact-item`, `.reveal` (opacity/translate
  transition class toggled by Task 5's IntersectionObserver).

- [ ] **Step 1: Replace `assets/css/style.css` with the full system**

```css
/* ---------- Design tokens ---------- */
:root {
  --bg: #0a0e0f;
  --bg-elevated: #10171a;
  --border: #1e2a2e;
  --text: #e6edf3;
  --text-muted: #9aa7ad;
  --accent: #43e97b;
  --accent-amber: #f5b83d;
  --accent-magenta: #e26fc0;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --radius: 6px;
  --transition: 200ms ease;
}

/* ---------- Reset ---------- */
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
}
img { max-width: 100%; display: block; }
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
ul { list-style: none; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

.skip-link {
  position: absolute; left: -999px; top: 0; background: var(--accent); color: var(--bg);
  padding: 0.5rem 1rem; z-index: 100;
}
.skip-link:focus { left: 1rem; top: 1rem; }

/* ---------- Header / Nav ---------- */
#header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(10, 14, 15, 0.9);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--border);
}
.navbar-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
}
.logo {
  font-family: var(--font-mono); font-weight: 700; color: var(--text); font-size: 1.1rem;
}
.logo:hover { text-decoration: none; color: var(--accent); }
.nav-menu { display: flex; gap: 1.5rem; }
.nav-link {
  font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);
  transition: color var(--transition);
}
.nav-link:hover, .nav-link.active { color: var(--accent); text-decoration: none; }
.nav-toggle {
  display: none; flex-direction: column; gap: 4px; background: none; border: none;
  cursor: pointer; padding: 0.5rem;
}
.nav-toggle span { width: 22px; height: 2px; background: var(--text); }

@media (max-width: 768px) {
  .nav-toggle { display: flex; }
  .nav-menu {
    position: absolute; top: 64px; left: 0; right: 0; flex-direction: column;
    background: var(--bg-elevated); border-bottom: 1px solid var(--border);
    padding: 1rem 1.5rem; gap: 1rem; display: none;
  }
  .nav-menu.open { display: flex; }
}

/* ---------- Hero ---------- */
.hero { min-height: 90vh; display: flex; align-items: center; }
.hero-content { text-align: left; }
.prompt {
  font-family: var(--font-mono); color: var(--accent); font-size: 0.9rem; margin-bottom: 0.75rem;
}
.hero h1 { font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; }
.cursor { color: var(--accent); animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }
.hero-role {
  font-family: var(--font-mono); font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: var(--text-muted); margin-top: 1rem; min-height: 2rem;
}
.typed-role { color: var(--accent-amber); }
.hero-actions { display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; }

/* ---------- Buttons ---------- */
.btn {
  font-family: var(--font-mono); padding: 0.75rem 1.5rem; border-radius: var(--radius);
  border: 1px solid var(--accent); transition: all var(--transition); display: inline-block;
}
.btn:hover { text-decoration: none; }
.btn-primary { background: var(--accent); color: var(--bg); }
.btn-primary:hover { background: transparent; color: var(--accent); }
.btn-ghost { color: var(--accent); background: transparent; }
.btn-ghost:hover { background: var(--accent); color: var(--bg); }

/* ---------- Sections ---------- */
.section { padding: 6rem 0; }
.section-alt { background: var(--bg-elevated); }
.section-label {
  font-family: var(--font-mono); color: var(--accent); font-size: 0.9rem; letter-spacing: 0.05em;
}
.section-title { margin-bottom: 2.5rem; }
.section-title h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); margin-top: 0.5rem; }
.lede { color: var(--text-muted); max-width: 65ch; margin-top: 1rem; }

/* ---------- Timeline (Experience) ---------- */
.timeline { border-left: 2px solid var(--border); padding-left: 2rem; display: grid; gap: 3rem; }
.timeline-item { position: relative; }
.timeline-item::before {
  content: ''; position: absolute; left: -2.45rem; top: 0.35rem; width: 10px; height: 10px;
  border-radius: 50%; background: var(--accent);
}
.timeline-role { font-size: 1.15rem; font-weight: 600; }
.timeline-org { font-family: var(--font-mono); color: var(--accent); font-size: 0.9rem; margin-top: 0.15rem; }
.timeline-date { font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem; margin-top: 0.15rem; }
.timeline-list { margin-top: 0.75rem; display: grid; gap: 0.4rem; }
.timeline-list li { padding-left: 1.25rem; position: relative; color: var(--text-muted); }
.timeline-list li::before { content: '>'; position: absolute; left: 0; color: var(--accent); }

/* ---------- Cards (Focus Areas) ---------- */
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1.5rem; }
.card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; }
.section-alt .card { background: var(--bg-elevated); }
.card-title { font-family: var(--font-mono); color: var(--accent); font-size: 1.05rem; margin-bottom: 0.5rem; }
.card-body { color: var(--text-muted); font-size: 0.95rem; }

/* ---------- Publications ---------- */
.pub-list { display: grid; gap: 2rem; }
.pub-item { border-bottom: 1px solid var(--border); padding-bottom: 2rem; }
.pub-item:last-child { border-bottom: none; }
.pub-title { font-size: 1.1rem; font-weight: 600; }
.pub-meta { font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem; margin-top: 0.35rem; }
.pub-links { margin-top: 0.5rem; display: flex; gap: 1rem; font-family: var(--font-mono); font-size: 0.85rem; }

/* ---------- Tags ---------- */
.tag-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
.tag {
  font-family: var(--font-mono); font-size: 0.75rem; padding: 0.25rem 0.6rem;
  border-radius: 999px; border: 1px solid var(--accent-amber); color: var(--accent-amber);
}
.tag.magenta { border-color: var(--accent-magenta); color: var(--accent-magenta); }

/* ---------- Quotes (Press) ---------- */
.quote-block {
  border-left: 3px solid var(--accent); padding-left: 1.25rem; font-size: 1.1rem;
  font-style: italic; color: var(--text); margin: 1.5rem 0;
}
.quote-attribution { font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem; }
.press-list { display: grid; gap: 1rem; margin-top: 1.5rem; }
.press-item { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
.press-item .press-source { font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem; }

/* ---------- Contact ---------- */
.contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.contact-item { font-family: var(--font-mono); }
.contact-item .label { color: var(--text-muted); font-size: 0.8rem; display: block; margin-bottom: 0.25rem; }

/* ---------- Footer ---------- */
#footer { border-top: 1px solid var(--border); padding: 2rem 0; }
.footer-content { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--text-muted); flex-wrap: wrap; gap: 1rem; }
.back-to-top { font-family: var(--font-mono); }

/* ---------- Scroll reveal ---------- */
.reveal { opacity: 0; transform: translateY(16px); transition: opacity 500ms ease, transform 500ms ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .cursor { animation: none; }
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Verify the stylesheet is syntactically valid CSS**

Run: `python3 -c "import re,sys; s=open('assets/css/style.css').read(); print('braces balanced:', s.count('{') == s.count('}'))"`
Expected: `braces balanced: True`

- [ ] **Step 3: Serve locally and spot-check the hero renders with the dark theme and visible accent color**

```bash
cd /Users/soft/projects/itsemmanuel-com
python3 -m http.server 8123 &
sleep 1
curl -s http://localhost:8123/assets/css/style.css | grep -c "\-\-accent: #43e97b"
kill %1
```
Expected: `1`

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css
git commit -m "Add full terminal-inspired visual system"
```

---

## Task 5: JS interactivity

**Files:**
- Modify: `assets/js/main.js` (replace Task 1's empty file)

**Interfaces:**
- Consumes: `#nav-toggle`, `#nav-menu`, `.nav-link` (Task 1), `#typed-role` (Task 1),
  `.reveal` (Task 4, applied to content elements by Tasks 6-10).
- Produces: no new interfaces for other tasks - this is a leaf/consumer task.

- [ ] **Step 1: Write `assets/js/main.js`**

```javascript
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Mobile nav toggle ---
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  // --- Typed role cycler ---
  var ROLES = [
    'Security Engineer @ Amazon',
    'AI-Driven Threat Detection',
    'Published Cybersecurity Researcher',
    'Cybersecurity Awards Judge'
  ];
  var typedEl = document.getElementById('typed-role');
  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = ROLES[0];
    } else {
      (function typeLoop() {
        var roleIndex = 0;
        var charIndex = 0;
        var deleting = false;

        function tick() {
          var current = ROLES[roleIndex];
          if (!deleting) {
            charIndex++;
            typedEl.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
              deleting = true;
              setTimeout(tick, 1400);
              return;
            }
          } else {
            charIndex--;
            typedEl.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
              deleting = false;
              roleIndex = (roleIndex + 1) % ROLES.length;
            }
          }
          setTimeout(tick, deleting ? 35 : 60);
        }
        tick();
      })();
    }
  }

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
  }
})();
```

- [ ] **Step 2: Verify the file has no syntax errors**

Run: `node --check assets/js/main.js 2>&1 || python3 -c "print('node not available, skipping syntax check')"`
Expected: no syntax error output (or the fallback message if Node isn't installed on this
machine).

- [ ] **Step 3: Serve locally and confirm the hero role text populates**

```bash
cd /Users/soft/projects/itsemmanuel-com
python3 -m http.server 8123 &
sleep 1
curl -s http://localhost:8123/assets/js/main.js | grep -c "Security Engineer @ Amazon"
kill %1
```
Expected: `1`

Then open `http://localhost:8123/` in a browser and confirm: the role text under "I'm
Emmanuel" types and deletes in a loop, the mobile nav toggle opens/closes the menu below
768px width, and clicking a nav link highlights it once its section is in view.

- [ ] **Step 4: Commit**

```bash
git add assets/js/main.js
git commit -m "Add typed-role effect, scroll reveal, and nav interactivity"
```

---

## Task 6: About section content

**Files:**
- Modify: `index.html` - replace `<section id="about" class="section"></section>` with the
  populated section below.

**Interfaces:**
- Consumes: `.section-label`, `.section-title`, `.lede`, `.reveal`, `.tag-row`, `.tag` (Task 4).

- [ ] **Step 1: Replace the empty About section**

Find this exact line in `index.html`:
```html
    <section id="about" class="section"></section>
```

Replace it with:
```html
    <section id="about" class="section">
      <div class="container reveal">
        <p class="section-label">01. about</p>
        <div class="section-title"><h2>Building the systems that catch what shouldn't get through</h2></div>
        <p class="lede">
          I'm a Software Development Engineer II on Amazon's Defense Security Organization,
          where I build large-scale, AI-driven threat detection systems that protect cloud
          infrastructure relied on by businesses, healthcare providers, financial
          institutions, and government agencies. I'm also finishing a Master's in Computer
          Science with a concentration in Machine Learning and AI at UT Austin, and I hold a
          Bachelor's in Computer Science from Texas Southern University's Thomas F. Freeman
          Honors College.
        </p>
        <p class="lede" style="margin-top: 1.25rem;">
          Cybersecurity is one of those fields where the asymmetry never goes away - an
          attacker only has to succeed once, but a defender has to be right every time. My
          work is about closing that gap: building automation and real-time detection that
          catches sophisticated threats early, scales without breaking, and keeps working
          when it matters most. I write about this, judge cybersecurity awards, and mentor
          engineers coming up in the field, because the more of us building this well, the
          better it works for everyone.
        </p>
        <div class="tag-row">
          <span class="tag">MS Computer Science - ML/AI, UT Austin (in progress)</span>
          <span class="tag">BS Computer Science, Texas Southern University</span>
          <span class="tag magenta">IEEE Member</span>
          <span class="tag magenta">ACM / SIGSAC Member</span>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify the section renders**

Run: `grep -c "Defense Security Organization" index.html`
Expected: `1` (or more, if referenced again in Experience - re-run after Task 7 to confirm
count makes sense).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add About section content"
```

---

## Task 7: Experience section content

**Files:**
- Modify: `index.html` - replace
  `<section id="experience" class="section section-alt"></section>` with the populated
  section below.

**Interfaces:**
- Consumes: `.section-label`, `.section-title`, `.lede`, `.reveal`, `.timeline`,
  `.timeline-item`, `.timeline-role`, `.timeline-org`, `.timeline-date`, `.timeline-list`
  (Task 4).

- [ ] **Step 1: Replace the empty Experience section**

Find this exact line in `index.html`:
```html
    <section id="experience" class="section section-alt"></section>
```

Replace it with:
```html
    <section id="experience" class="section section-alt">
      <div class="container reveal">
        <p class="section-label">02. experience</p>
        <div class="section-title"><h2>Experience</h2></div>
        <div class="timeline">
          <div class="timeline-item">
            <p class="timeline-role">Software Development Engineer II</p>
            <p class="timeline-org">Amazon - Defense Security Organization, Austin, TX</p>
            <p class="timeline-date">Sep 2025 - Present</p>
            <ul class="timeline-list">
              <li>Build automated systems that detect signs of cyberattacks, fraud, and unauthorized access across large, high-volume cloud environments.</li>
              <li>Design alerting mechanisms that give security teams clear, actionable information for fast response.</li>
              <li>Build safeguards that keep detection systems reliable during large or sustained attacks, and automation that streamlines how detections are created, tested, and deployed.</li>
              <li>System processes trillions of security events daily; manual incident response has dropped from hours to minutes as a result of this work.</li>
            </ul>
          </div>
          <div class="timeline-item">
            <p class="timeline-role">Software Development Engineer I</p>
            <p class="timeline-org">Amazon - Defense Security Organization, Austin, TX</p>
            <p class="timeline-date">Aug 2023 - Sep 2025</p>
            <ul class="timeline-list">
              <li>Built the foundational detection, alerting, and automation systems later extended in the SDE II role above.</li>
              <li>Grew security coverage without a proportional increase in cost or staffing by designing for cost and performance from the start.</li>
            </ul>
          </div>
          <div class="timeline-item">
            <p class="timeline-role">Amazon Hackathon - People's Choice Award</p>
            <p class="timeline-org">"Threat Sage" - AI-driven threat detection platform</p>
            <p class="timeline-date">2023</p>
            <ul class="timeline-list">
              <li>Built an AI platform that reduced threat detection time by 35%, voted People's Choice by fellow hackathon participants.</li>
            </ul>
          </div>
          <div class="timeline-item">
            <p class="timeline-role">Software Development Engineer Intern</p>
            <p class="timeline-org">Amazon, Austin, TX</p>
            <p class="timeline-date">May 2022 - Aug 2022</p>
            <ul class="timeline-list">
              <li>Designed and implemented an account-level filtering detection feature that improved the retrieval and handling of sensitive data.</li>
            </ul>
          </div>
          <div class="timeline-item">
            <p class="timeline-role">Team Lead, Undergraduate Researcher</p>
            <p class="timeline-org">National Science Foundation CREST Center, Texas Southern University</p>
            <p class="timeline-date">2020 - 2022</p>
            <ul class="timeline-list">
              <li>Led a 3-member team building a secure remote-control platform for a research robot (Amigo Bot), including access control and secure communication over the TSU network.</li>
              <li>Added joystick navigation and camera functionality, fixed 20+ bugs, and made the control interface responsive across devices.</li>
              <li>Presented research posters at the NSF CREST Center at TSU; work funded under NSF Grant CNS-1827940.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify no forbidden internal details leaked in**

Run: `./scripts/check-content-safety.sh index.html`
Expected: `OK: no forbidden terms found in: index.html`

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add Experience section content"
```

---

## Task 8: Publications & Research section content

**Files:**
- Modify: `index.html` - replace `<section id="publications" class="section"></section>`
  with the populated section below.

**Interfaces:**
- Consumes: `.section-label`, `.section-title`, `.lede`, `.reveal`, `.pub-list`, `.pub-item`,
  `.pub-title`, `.pub-meta`, `.pub-links` (Task 4).

- [ ] **Step 1: Replace the empty Publications section**

Find this exact line in `index.html`:
```html
    <section id="publications" class="section"></section>
```

Replace it with:
```html
    <section id="publications" class="section">
      <div class="container reveal">
        <p class="section-label">03. publications</p>
        <div class="section-title"><h2>Publications &amp; Research</h2></div>
        <p class="lede">
          Peer-reviewed and independent research on AI-driven threat detection, automation,
          and distributed systems security. Full list also on
          <a href="https://scholar.google.com/citations?hl=en&user=wsowYJ4AAAAJ" target="_blank" rel="noopener">Google Scholar</a>
          and <a href="https://www.researchgate.net/profile/Emmanuel-Joshua-5" target="_blank" rel="noopener">ResearchGate</a>.
        </p>
        <div class="pub-list" style="margin-top: 2rem;">
          <div class="pub-item">
            <p class="pub-title">AI-Driven Threat Detection: Enhancing Cybersecurity Automation for Scalable Security Operations</p>
            <p class="pub-meta">International Journal of Science and Research Archive, 2025 - DOI: 10.30574/ijsra.2025.14.3.0615</p>
            <div class="pub-links">
              <a href="https://journalijsra.com/content/ai-driven-threat-detection-enhancing-cybersecurity-automation-scalable-security-operations" target="_blank" rel="noopener">Read paper</a>
            </div>
          </div>
          <div class="pub-item">
            <p class="pub-title">Reducing Benign Positives in Threat Detection Systems: A Graph-Based Approach to Contextualizing Security Alerts</p>
            <p class="pub-meta">International Journal of Science and Research Archive, 2025</p>
            <div class="pub-links">
              <a href="https://journalijsra.com/content/reducing-benign-positives-threat-detection-systems-graph-based-approach-contextualizing" target="_blank" rel="noopener">Read paper</a>
            </div>
          </div>
          <div class="pub-item">
            <p class="pub-title">AI-Driven Threat Intelligence System (AIDTIS): Leveraging Large Language Models for Automated Threat Research and Detection Development</p>
            <p class="pub-meta">International Journal of Science and Research Archive, 2025</p>
            <div class="pub-links">
              <a href="https://journalijsra.com/content/ai-driven-threat-intelligence-system-aidtis-leveraging-large-language-models-automated" target="_blank" rel="noopener">Read paper</a>
            </div>
          </div>
          <div class="pub-item">
            <p class="pub-title">A Decentralized Privacy-Preserving and Scalable Blockchain-Based Identity Management System</p>
            <p class="pub-meta">With P.O. Yusuf, A. Mai-Auduga, S.O. Yusuf, C.E. Yusuf - 2025</p>
            <div class="pub-links">
              <a href="https://www.researchgate.net/profile/Samuel-Yusuf-3/publication/388964626_A_decentralized_privacy-preserving_and_scalable_blockchain-based_identity_management_system" target="_blank" rel="noopener">Read paper</a>
            </div>
          </div>
          <div class="pub-item">
            <p class="pub-title">Batch and Stream Threat Detection: A Comprehensive Review</p>
            <p class="pub-meta">Technical review - 2025</p>
          </div>
          <div class="pub-item">
            <p class="pub-title">Cyber Threats in the Modern Era: An In-Depth Analysis</p>
            <p class="pub-meta">Industry analysis - January 2022</p>
          </div>
          <div class="pub-item">
            <p class="pub-title">Is Artificial Intelligence Redefining Our Civilization?</p>
            <p class="pub-meta">Honors thesis - December 2022</p>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify all publication links resolve**

Run: `./scripts/check-links.sh index.html 2>&1 | grep -A1 "journalijsra\|researchgate\|scholar.google"`
Expected: every listed URL shows `OK (2xx)` (allow redirects, e.g. `301`/`302` followed by
`200`, which `curl -L` already follows).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add Publications and Research section content"
```

---

## Task 9: Press & Recognition section content

**Files:**
- Modify: `index.html` - replace `<section id="press" class="section section-alt"></section>`
  with the populated section below.

**Interfaces:**
- Consumes: `.section-label`, `.section-title`, `.lede`, `.reveal`, `.quote-block`,
  `.quote-attribution`, `.press-list`, `.press-item`, `.tag-row`, `.tag` (Task 4).

- [ ] **Step 1: Replace the empty Press section**

Find this exact line in `index.html`:
```html
    <section id="press" class="section section-alt"></section>
```

Replace it with:
```html
    <section id="press" class="section section-alt">
      <div class="container reveal">
        <p class="section-label">04. press &amp; recognition</p>
        <div class="section-title"><h2>Press &amp; Recognition</h2></div>

        <blockquote class="quote-block">
          "No matter how advanced or innovative a system is, if it's not secure, it's vulnerable."
        </blockquote>
        <blockquote class="quote-block">
          "Security needs to be dynamic - constantly learning and changing."
          <p class="quote-attribution">- from an Authority Magazine interview, 2025</p>
        </blockquote>

        <h3 style="margin-top: 2.5rem; font-family: var(--font-mono); font-size: 1rem; color: var(--text-muted);">Featured / interviewed in</h3>
        <div class="press-list">
          <div class="press-item">
            <a href="https://medium.com/authority-magazine/staying-ahead-with-threat-intelligence-amazons-emmanuel-joshua-on-how-to-stay-informed-and-agile-a391582b0c9a" target="_blank" rel="noopener">Staying Ahead with Threat Intelligence</a>
            <span class="press-source">Authority Magazine, 2025</span>
          </div>
          <div class="press-item">
            <a href="https://alltechmagazine.com/enhancing-cybersecurity-through-automation-and-ai-driven-intelligence/" target="_blank" rel="noopener">Enhancing Cybersecurity Through Automation and AI-Driven Intelligence</a>
            <span class="press-source">AllTech Magazine, 2025</span>
          </div>
        </div>

        <h3 style="margin-top: 2.5rem; font-family: var(--font-mono); font-size: 1rem; color: var(--text-muted);">Published in</h3>
        <div class="press-list">
          <div class="press-item">
            <a href="https://www.cyberdefensemagazine.com/threat-research-is-broken-security-teams-need-automation-now/" target="_blank" rel="noopener">Threat Research Is Broken - Security Teams Need Automation Now</a>
            <span class="press-source">Cyber Defense eMagazine, March 2025</span>
          </div>
          <div class="press-item">
            <a href="https://securityboulevard.com/2025/03/ai-vs-cybercriminals-who-wins-the-race-in-next-gen-threat-detection/" target="_blank" rel="noopener">AI vs. Cybercriminals: Who Wins the Race in Next-Gen Threat Detection?</a>
            <span class="press-source">Security Boulevard, March 2025</span>
          </div>
          <div class="press-item">
            <a href="https://www.sitepronews.com/2025/05/19/threat-intelligence-automation-moving-beyond-ioc-collection/" target="_blank" rel="noopener">Threat Intelligence Automation: Moving Beyond IOC Collection</a>
            <span class="press-source">SitePro News, May 2025</span>
          </div>
        </div>

        <h3 style="margin-top: 2.5rem; font-family: var(--font-mono); font-size: 1rem; color: var(--text-muted);">Recognition</h3>
        <div class="tag-row">
          <span class="tag">Judge, Globee Awards for Cybersecurity (2025 &amp; 2026)</span>
          <span class="tag">Judge, Fortress Cybersecurity Awards (2025)</span>
          <span class="tag magenta">Outstanding Undergraduate Student Award, TSU</span>
          <span class="tag magenta">1st Place, NASA Poster Competition</span>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify no forbidden claims (CODiE, Raptors) leaked in and links resolve**

Run:
```bash
./scripts/check-content-safety.sh index.html
./scripts/check-links.sh index.html 2>&1 | grep -A1 "medium.com\|alltechmagazine\|cyberdefensemagazine\|securityboulevard\|sitepronews"
```
Expected: content-safety prints `OK`; every press URL shows a `2xx` status.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add Press and Recognition section content"
```

---

## Task 10: Focus Areas, Contact, and Footer content

**Files:**
- Modify: `index.html` - replace `<section id="focus" class="section"></section>`,
  `<section id="contact" class="section section-alt"></section>`, and the footer's
  `<p>&copy; 2026 Emmanuel Joshua.</p>` line with the populated content below.

**Interfaces:**
- Consumes: `.section-label`, `.section-title`, `.lede`, `.reveal`, `.card-grid`, `.card`,
  `.card-title`, `.card-body`, `.contact-grid`, `.contact-item`, `.btn`, `.btn-primary`
  (Task 4).

- [ ] **Step 1: Replace the empty Focus Areas section**

Find this exact line in `index.html`:
```html
    <section id="focus" class="section"></section>
```

Replace it with:
```html
    <section id="focus" class="section">
      <div class="container reveal">
        <p class="section-label">05. focus areas</p>
        <div class="section-title"><h2>What I work on</h2></div>
        <div class="card-grid">
          <div class="card">
            <p class="card-title">AI-Driven Threat Detection</p>
            <p class="card-body">Building automation that identifies attacks, fraud, and unauthorized access across large-scale environments in real time.</p>
          </div>
          <div class="card">
            <p class="card-title">Distributed Systems Security</p>
            <p class="card-body">Designing secure, resilient architectures that hold up under adversarial and high-volume conditions.</p>
          </div>
          <div class="card">
            <p class="card-title">Scalable Security Operations</p>
            <p class="card-body">Automating detection lifecycles and building safeguards that keep monitoring reliable during major incidents.</p>
          </div>
          <div class="card">
            <p class="card-title">Mentorship &amp; Knowledge Sharing</p>
            <p class="card-body">Writing, judging, and mentoring to help the next generation of security engineers get up to speed faster.</p>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Replace the empty Contact section**

Find this exact line in `index.html`:
```html
    <section id="contact" class="section section-alt"></section>
```

Replace it with:
```html
    <section id="contact" class="section section-alt">
      <div class="container reveal">
        <p class="section-label">06. contact</p>
        <div class="section-title"><h2>Get in touch</h2></div>
        <p class="lede">
          Best reached by email. I'm always glad to talk security, research, or interesting problems.
        </p>
        <div class="contact-grid">
          <div class="contact-item">
            <span class="label">Email</span>
            <a href="mailto:itsemmanuel@gmail.com">itsemmanuel@gmail.com</a>
          </div>
          <div class="contact-item">
            <span class="label">Location</span>
            Austin, Texas
          </div>
          <div class="contact-item">
            <span class="label">LinkedIn</span>
            <a href="https://www.linkedin.com/in/iamemmanueljoshua/" target="_blank" rel="noopener">linkedin.com/in/iamemmanueljoshua</a>
          </div>
          <div class="contact-item">
            <span class="label">GitHub</span>
            <a href="https://github.com/iamemmanueljoshua" target="_blank" rel="noopener">github.com/iamemmanueljoshua</a>
          </div>
        </div>
        <div class="hero-actions" style="margin-top: 2rem;">
          <a href="mailto:itsemmanuel@gmail.com" class="btn btn-primary">Email me</a>
          <a href="assets/resume.pdf" class="btn btn-ghost" download>Download resume</a>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Update the footer copyright line**

Find this exact line in `index.html`:
```html
      <p>&copy; 2026 Emmanuel Joshua.</p>
```

Replace it with:
```html
      <p>&copy; 2026 Emmanuel Joshua. Say hi: <a href="mailto:itsemmanuel@gmail.com">itsemmanuel@gmail.com</a></p>
```

- [ ] **Step 4: Verify content safety and no leftover empty sections**

Run:
```bash
./scripts/check-content-safety.sh index.html
grep -c 'class="section"></section>\|section-alt"></section>' index.html
```
Expected: content-safety prints `OK`; the grep count is `0` (no empty sections remain).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Add Focus Areas, Contact, and Footer content"
```

---

## Task 11: Profile photo integration

**Files:**
- Create: `assets/img/profile.jpg` (copied from the provided photo)
- Modify: `index.html` - add a photo to the About section

**Interfaces:**
- Consumes: `.about-photo` (new class, defined in this task's own CSS addition since no
  earlier task anticipated an image in About).

- [ ] **Step 1: Copy the provided photo into the repo**

```bash
cp /Users/soft/Downloads/IMG_9972.jpg /Users/soft/projects/itsemmanuel-com/assets/img/profile.jpg
```

- [ ] **Step 2: Add a small CSS rule for the photo**

Append to `assets/css/style.css`:
```css
.about-layout { display: grid; grid-template-columns: 200px 1fr; gap: 2.5rem; align-items: start; }
.about-photo { width: 100%; border-radius: var(--radius); border: 1px solid var(--border); }
@media (max-width: 700px) {
  .about-layout { grid-template-columns: 1fr; }
  .about-photo { max-width: 200px; }
}
```

- [ ] **Step 3: Wrap the About section's text in a two-column layout with the photo**

Find this exact opening in `index.html` (added in Task 6):
```html
      <div class="container reveal">
        <p class="section-label">01. about</p>
        <div class="section-title"><h2>Building the systems that catch what shouldn't get through</h2></div>
```

Replace it with:
```html
      <div class="container reveal">
        <p class="section-label">01. about</p>
        <div class="section-title"><h2>Building the systems that catch what shouldn't get through</h2></div>
        <div class="about-layout">
          <img src="assets/img/profile.jpg" alt="Portrait of Emmanuel Joshua" class="about-photo">
          <div>
```

Then find the closing of that section (the `</section><!-- End About -->`-equivalent, i.e.
the `</div></section>` immediately after the About section's `.tag-row` block from Task 6),
and add one extra closing `</div>` before `</div></section>` to close the new wrapper `<div>`.
The About section should now read, in full:

```html
    <section id="about" class="section">
      <div class="container reveal">
        <p class="section-label">01. about</p>
        <div class="section-title"><h2>Building the systems that catch what shouldn't get through</h2></div>
        <div class="about-layout">
          <img src="assets/img/profile.jpg" alt="Portrait of Emmanuel Joshua" class="about-photo">
          <div>
            <p class="lede">
              I'm a Software Development Engineer II on Amazon's Defense Security Organization,
              where I build large-scale, AI-driven threat detection systems that protect cloud
              infrastructure relied on by businesses, healthcare providers, financial
              institutions, and government agencies. I'm also finishing a Master's in Computer
              Science with a concentration in Machine Learning and AI at UT Austin, and I hold a
              Bachelor's in Computer Science from Texas Southern University's Thomas F. Freeman
              Honors College.
            </p>
            <p class="lede" style="margin-top: 1.25rem;">
              Cybersecurity is one of those fields where the asymmetry never goes away - an
              attacker only has to succeed once, but a defender has to be right every time. My
              work is about closing that gap: building automation and real-time detection that
              catches sophisticated threats early, scales without breaking, and keeps working
              when it matters most. I write about this, judge cybersecurity awards, and mentor
              engineers coming up in the field, because the more of us building this well, the
              better it works for everyone.
            </p>
            <div class="tag-row">
              <span class="tag">MS Computer Science - ML/AI, UT Austin (in progress)</span>
              <span class="tag">BS Computer Science, Texas Southern University</span>
              <span class="tag magenta">IEEE Member</span>
              <span class="tag magenta">ACM / SIGSAC Member</span>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 4: Verify the image loads**

```bash
cd /Users/soft/projects/itsemmanuel-com
python3 -m http.server 8123 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8123/assets/img/profile.jpg
kill %1
```
Expected: `200`

- [ ] **Step 5: Commit**

```bash
git add assets/img/profile.jpg assets/css/style.css index.html
git commit -m "Add current profile photo to About section"
```

---

## Task 12: Resume download - manual dependency gate

**Files:**
- Create (by Emmanuel, not by this task's automation): `assets/resume.pdf`

The Contact section (Task 10) already links to `assets/resume.pdf` with a `download`
attribute. Per the design spec, the previous resume file contains internal Amazon details
("SpyHawk", a specific dollar figure) that must not be published. Do not fabricate or
auto-generate a resume file - this step only verifies the real, redacted file is in place
before the download link goes live.

- [ ] **Step 1: Check whether the redacted resume has been provided**

```bash
ls -la /Users/soft/projects/itsemmanuel-com/assets/resume.pdf 2>&1
```

- [ ] **Step 2: If the file is missing, stop here and report it as blocked**

If Step 1 reports "No such file or directory", do not proceed with this task. Report back:
"Blocked on Task 12 - `assets/resume.pdf` has not been provided yet. The Contact section's
download button already points to this path; once the redacted PDF (with 'SpyHawk' and the
$5.5M figure removed) is placed at `assets/resume.pdf`, re-run this task's Step 3." Skip
straight to Task 13 for everything else in the meantime - the button will simply 404 until
this is resolved, which is acceptable for one missing asset on an otherwise-complete site.

- [ ] **Step 3: If the file is present, verify it does not contain the internal details**

```bash
strings /Users/soft/projects/itsemmanuel-com/assets/resume.pdf | grep -i "spyhawk\|5\.5 million" && echo "FAIL: internal details still present" || echo "OK: no internal details detected via text scan"
```
Expected: `OK: no internal details detected via text scan`. Note this is a best-effort text
scan (PDF text encoding can vary) - also manually open the PDF once and visually confirm the
two flagged bullets read generically before treating this as fully resolved.

- [ ] **Step 4: Commit**

```bash
cd /Users/soft/projects/itsemmanuel-com
git add assets/resume.pdf
git commit -m "Add redacted public resume PDF"
```

---

## Task 13: Final verification and cleanup

**Files:**
- No new files - this task only verifies and cleans up.

- [ ] **Step 1: Run both checker scripts against the final `index.html`**

```bash
cd /Users/soft/projects/itsemmanuel-com
./scripts/check-content-safety.sh index.html
./scripts/check-links.sh index.html
```
Expected: content-safety prints `OK`; link checker prints `OK (2xx)` for every URL and exits
0. If any link fails, fix the URL in `index.html` and re-run before continuing.

- [ ] **Step 2: Confirm no empty sections or leftover legacy references remain**

```bash
grep -c 'class="section"></section>\|section-alt"></section>' index.html
grep -ric "bootstrap\|swiper\|glightbox\|isotope\|purecounter\|typed.min.js\|waypoints\|php-email-form" index.html assets/css/style.css assets/js/main.js
```
Expected: both commands print `0`.

- [ ] **Step 3: Serve locally and manually verify in a browser**

```bash
cd /Users/soft/projects/itsemmanuel-com
python3 -m http.server 8123 &
```
Open `http://localhost:8123/` and confirm:
- Every section (About, Experience, Publications, Press, Focus Areas, Contact) is populated
  and readable.
- Nav scroll-to-section works; the active nav link updates while scrolling.
- Resizing to ~375px width (mobile) shows the hamburger menu working and no horizontal
  scroll or overlapping text.
- The typed-role line in the hero cycles through all four roles.
- The "Email me" button opens a mail client addressed to `itsemmanuel@gmail.com`.
- With OS-level "reduce motion" turned on, the typed effect and scroll-reveal animations are
  replaced by static, fully-visible content (no flicker or motion).

Then: `kill %1`

- [ ] **Step 4: Spot-check color contrast**

The design's accent colors were pre-verified during planning: `#43e97b` on `#0a0e0f` is
12.2:1 (WCAG AAA), `#f5b83d` on `#0a0e0f` is 10.9:1 (WCAG AAA), and body text `#e6edf3` on
`#0a0e0f` is ~18:1 (WCAG AAA). No further calculation needed; visually confirm in the browser
that no text is set in `--text-muted` at a small size against `--bg-elevated` in a way that
looks low-contrast (spot check only, both are dark-on-dark-adjacent and were not
independently computed).

- [ ] **Step 5: Confirm the CNAME file is untouched (deployment target unchanged)**

```bash
cat CNAME
```
Expected: `itsemmanuel.com`

- [ ] **Step 6: Final commit**

```bash
cd /Users/soft/projects/itsemmanuel-com
git status --short
git add -A
git commit -m "Final verification pass for portfolio redesign" --allow-empty
```

- [ ] **Step 7: Push when ready (ask the user first - this goes live on itsemmanuel.com)**

Do not run `git push` as part of this task automatically. Report completion and let the user
decide when to push to `origin/master`, since that deploys directly to the live site.
