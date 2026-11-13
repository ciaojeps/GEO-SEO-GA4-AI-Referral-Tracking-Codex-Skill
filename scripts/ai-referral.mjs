// Pure diagnostic helper. No network, storage, telemetry or analytics side effects.
const hosts = new Map([
  ['chatgpt.com', 'chatgpt'], ['chat.openai.com', 'chatgpt'],
  ['perplexity.ai', 'perplexity'], ['gemini.google.com', 'gemini'],
  ['claude.ai', 'claude'], ['copilot.microsoft.com', 'copilot'],
  ['copilot.com', 'copilot'], ['you.com', 'you'],
  ['chat.deepseek.com', 'deepseek'], ['grok.com', 'grok']
]);
const aliases = new Map([
  ['chatgpt', 'chatgpt'], ['perplexity', 'perplexity'],
  ['gemini', 'gemini'], ['claude', 'claude'], ['copilot', 'copilot'],
  ['you', 'you'], ['deepseek', 'deepseek'], ['grok', 'grok'], ...hosts
]);
function parseHttp(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url : null;
  } catch { return null; }
}
export function classifyAiReferral({ landingUrl, referrer = '' } = {}) {
  const landing = parseHttp(landingUrl);
  if (!landing) return null;
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'gclid', 'dclid', 'gbraid', 'wbraid', 'msclkid'];
  const sources = landing.searchParams.getAll('utm_source');
  if (sources.length === 1) {
    const source = aliases.get(sources[0].trim().toLowerCase());
    if (source) return { ai_source: source, ai_detected_by: 'utm_source', ai_referrer_host: '' };
  }
  // Unknown or ambiguous campaign attribution precedes a referrer guess.
  if (campaignKeys.some(key => landing.searchParams.has(key))) return null;
  const refer = parseHttp(referrer);
  if (!refer) return null;
  const host = refer.hostname.toLowerCase().replace(/\.$/, '');
  if (host === landing.hostname.toLowerCase().replace(/\.$/, '')) return null;
  for (const [domain, source] of hosts) {
    if (host === domain || host.endsWith('.' + domain)) {
      // Emit the allowlisted root, never a user-controlled subdomain/path/query.
      return { ai_source: source, ai_detected_by: 'referrer', ai_referrer_host: domain };
    }
  }
  return null;
}
