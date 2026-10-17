# Does Civil Resistance Work?

**A comparative research project on mass protest, political change, and the conditions of civil resistance — with Albania at the center.**

> **Research question:** Under what conditions does civil resistance achieve policy change, leadership removal, or deeper institutional transformation — and why do other movements fail to achieve their stated demands?

**Stage:** Research foundation / pilot dataset (not a completed study)  
**Evidence cutoff:** 2026-10-17  
**Cases:** 12 deliberately selected historical and contemporary cases; **not a representative global sample**.

## Start here

This repository is designed as a serious, reproducible research project, **not** a prewritten conclusion that protests work or do not work.

- **[data/cases.csv](data/cases.csv)** — independently labeled *provisional* case records, including four Albanian episodes.
- **[data/README.md](data/README.md)** — fields, coding definitions, and important limitations.
- **[notebooks/01_explore.ipynb](notebooks/01_explore.ipynb)** — load, audit, visualize and compare the pilot cases with Python.
- **[docs/METHODOLOGY.md](docs/METHODOLOGY.md)** — inclusion criteria, hypotheses, comparison design and threats to inference.
- **[docs/SOURCES.md](docs/SOURCES.md)** — annotated case-level references and the broader academic foundation.

### Why Albania?

Compare **1990–1992** (end of one-party rule), **1997** (armed/mixed crisis and state breakdown), **2018–2019** (education policy concessions), and **2026** (an ongoing, *unresolved* case). The four episodes should not be treated as interchangeable forms of nonviolent resistance.

International comparison cases include Serbia, Armenia, Tunisia, Egypt, Belarus, Sri Lanka, Hong Kong, and Bangladesh. They were selected to illustrate **different** outcomes, not to estimate how often any outcome occurs globally.

## Run the notebook

Use Python 3.10+:

```bash
git clone https://github.com/elonaelon000/civil-resistance-research.git
cd civil-resistance-research
python3 -m pip install -r requirements.txt
jupyter lab
```

Open `notebooks/01_explore.ipynb`. The notebook detects whether it is launched from the repository root or the `notebooks/` folder. You can also upload the notebook and CSV to Google Colab; in that case adjust the CSV path to the uploaded file.

## Research guardrails

1. **No global success rates from this CSV.** The cases are purposively selected, a classic source of selection bias.
2. **Outcome ≠ cause.** A president leaving does not prove mass demonstrations alone caused the departure.
3. **Leadership ≠ regime ≠ system.** Immediate and durable outcomes must be measured separately.
4. **Mixed/armed cases are not evidence of successful *nonviolent* resistance.** State repression is also analytically distinct from protesters using violence.
5. **Ongoing cases are not failures or victories.** The Albania 2026 record is a dated news snapshot.
6. **Sources are linked, and case codes are provisional.** The next stage is independent verification and transparent adjudication.

## What comes next?

- Check each case against primary and secondary sources; record disagreements.
- Create an event timeline for Albania 1990, 2018 and 2026 with dated claims and responses.
- Identify a defensible comparison sample and add *unsuccessful* as well as successful campaigns.
- Download the **[NAVCO 2.1 dataset](https://doi.org/10.7910/DVN/MHOXDV)** with its codebook and use it for a separate, systematic quantitative study. NAVCO has different inclusion rules and time coverage; **do not append these pilot records to NAVCO**.
- Only after analysis and source review, consider an interactive presentation website.

## Repository structure

```text
civil-resistance-research/
├── README.md
├── requirements.txt
├── data/
│   ├── cases.csv
│   └── README.md
├── notebooks/
│   └── 01_explore.ipynb
└── docs/
    ├── METHODOLOGY.md
    └── SOURCES.md
```

## Attribution

Research summaries and preliminary coding: project contributors. Underlying books, articles, news coverage and datasets belong to their original authors/publishers and should be cited independently. Source hyperlinks are provided without republishing third-party copyrighted works.
