# GEO SEO Report Template

Use this structure for user-facing reports. Keep it concise unless the user asks for a full deliverable.

## Executive Summary

- Scope: target, date, sampled URLs/page types and access limits.
- Optional heuristic readiness score with checked-criteria coverage; omit if evidence is insufficient.
- Current position: one paragraph.
- Biggest constraint: one sentence.
- Fastest win: one sentence.

## Scores

| Area | Score | Notes |
|---|---:|---|
| AI citability | NN/25 | |
| Entity authority | NN/20 | |
| Content/E-E-A-T | NN/20 | |
| Technical SEO | NN/15 | |
| Structured data | NN/10 | |
| Platform readiness | NN/10 | |

## Findings

List findings by priority:

```markdown
### P1: Finding Title
Evidence: concrete page/file/URL evidence, observation and date.
Confidence: confirmed / inferred / unverified.
Impact: why it matters for SEO/GEO.
Fix: exact recommended change.
```

## Quick Wins

- 3-7 fixes that can be done quickly.
- Include files or URLs when known.

## Implementation Backlog

| Priority | Item | Owner/Area | Effort |
|---|---|---|---|
| P0/P1/P2 | Task | Code/content/schema | S/M/L |

## Suggested Copy / Markup

Include only the snippets needed:
- Title/meta rewrites.
- JSON-LD block.
- robots.txt or llms.txt.
- Section copy rewrites.

## Verification

List commands run and results, or checks the user should run.

## Measurement and limitations

Separate observed citations, measurable referral clicks and readiness recommendations. State missing access/data, native GA4 coverage and attribution limits. No visibility or ranking guarantees.
