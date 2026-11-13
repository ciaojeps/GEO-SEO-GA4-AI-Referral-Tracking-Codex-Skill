# GA4 AI referral measurement

## Native reporting first

Google announced the native **AI Assistant** channel on May 13, 2026, with medium `ai-assistant` and campaign `(ai-assistant)` for recognized AI referrers. First inspect the current Traffic acquisition report using Session default channel group and Session source / medium. Compare landing pages, sessions, engagement and key events. Recheck official documentation when using this reference; account/UI availability may differ.

Use a custom channel group only for a stated gap or business definition. Document source allowlist, ordering and differences from the native channel. Do not overwrite campaign/source attribution or add internal UTMs. A diagnostic event does not change GA4 session attribution.

Missing referrers/tags cannot be reconstructed. Google search referrals do not identify AI Overviews/AI Mode clicks. Server-log bot requests are not human sessions. Direct-traffic spikes are hypotheses, not proof of AI visits.

## Optional tested classifier

`scripts/ai-referral.mjs` exports `classifyAiReferral({ landingUrl, referrer })`. It performs no network calls, reads no cookies/storage and sends no analytics. It returns normalized source, detection method and evidence hostname, or null. These are observed signals, not authenticated provenance.

Hosts use exact or dot-bounded subdomain matching. Corporate domains such as openai.com and anthropic.com are excluded: a corporate blog click is not necessarily an assistant referral. UTM aliases use exact allowlisted values. Unknown/ambiguous UTM sources and existing non-AI campaign tags suppress referrer fallback. Exclude generic `source` and `ref` parameters unless the site's documented conventions justify them.

Local usage with optional Node.js 18+:

```js
import { classifyAiReferral } from './scripts/ai-referral.mjs';
classifyAiReferral({
  landingUrl: 'https://example.com/services?utm_source=chatgpt',
  referrer: ''
});
// { ai_source: 'chatgpt', ai_detected_by: 'utm_source', ai_referrer_host: '' }
```

Adapt the function to the project's bundler and existing analytics/CMP. If the host cannot execute supporting files, use the source as an implementation reference. Do not promise automatic installation or execution.

## Integration

1. Inspect existing gtag/GTM, SPA routing, cross-domain setup and consent handling. Avoid duplicate tags/events.
2. Classify external landings using the original landing URL/referrer. Do not overwrite context on every SPA route. If persistence is needed and permitted, store only normalized source, detection method and emission state in sessionStorage; guard storage failures.
3. Emit at most one `ai_referral_detected` event per defined visit/tab lifecycle through existing analytics, respecting consent. Define deduplication and expiration; sessionStorage is not a GA4 session boundary. If analytics consent is denied, do not persist or emit this diagnostic event. Handle later consent through the CMP's approved callback.
4. Send low-cardinality parameters such as `ai_source` and `ai_detected_by`. Never send raw referrer URLs, query strings, prompts, arbitrary UTM values, identifiers or personal data as custom parameters. Audit automatic page_location/page_referrer collection too; sanitizing custom fields alone is insufficient.
5. Register event-scoped custom dimensions used for reporting. Google says processing can take up to 48 hours after registration. Validate in DebugView/GTM preview before publishing.

Test genuine assistant referrers, aliases, case/trailing-dot hostnames, subdomains, corporate links, lookalike domains, malformed URLs, direct and Google organic visits, campaign conflicts, SPA navigation, denied/later-granted consent and unavailable storage. Inspect network payloads for duplicates and personal data. Use preview or a test property; do not generate production test traffic without agreement.

Run pure-function checks with `node --test tests/ai-referral.test.mjs`.

## Primary sources (checked 2026-11-13)

- [GA4 release notes](https://support.google.com/analytics/answer/9164320?hl=en)
- [Custom event parameters](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters)
- [Analytics PII guidance](https://support.google.com/analytics/answer/6366371/)
- [Consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [Google Search AI features](https://developers.google.com/search/docs/appearance/ai-features)
