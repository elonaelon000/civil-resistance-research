# Does Civil Resistance Work?

**An interactive, evidence-first research atlas of mass protests, political change, and the limits of civil resistance — with Albania at its center.**

[![Website](https://img.shields.io/badge/Interactive_website-LIVE-f16e9e?style=flat-square&labelColor=211820)](https://elonaelon000.github.io/civil-resistance-research/)
[![Research](https://img.shields.io/badge/Research-pilot_dataset-79717a?style=flat-square&labelColor=211820)](#current-status)

### [**OPEN THE LIVE RESEARCH WEBSITE ↗**](https://elonaelon000.github.io/civil-resistance-research/)

**Live demo:** https://elonaelon000.github.io/civil-resistance-research/  
**Source code:** https://github.com/elonaelon000/civil-resistance-research

The site uses GitHub Pages and reads the same `data/cases.csv` file used by the Python notebook. GitHub's **Pages build and deployment succeeded on 17 October 2026** ([deployment run](https://github.com/elonaelon000/civil-resistance-research/actions/runs/39058668202)).

## The research question

> **Under what conditions does civil resistance achieve policy change, leadership removal, or more fundamental institutional transformation — and why do seemingly similar mass movements produce different outcomes?**

This project separates a movement's immediate political result from its longer-term effects. A minister being replaced, an education-policy concession, a prime minister resigning, and democratic institutional change are **not** equivalent outcomes.

## Current status

*Project README updated: 19 October 2026. Research evidence cutoff: 18 October 2026.*

| Component | Status |
| --- | --- |
| Interactive website | **Deployed** using GitHub Pages |
| Case atlas | **12 sourced, researcher-selected pilot cases**, including four from Albania |
| Case exploration | Search, geography and outcome filters, case details and source links |
| Analysis | Exploratory Jupyter notebook; descriptive comparisons only |
| Research quality | Provisional coding and source verification in progress |
| Statistical pattern recognition | **Planned**; requires a systematic dataset such as NAVCO 2.1 |

**Albania 2026 — ongoing / unresolved.** The 18 October reporting describes a sixth consecutive day of student and wider anti-government demonstrations in Tirana and continued confrontations. Prime Minister Edi Rama declined calls to resign. There is **no established final outcome**, so the movement is **not** coded as either success or failure ([Reuters, 17 October](https://www.investing.com/news/world-news/albanian-antigovernment-protesters-clash-with-police-in-tirana-4955402); [Al Jazeera, 18 October](https://www.aljazeera.com/news/2026/10/18/chaos-in-tirana-demonstrators-determined-to-not-give-up-so-easily)).

## Explore the live atlas

The website presents:

- **Albania as the main case study:** 1990–1992 political transition, 1997 mixed/armed state crisis, 2018–2019 student protests, and the ongoing 2026 movement.
- **International comparisons:** Serbia, Armenia, Tunisia, Egypt, Belarus, Sri Lanka, Hong Kong and Bangladesh.
- **Different outcomes:** policy concessions, leadership change, regime/system change, unfulfilled demands, state breakdown and unresolved cases.
- **Interactive case files:** observed results, research questions, source links and explicit limitations.
- **Research hypotheses:** questions about movement participation, institutional behavior, reform implementation and long-term effects — **not predetermined conclusions**.

[**Explore the website →**](https://elonaelon000.github.io/civil-resistance-research/)

## Project structure

```text
civil-resistance-research/
├── index.html                 # GitHub Pages homepage
├── assets/
│   ├── site.css               # Responsive black-and-pink layout
│   └── site.js                # CSV-powered filters and case details
├── data/
│   ├── cases.csv              # 12 provisional case records
│   └── README.md              # Data dictionary and outcome codes
├── notebooks/
│   └── 01_explore.ipynb       # Exploratory Python analysis
├── docs/
│   ├── METHODOLOGY.md         # Definitions, hypotheses and limitations
│   └── SOURCES.md             # Annotated evidence and further reading
├── requirements.txt
└── README.md
```

## Run it locally

To preview the website, use a local HTTP server (the browser may block reading CSV from a `file://` URL):

```bash
git clone https://github.com/elonaelon000/civil-resistance-research.git
cd civil-resistance-research
python3 -m http.server 8000
```

Open http://localhost:8000 in your browser.

To run the Python analysis:

```bash
python3 -m pip install -r requirements.txt
jupyter lab
```

Open `notebooks/01_explore.ipynb`.

## Important methodology notes

1. **These 12 cases are deliberately selected**, not a representative sample of global protest movements. Their distribution cannot establish worldwide success rates.
2. **Correlation does not prove causation.** Leadership removal is not proof that protests alone caused the departure.
3. **Ongoing movements do not have final outcomes.** The 2026 Albanian entry is a dated snapshot and must be reverified.
4. **Mixed or armed unrest is distinct from predominantly nonviolent resistance.** State repression and protester tactics must not be conflated.
5. **Initial victories may not last.** Evaluate policy implementation and institutional durability separately.

Read the [methodology](docs/METHODOLOGY.md), [case codebook](data/README.md) and [source notes](docs/SOURCES.md).

For a broader, systematically selected quantitative study, obtain [NAVCO 2.1](https://doi.org/10.7910/DVN/MHOXDV) and its codebook. Do **not** treat the curated pilot CSV as NAVCO data.

## Next research milestones

- Review and verify case-level chronology and competing interpretations.
- Deepen the Albania 2018 vs. 2026 comparison; log subsequent changes without predicting outcomes.
- Compare both successful and unsuccessful campaigns under consistent inclusion rules.
- Expand into reproducible statistical analyses only after selecting an appropriate dataset.
- Refine the website based on evidence and usability testing.

## Attribution

Research summaries and pilot case coding: repository contributors. Underlying news, articles, datasets and historical records remain the work of their respective authors and publishers.
