# Pilot case dataset — codebook

**File:** `cases.csv` | **Original cutoff:** 2026-10-18; Albania review: 2026-10-20 | **Rows:** 12 | **Unit of analysis:** one *selected protest campaign/wave*.

These are manually coded qualitative observations intended for research practice and case-comparison design. They are **not** NAVCO data and should never be used to estimate worldwide campaign success rates or train a predictive model.

## Columns

| Column | Type | Meaning |
| --- | --- | --- |
| `case_id` | text, unique | Stable case identifier (e.g. `ALB-2018`). |
| `country` | text | Geographic political unit; Hong Kong is a territory. |
| `campaign` | text | Short label for the focal mobilization. |
| `start_year`, `end_year` | integer | Coarse boundaries of the coded wave, **not** incident dates. |
| `status` | `completed` / `ongoing` | Status of the specified wave as of the cutoff. |
| `campaign_style` | `predominantly_nonviolent` / `mixed_or_armed` / `uncertain` | **Provisional** researcher impression of protesters' action repertoire; mixed does not imply all participants were violent. State violence alone does not change the protesters' classification. |
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


## Campaign-style uncertainty and revision — 20 October 2026

`uncertain` means the reviewed evidence cannot establish the dominant protester repertoire for the specified campaign. It does not mean nonviolent, armed, or absent violence. Exclude uncertain rows from binary tactic comparisons; retain them in descriptive inventories with an explicit label.

ALB-2026 changed from `mixed_or_armed` to `uncertain`; ongoing/unresolved remains unchanged. Violent episodes are documented, but event-level evidence cannot establish campaign-wide predominance. A narrower October wave could warrant a different provisional code after explicit boundary review. State repression is never evidence of protesters' methods. Other style codes were not revalidated by this targeted review.

See the [dated evidence ledger and 2018–2026 comparison](../docs/ALBANIA_REVIEW_2026-10-20.md). The original cutoff still applies to unrevised cases.
