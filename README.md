# CSIS 3280 — Week 04: PHP Form Handling

Courseware for Week 04 (how a browser form sends data to PHP, and how PHP reads,
branches and validates it), published as a **static website in English and Chinese**.

English 🔗 https://johnnylin707.github.io/CSIS3280-week04/docs/app.html?lang=en#/
Chinese 🔗 https://johnnylin707.github.io/CSIS3280-week04/docs/app.html?lang=zh#/

## Website

The site lives in [`docs/`](docs/) and needs no server, no build step and no PHP —
open it directly or publish it with GitHub Pages.

```
docs/
├── index.html                  language gateway (EN / 中文)
├── app.html                    the courseware (hash routing)
└── assets/
    ├── css/style.css
    └── js/
        ├── i18n.js             interface strings (EN / ZH)
        ├── data-lab.js         CODE COMPLETION LAB — 7 tasks / 17 blanks
        ├── data-guide.js       demo guide, file inventory, cheatsheet
        ├── data-manual.js      source-code manual — 13 files / 67 steps
        ├── data-exercises.js   drill bank — 14 exercises / 19 blanks
        └── app.js              router, rendering, answer checking, progress
```

**For students: start at the Code Completion Lab (`#/lab`).** Each task gives you the
`week04_starter` file, the lines that are missing or broken, a hint per blank,
instant checking, and — once you have tried — the finished file from
`week04_demo(done)` to compare against.

### Run locally

```bash
cd docs
python3 -m http.server 8000
# then open http://localhost:8000/
```

### Publish with GitHub Pages

1. Push this repository to `https://github.com/JohnnyLin707/CSIS3280-week04.git`
2. GitHub → **Settings → Pages** → Source: *Deploy from a branch*
3. Branch: `main`, folder: **`/docs`** → Save

The site is then served at `https://johnnylin707.github.io/CSIS3280-week04/`.

### Sections

| Section | Route | Content |
|---|---|---|
| Code Completion Lab | `#/lab` | **7 tasks**: complete the code `week04_starter` leaves unfinished |
| Overview | `#/` | environment setup + the 13-file inventory |
| Demo Guide | `#/guide` | what each of the 6 demos does, how to run it, what to learn |
| Manual | `#/manual` | every source file split into steps: original code + why + purpose |
| Drills | `#/exercises` | 14 extra fill-in-the-blank exercises (incl. Assignment 2 topics) |
| Cheatsheet | `#/cheatsheet` | every PHP function used this week |

Language is switched with the EN / 中文 button (add `?lang=en` or `?lang=zh` to
the URL to force one). Typing progress and exercise scores are stored in the
browser's `localStorage`.

## Running the PHP demos

The teaching code itself still needs PHP. From a site root that contains a folder
named `week04`:

```bash
mkdir -p ~/week04_site && cd ~/week04_site
ln -s "/path/to/Week04/week04_demo(done)" week04
php -S localhost:8000
# open http://localhost:8000/week04/
```

## Folders

| Folder | What it is |
|---|---|
| `week04_starter/` | the classroom starter code |
| `week04_starter(AI-fixed))/` | starter code with fixes applied |
| `week04_demo(done)/` | completed demos (the reference answers) |
| `week04_demo(done)/PHP_Week4_SelfPratice/` | the original PHP (server-based) practice app |
| `docs/` | this static website |
| `Lecture04.pdf` | the lecture slides |
