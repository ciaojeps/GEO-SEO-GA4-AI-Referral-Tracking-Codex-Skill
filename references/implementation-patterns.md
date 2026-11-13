# GEO SEO Implementation Patterns

Use these patterns when editing a website repo.

## Discovery Commands

Prefer fast local inspection:

```bash
rg --files -g 'package.json' -g 'src/**' -g 'app/**' -g 'pages/**' -g 'public/**' -g 'astro.config.*' -g 'next.config.*' -g 'vite.config.*'
rg -n "title|description|canonical|robots|sitemap|schema|json-ld|og:|hreflang|llms" .
```

For local running sites:

```bash
curl -I http://localhost:PORT/
curl -s http://localhost:PORT/ | sed -n '1,160p'
curl -s http://localhost:PORT/robots.txt
curl -s http://localhost:PORT/sitemap.xml
curl -s http://localhost:PORT/llms.txt
```

## Metadata

Each canonical page should have:
- Unique title, typically 45-65 characters when possible.
- Meta description that explains the entity/page and includes concrete terms.
- Canonical URL.
- `og:title`, `og:description`, `og:type`, `og:url`, and useful `og:image`.
- Correct `<html lang>`.

For multilingual pages:
- Reciprocal `hreflang` links for every locale.
- `x-default` for the default language/market.
- Canonicals should point to the same-language canonical, not always the default locale.

## JSON-LD Patterns

Personal website baseline:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Full Name",
    "jobTitle": "CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "Company Name",
      "url": "https://company.example"
    },
    "url": "https://person.example",
    "sameAs": [
      "https://www.linkedin.com/in/example/",
      "https://github.com/example"
    ],
    "knowsAbout": [
      "Software development",
      "AI integration",
      "Computer Vision",
      "Automation"
    ]
  }
}
```

Organization baseline:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://company.example",
  "logo": "https://company.example/logo.png",
  "description": "Concise factual company description.",
  "sameAs": ["https://www.linkedin.com/company/example/"],
  "knowsAbout": ["Topic A", "Topic B"]
}
```

Rules:
- JSON-LD facts must match visible content.
- Use absolute URLs.
- Avoid fake ratings, fake FAQs, or claims not visible on the page.
- Prefer one coherent entity graph over disconnected snippets.

## robots.txt

Baseline:

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

Review each crawler's current official purpose before editing bot-specific rules. Search crawling, user-triggered retrieval and model training have separate controls. Never bulk-allow training bots as an SEO fix. A specific user-agent group can override the wildcard group: preserve protected paths when adding a group.

## llms.txt

Optionally create `/llms.txt` in `public/` or the static output folder when useful for canonical content discovery. It is not required for Google AI features and does not guarantee citations.

Template:

```txt
# Entity or Site Name

> One concise factual sentence explaining who/what this site is and who it serves.

## About
- [Primary profile/about page](https://example.com/): What this page covers.

## Key Pages
- [Page title](https://example.com/page): Short factual description.

## Contact
- [Contact](https://example.com/contact): How to contact the entity.
```

## Content Edits for GEO

Rewrite sections to:
- Put the direct answer in the first sentence.
- Include specific names, dates, roles, technologies, sectors, and proof.
- Use headings that map to likely AI queries.
- Keep paragraphs independently understandable.
- Add internal links from high-authority pages to key pages.

## Verification

After edits:
- Run the repo's lint/build/test commands.
- Confirm generated or served files include expected head tags and static files.
- For React/Vite/SPA apps, inspect actual rendered HTML and whether metadata is set at runtime only.
