# itsemmanuel.com Redesign - Design Spec

Date: 2026-07-19

## Goal

Full content and visual redesign of itsemmanuel.com (currently a stock BootstrapMade
"iPortfolio" template hosted on GitHub Pages via the `iamemmanueljoshua/Resume` repo).
Replace the generic freelance-developer framing with content that reflects Emmanuel's
actual current identity: security engineer at Amazon working on threat detection, published
cybersecurity researcher, and industry-recognized judge/contributor. Visual direction:
technical/terminal-inspired, dark, energetic ("cool and fun"), not somber or corporate.

## Content sources and provenance

Content is sourced from, in priority order:
1. Emmanuel's own verified documents (NIW petition personal statement, authored resume,
   Authorship.pdf, Publications.pdf, honor/judge confirmation emails) - treated as ground truth.
2. Google Scholar and LinkedIn - used for cross-referencing only.
3. Direct confirmation from Emmanuel where source documents were ambiguous or unverifiable
   (e.g. the Amazon Hackathon "Threat Sage" award, confirmed directly - no corroborating
   document existed).

**Explicitly excluded from the public site** (verified during research, not just assumed):
- Any NIW/USCIS legal or "beneficiary" language, or petition-specific framing.
- Membership ID numbers (IEEE, ACM/SIGSAC), financial documents, transcripts, and any
  immigration document (passport, visa, I-94, H1B approval).
- Third parties' personal information (recommendation letter authors' names/content).
- Internal Amazon codenames and dollar figures ("SpyHawk", "$5.5M IMR", "86% vs Azure
  Sentinel") - the public site uses the same genericized framing Emmanuel's own NIW
  statement already uses ("Amazon Threat Detection System", qualitative impact only).
- The "CODiE Awards judge" claim - the actual confirmation email states he was *not*
  matched to a judging assignment and was instead invited to an open community vote
  (open to 2,000+ people). Not a judging credential; omitted entirely rather than
  reworded, since it adds little and reworking it accurately reads awkwardly.
- The "Hackathon Raptors Fellowship" - congratulatory email has hallmarks of a
  vanity/pay-to-play credentialing service (generic AI-flattery tone, shared/virtual UK
  office address, vague "five members" peer review). Not included; not worth the
  credibility risk if a visitor looks it up.
- A GitHub-repos "Projects" showcase - his public repos are old student projects (VR lab
  interface, a forked LAMP setup, a dating-site clone, a color game) that undercut rather
  than reinforce the security/research narrative. GitHub stays as a plain profile link only.

## Site structure (single scrolling page, no build step)

1. **Hero** - "I'M EMMANUEL", typed-role line cycling through real roles (Security Engineer
   @ Amazon, AI-Driven Threat Detection, Published Researcher, Cybersecurity Awards Judge).
   Terminal-prompt visual flourish.
2. **About** - Current role: Software Development Engineer II, Defense Security
   Organization, Amazon (Sep 2025-present; SDE I Aug 2023-Sep 2025; SDE Intern May-Aug
   2022). MS in Computer Science (ML/AI concentration, in progress, expected May 2027) at
   UT Austin. BS in Computer Science (Thomas F. Freeman Honors College) at Texas Southern
   University, 2022. Short personal-voice version of his mission (adapted from his own NIW
   personal statement, de-legalized for a portfolio audience - not verbatim petition text).
3. **Experience** - Timeline entries:
   - Amazon SDE II / SDE I / Intern - work on a large-scale cloud threat detection system
     (genericized, no internal codename or $ figures): automated detection of attacks/fraud/
     unauthorized access, alerting design, safeguards against alert-system overload during
     high-volume attacks, detection-lifecycle automation, cost/performance management.
     Qualitative impact only (e.g. "processes trillions of security events daily", "cut manual
     incident response from hours to minutes") - no specific dollar figures or team names.
   - Amazon Hackathon People's Choice Award (2023) - "Threat Sage," an AI platform that
     reduced threat detection time by 35% (confirmed directly by Emmanuel).
   - NSF-funded undergraduate research (TSU, NSF Grant CNS-1827940) - secure
     communication, access control, and monitoring for remotely operated robotic systems;
     reused from the current site's existing bullet content.
4. **Publications & Research** - the 4 peer-reviewed papers (with DOI/links and citation
   counts from Authorship.pdf) plus the 3 other works (honors thesis, industry analysis, NSF
   research paper).
5. **Press & Recognition**:
   - *Published in* (bylined articles he authored): Cyber Defense Magazine, Security
     Boulevard, SitePro News.
   - *Featured/interviewed in*: Authority Magazine (real pull-quotes below), AllTechMagazine.
   - Pull-quotes from the Authority Magazine interview, used in place of the old fake
     testimonials for personality/"fun": *"No matter how advanced or innovative a system
     is, if it's not secure, it's vulnerable"* and *"Security needs to be dynamic - constantly
     learning and changing."*
   - Judge roles: Globee Awards for Cybersecurity (2025 and 2026 - verified via official
     confirmation/judge-access emails, minimum 50 assignments reviewed), Fortress
     Cybersecurity Awards / Business Intelligence Group (2025 - verified via certificate).
   - Awards: Outstanding Undergraduate Student Award (TSU Computer Science
     Department), 1st place NASA poster competition, Amazon Hackathon People's Choice
     Award (see Experience).
   - Memberships: IEEE, ACM (incl. SIGSAC), Cloud Security Alliance, National Society of
     Black Engineers - names only, no member ID numbers.
6. **Focus Areas** (replaces the old generic "Services" list, which read as freelance-agency
   boilerplate and doesn't fit an Amazon security engineer). 3-4 cards drawn directly from his
   own described work: AI-driven threat detection automation, distributed systems security,
   scalable security operations, mentorship/knowledge-sharing.
7. **Contact** - Email, location (Austin, TX), LinkedIn, GitHub (profile link only), resume
   download (redacted PDF - see below), `mailto:` based contact. No phone number, no PHP
   form, no Google Maps embed.

Dropped entirely from the current site: fake-sounding testimonials, generic freelance
services list, Twitter/Instagram links, phone number, Google Maps embed.

### Profile photo

The existing `assets/img/author2.jpg` / `144.png` (same photo, two crops) was uploaded
March 2022 and shows Emmanuel in a Texas Southern University Honors College-branded
blazer - over 4 years old and visually tied to a university affiliation that no longer
represents his current identity. Replaced with a current headshot (`IMG_9972.jpg`,
provided directly) - plain black background, dark clothing, neutral/direct expression -
which fits the near-black terminal visual system well. Used for the hero/about section;
the old photo files are removed.

### Resume PDF

The existing `Previous EB2 Application 1/.../Resume.pdf` is real and matches Emmanuel, but
predates the Sep 2025 SDE II promotion and names the internal "SpyHawk" team plus a
$5.5M internal cost figure. Emmanuel will edit those specific bullets (remove the codename
and dollar figure, keep qualitative achievements) and provide the cleaned file; it will be
self-hosted at `assets/resume.pdf` in the repo rather than linking out to Google Drive.

## Visual system

- **Palette**: near-black background (`#0a0e0f`), off-white primary text, terminal-green
  primary accent (`#4ade80`-range, chosen to pass WCAG AA on the dark background), amber
  and a touch of magenta used sparingly for tags/highlights/hover states (syntax-highlight
  feel, not a rainbow of equally-weighted colors).
- **Type**: monospace for headings, nav, and labels (terminal feel); a clean sans-serif for
  body copy (readability). Both loaded via the same Google Fonts approach the current site
  already uses (not a "vendor library," a single lightweight stylesheet link).
- **Motion**: custom hand-written typed-cursor effect for the hero role line (replacing the
  Typed.js dependency), IntersectionObserver-based scroll reveals (replacing AOS), sticky
  terminal-prompt-style nav bar (e.g. `emmanuel@security:~$`) with a mobile hamburger
  toggle. All motion respects `prefers-reduced-motion`.

## Technical architecture

- Hand-written HTML/CSS/JS, no build step, deployed exactly as today via the existing
  GitHub Pages + CNAME setup (`iamemmanueljoshua/Resume` repo, `itsemmanuel.com` CNAME
  unchanged).
- **Remove the entire vendor stack**: Bootstrap, AOS, Swiper, GLightbox, Isotope,
  PureCounter, Typed.js, Waypoints, php-email-form, Bootstrap Icons/Boxicons. Replaced
  with a few hundred lines of hand-written CSS/JS and inline SVG icons. This removes ~7
  unused/heavy dependencies (testimonials/gallery features are gone, so Swiper/GLightbox/
  Isotope have no remaining purpose anyway).
- Delete `forms/` (the PHP contact form has never worked on GitHub Pages, which doesn't
  execute PHP - it's been silently broken) and the stray `debug.log` file.
- File structure: `index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/img/`
  (existing profile/about photos reused; testimonial headshots removed), `assets/resume.pdf`
  (new, redacted).
- Contact becomes a `mailto:` link plus visible email text - zero-dependency, always works,
  no third-party form service required for a v1.

## Accessibility & performance

- Semantic landmarks (`header`/`nav`/`main`/`section`/`footer`), skip-to-content link.
- Color contrast checked against WCAG AA for body text on the near-black background.
- `prefers-reduced-motion` disables scroll-reveal and typed-cursor animation.
- Real, descriptive `alt` text on images (current site ships empty `alt=""` attributes).
- Total page weight should drop substantially with the vendor stack removed.

## Verification plan

- Serve locally and manually verify every section renders correctly at mobile, tablet, and
  desktop widths; nav scroll-to-section and mobile menu toggle both work.
- Confirm all outbound links resolve: 7 publication links, 5 press links, LinkedIn, GitHub.
- Check color contrast ratios meet WCAG AA.
- Confirm `prefers-reduced-motion` actually disables animation.
- Confirm the `mailto:` contact link opens a mail client with the right address, and the
  resume PDF downloads and does not contain the redacted internal details.
