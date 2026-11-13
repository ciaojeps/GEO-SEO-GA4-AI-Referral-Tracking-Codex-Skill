import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyAiReferral as detect } from '../scripts/ai-referral.mjs';
const landingUrl = 'https://example.com/services';
for (const [label, input, source, method] of [
  ['ChatGPT referral', { referrer: 'https://chatgpt.com/c/123' }, 'chatgpt', 'referrer'],
  ['legacy ChatGPT', { referrer: 'https://chat.openai.com/' }, 'chatgpt', 'referrer'],
  ['bounded subdomain', { referrer: 'https://www.perplexity.ai/' }, 'perplexity', 'referrer'],
  ['case and trailing dot', { referrer: 'https://CHATGPT.COM./' }, 'chatgpt', 'referrer'],
  ['exact UTM', { landingUrl: landingUrl + '?utm_source=ChatGPT' }, 'chatgpt', 'utm_source'],
  ['UTM precedence', { landingUrl: landingUrl + '?utm_source=claude', referrer: 'https://chatgpt.com/' }, 'claude', 'utm_source'],
  ['lookalike suffix', { referrer: 'https://chatgpt.com.evil.example/' }, null],
  ['lookalike prefix', { referrer: 'https://fakechatgpt.com/' }, null],
  ['corporate page', { referrer: 'https://openai.com/blog/' }, null],
  ['Google organic', { referrer: 'https://www.google.com/search?q=test' }, null],
  ['direct', {}, null],
  ['malformed', { referrer: 'not a url' }, null],
  ['non HTTP', { referrer: 'javascript:alert(1)' }, null],
  ['self referral', { landingUrl: 'https://chatgpt.com/', referrer: 'https://chatgpt.com/c/1' }, null],
  ['substring UTM', { landingUrl: landingUrl + '?utm_source=mychatgpt' }, null],
  ['campaign conflict', { landingUrl: landingUrl + '?utm_source=newsletter', referrer: 'https://chatgpt.com/' }, null],
  ['duplicate source', { landingUrl: landingUrl + '?utm_source=chatgpt&utm_source=claude' }, null],
  ['ad campaign', { landingUrl: landingUrl + '?gclid=example', referrer: 'https://chatgpt.com/' }, null],
  ['invalid landing', { landingUrl: 'broken', referrer: 'https://chatgpt.com/' }, null],
]) {
  test(label, () => {
    const result = detect({ landingUrl, ...input });
    if (source === null) assert.equal(result, null);
    else {
      assert.equal(result.ai_source, source);
      assert.equal(result.ai_detected_by, method);
      assert.deepEqual(Object.keys(result).sort(), ['ai_detected_by', 'ai_referrer_host', 'ai_source']);
    }
  });
}
test('output excludes raw path, query and personal subdomains', () => {
  assert.deepEqual(detect({ landingUrl, referrer: 'https://personal-name.chatgpt.com/private?email=test@example.com' }),
    { ai_source: 'chatgpt', ai_detected_by: 'referrer', ai_referrer_host: 'chatgpt.com' });
});
