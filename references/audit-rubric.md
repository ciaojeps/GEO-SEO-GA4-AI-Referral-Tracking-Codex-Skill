# GEO SEO Audit Rubric

Use this heuristic rubric only when scoring is useful. Adjust weights for the goal. Record sampled pages and checked criteria. Mark unavailable checks N/A, disclose coverage, and omit an overall score if missing evidence would make it misleading. This measures readiness, not actual rankings or AI citations.

## Default Score Weights

- AI citability and answer extraction: 25
- Entity/brand authority signals: 20
- Content quality and E-E-A-T: 20
- Technical SEO foundations: 15
- Structured data and entity graph: 10
- Platform/readiness coverage: 10

## Technical SEO Foundations

Check:
- HTTP status, HTTPS, canonical, title, meta description, robots meta.
- `robots.txt` exists and does not accidentally block important pages.
- XML sitemap exists, is linked in robots.txt, and includes canonical URLs.
- Important pages reachable within a shallow click path.
- Multilingual pages include reciprocal `hreflang` and usually `x-default`.
- Open Graph and Twitter metadata exist for shareability.
- Images include meaningful alt text where content-bearing.
- Client-side rendering does not hide primary content from simple crawlers.

Red flags:
- Missing or conflicting canonical.
- Entire site blocked with `Disallow: /`.
- Key pages noindexed.
- Language alternates missing or pointing to wrong locale.
- Duplicate title/description across important pages.

## AI Crawler Access

Check robots rules for common AI/search user agents:
- `Googlebot`, `bingbot`
- `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`
- `PerplexityBot`
- `ClaudeBot`
- `Google-Extended`
- `Applebot`, `Applebot-Extended`
- `CCBot`

Interpretation:
- Blocking `Googlebot` or `bingbot` is usually critical.
- Blocking search-specific AI bots reduces AI search discoverability.
- Blocking training-related bots can be an intentional policy choice; ask before changing if the intent is unclear.

## Citability

High-citability content has:
- Answer-first section openings.
- Self-contained paragraphs that name the subject directly.
- Concrete facts: dates, names, roles, locations, clients, measurable outcomes.
- Short paragraphs and clean heading hierarchy.
- Tables/lists for comparisons and processes.
- Clear “who”, “what”, “how”, “where”, “why”, and “best for” answers.

Weak signals:
- Abstract positioning without concrete proof.
- Long cinematic copy with few facts.
- Pronouns or references that require previous paragraphs.
- Missing author/person/company context.

## Entity Authority

For a personal brand, verify:
- Full name, current role, company, location or market, experience, and topical areas.
- `sameAs` links to LinkedIn, GitHub, company site, and credible profiles.
- Clients/projects/proof are visible and described accurately.
- The site distinguishes personal profile from company services.
- A clear relationship to the company entity exists.

For an organization, verify:
- Official name, logo, URL, description, contact, social profiles, founders, services/products, and areas served.

## Structured Data

Recommended by entity:
- Personal site: `Person`, `ProfilePage`, `WebSite`, optional `Organization` for employer/company relationship.
- Company/service site: `Organization` or `LocalBusiness`, `WebSite`, `Service`, `FAQPage` where real FAQs exist.
- Blog/article: `Article` or `BlogPosting` with `author`, `publisher`, `datePublished`, `dateModified`.
- SaaS: `SoftwareApplication`, `Product` only when it matches the product model.

JSON-LD should be valid, server-rendered when possible, and consistent with visible page content.

## llms.txt

Treat `llms.txt` as optional when clear canonical pages are worth presenting to AI systems. Do not penalize its absence as an indexing or AI visibility failure.

Good `llms.txt`:
- Starts with `# Site or Entity Name`.
- Has a one-paragraph blockquote summary.
- Uses sections such as `## About`, `## Services`, `## Docs`, `## Blog`, `## Contact`.
- Lists absolute URLs with short factual descriptions.
- Avoids dumping every URL.

## Priority Labels

- `P0`: Crawling/indexing/entity identity broken.
- `P1`: Major discoverability, trust, schema, or citability issue.
- `P2`: Meaningful improvement to snippets, internal links, content depth, or clarity.
- `P3`: Minor polish.
