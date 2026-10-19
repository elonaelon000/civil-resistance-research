# Methodology — research protocol (v0.1)

**Project:** Does Civil Resistance Work?  
**Frozen pilot snapshot:** 2026-10-18  
**Status:** design and exploratory analysis. This is **not** a peer-reviewed causal analysis, a registered protocol, or a systematic sample.

## 1. Main question and subquestions

**When does civil resistance produce durable political change, when does it produce only concessions or leadership turnover, and when does it fail to achieve core demands?**

Subquestions:
1. What counts as a movement's *goal*? Do stated goals change across a campaign?
2. Is policy concession different from implementation? Is leadership removal different from regime or constitutional change?
3. What roles might movement participation, organization, security-force behavior, elite cohesion and state institutions play?
4. Why did Albania's 1990–1992 transition differ from the 2018–2019 student protests?
5. How does the 1997 mixed/armed crisis clarify the boundary between resistance, conflict and state breakdown?
6. What can be observed — and what cannot be inferred — about the ongoing 2026 Albanian protests?

## 2. Theory vs operational definitions

**Civil resistance**: organized collective action using nonviolent methods (protests, strikes, boycotts and noncooperation) to press political/social demands. Campaigns sometimes contain violent incidents; classifying a *campaign* requires evidence of its dominant repertoire rather than assuming every event has one tactic.

**Unit:** a campaign/wave with start and endpoint, not a single march or news story. Multiple waves in one country are separate if goals, coalitions or periods differ.

**Outcomes:** the pilot records one salient *immediate* outcome. A later analytical version will encode independently:
- original demand(s) met: yes / partial / no / unknown;
- leader removed: yes / no / unclear;
- governing regime rules transformed: yes / no / contested;
- state collapse or severe conflict: yes / no;
- changes at 1 year and 5 years: separate measurements;
- whether contemporaneous observers attributed the change to the movement: documentary evidence, not presumed.

**Special cases:** an ongoing campaign always has an unresolved endpoint; Albania 1997 cannot be coded as a successful nonviolent campaign; a bill withdrawal is not proof of a successful democratization campaign.

## 3. Selection design and selection bias

The initial CSV contains **12 purposively selected cases**: Albanian contrasts and internationally recognizable comparators with different outcomes. They are useful for constructing questions, discovering data problems and studying process mechanisms, but **cannot** yield a globally representative success rate, movement-size threshold, or causal effect.

This includes successful leadership change, partial concessions and movements whose principal demands were not met. More failures must be added under explicit inclusion rules before comparative generalization.

For a population-level study, obtain **NAVCO 2.1** directly from [Harvard Dataverse](https://doi.org/10.7910/DVN/MHOXDV) and use its original codebook. The Harvard landing page describes *384 maximalist campaigns* and the 2022 publication discusses *389 campaigns*; document the release/version and exact units used instead of silently combining those counts. NAVCO's 1945–2013 scope does not encompass Albania 2018 or 2026.

## 4. Hypotheses to investigate (not results)

- **H1 — Organizational breadth:** participation that expands across social groups is associated with more sustained contention, controlling for country context.
- **H2 — Coercive institutions:** evidence of security-force noncooperation is associated with differences in incumbent survival.
- **H3 — Elite behavior:** divisions within governing coalitions may be a mediating mechanism rather than simply a protest outcome.
- **H4 — Policy versus institutional change:** policy-level victories may occur without the institutional reforms sought by activists.
- **H5 — Durability:** leader removal and democratic improvement measured five years later can diverge.
- **H6 — Historical period:** associations documented for the late twentieth century may not be stable in the 2010s/2020s.

**Do not test H1–H6 with significance tests on this tiny purposive CSV.** This would create false precision. Instead collect operational measures from a systematically sampled dataset or design matched qualitative cases.

## 5. Comparisons centered on Albania

| Albania | International comparator | Why compare? | Primary confound to control |
| --- | --- | --- | --- |
| 1990–1992 | Serbia 2000 | Student-linked regime change and broader coalition formation | End of state-socialist order vs electoral authoritarianism |
| 2018–2019 | Hong Kong 2019 | Partial concessions vs broader institutional grievances | Sovereignty and political-system differences |
| 2018–2019 | Armenia 2018 | Mobilization and different scopes of demanded political change | Objective (higher-education reform vs incumbent removal) |
| 1997 | Sri Lanka 2022 | Severe economic crisis and contentious mobilization | Degree of violence, state breakdown and institutional continuity |
| 2026 | Bangladesh 2024 | Student participation, escalating grievances, state responses | One case remains ongoing; historical/political contexts differ |

These are **comparisons for explanation, not claims of equivalence**. Historical Albania 1990 may also require comparison with Eastern Europe's 1989 revolutionary wave and elite-led reform, because regional changes are potential confounders.

## 6. Source and coding protocol

1. Identify the **initial demand** with contemporary documents or reliable reporting where possible.
2. Record a timeline of major **dated developments**; separate participant claims, government claims and corroborated observations.
3. Record both **immediate outcome** and **later trajectory** with different sources if possible.
4. Mark uncertainty when evidence is ambiguous. Do not fabricate participation counts, armed-incident percentages or elite-defection measures.
5. Preserve the exact source URL and publication date. Avoid replacing a source with unsourced historical recollection.
6. Have a second reader review at least ambiguous style/outcome labels; record disagreements and retain alternate plausible codings.
7. When multiple goals exist, prefer separate demand/outcome fields rather than one binary success flag.

## 7. Analysis plan and validation

**Pilot notebook:** duplicate/NA checks, distribution of selected cases by country/year/outcome, Albania case summary, a cross-case comparison table, and labeled descriptive plots. All plots refer only to **these selected rows**, not the global population.

**Future systematic analysis:** define a sampling frame, merge country/year covariates with documented join rules, separate completed from censored/ongoing campaigns, account for within-country dependence, run robustness checks under alternative outcomes and case classifications, and report effect uncertainty.

**Limits:** classification subjectivity, different campaign goals, measurement error in crowd sizes, selective reporting, temporal confounding, simultaneous events, and reverse causality (e.g. defections might both result from and contribute to pressure).

## 8. Working ethics

Political neutrality; accurate attribution; no endorsement of parties or candidates; no sensational claims; and no tactical instructions for harming people. Claims about contemporary events must be checked anew at the time of publication.

All rows are subject to revision; record revisions explicitly in future commits. The initial work makes **no forecast** about the result of Albania's ongoing 2026 demonstrations.

See [the annotated sources](SOURCES.md), [codebook](../data/README.md), and the [pilot dataset](../data/cases.csv).
