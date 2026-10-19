# Pilot case dataset — codebook

**File:** `cases.csv` | **Cutoff:** 2026-10-18 | **Rows:** 12 | **Unit of analysis:** one *selected protest campaign/wave*.

These are manually coded qualitative observations intended for research practice and case-comparison design. They are **not** NAVCO data and should never be used to estimate worldwide campaign success rates or train a predictive model.

## Columns

| Column | Type | Meaning |
| --- | --- | --- |
| `case_id` | text, unique | Stable case identifier (e.g. `ALB-2018`). |
| `country` | text | Geographic political unit; Hong Kong is a territory. |
| `campaign` | text | Short label for the focal mobilization. |
| `start_year`, `end_year` | integer | Coarse boundaries of the coded wave, **not** incident dates. |
| `status` | `completed` / `ongoing` | Status of the specified wave as of the cutoff. |
| `campaign_style` | `predominantly_nonviolent` / `mixed_or_armed` | **Provisional** researcher impression of protesters' action repertoire; mixed does not imply all participants were violent. State violence alone does not change the protesters' classification. |
| `demand_scope` | `reformist` / `maximalist` / `mixed` | Reform of policy vs a governing-authority challenge vs multiple/changeable demands. |
| `immediate_outcome` | categorical | One salient immediate political result at the specified endpoint, **not** a universal success/failure claim. |
| `observed_result` | text | Concise descriptive outcome statement. |
| `long_term_caution` | text | Reasons the immediate result may be misleading or incomplete. |
| `comparison_question` | text | Research question to investigate; **not an observed fact**. |
| `source_1`, `source_2` | URL or blank | Evidence sources supporting/qualifying the row; attribution and source roles in `docs/SOURCES.md`. |

## `immediate_outcome` values

- `policy_concessions`: at least one relevant policy change or commitment; implementation not assumed.
- `leadership_change`: incumbent departed; no deep regime change necessarily implied.
- `regime_transition`: material change to how political authority is contested or exercised.
- `system_transition`: foundational transformation, e.g. end of one-party rule.
- `no_core_change`: core political demands not achieved at the coded wave's endpoint.
- `state_breakdown`: major loss of state functioning amid mixed/armed unrest; **not** a nonviolent success category.
- `unresolved`: ongoing case; **not** a failure or success.

These outcome codes prioritize a salient change. Some cases contain **multiple simultaneous outcomes**: Hong Kong's bill withdrawal did not mean all political demands were met, and Albania's 1990 transition took years. In an expanded dataset use *separate binary columns* for policy, leadership, regime, violence and 1/5-year durability.

## Comparability rules

- Exclude `status=ongoing` for analyses of final outcomes.
- Analyze `mixed_or_armed` separately from `predominantly_nonviolent`, but do not interpret provisional styles as validated incident-level coding.
- Use a systematic dataset (e.g. NAVCO) for population-level inference; this purposive sample is **not** suitable for causal estimation or prediction.
- Treat Albania 1997 as a contrasting crisis, not evidence that civil resistance achieved regime change.
- Source coverage differs by case; blank `source_2` does not mean there is no other relevant literature.

**Data review status:** first-pass coding; all rows need independent review before academic publication. See [methodology](../docs/METHODOLOGY.md) and [annotated sources](../docs/SOURCES.md).
