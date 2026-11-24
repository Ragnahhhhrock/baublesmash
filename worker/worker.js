// Bauble Smash high scores — Cloudflare Worker + KV (binding: SCORES)
const ORIGINS = ['https://baublesmash.com', 'https://www.baublesmash.com'];
const KEY = 'top';
const MAX = 10;
const MAX_SCORE = 5000;
const MAX_LEVEL = 99;

function cors(req) {
  const o = req.headers.get('Origin');
  return {
    'access-control-allow-origin': ORIGINS.includes(o) ? o : ORIGINS[0],
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type',
    'vary': 'Origin',
  };
}
const json = (req, body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...cors(req) } });

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
    if (url.pathname !== '/scores') return json(req, { error: 'not found' }, 404);

    let list = (await env.SCORES.get(KEY, 'json')) || [];
    if (req.method === 'GET') return json(req, { scores: list });

    if (req.method === 'POST') {
      const o = req.headers.get('Origin');
      if (!ORIGINS.includes(o)) return json(req, { error: 'forbidden' }, 403);
      let b;
      try { b = await req.json(); } catch { return json(req, { error: 'bad json' }, 400); }
      const score = Math.floor(Number(b.score));
      if (!Number.isFinite(score) || score < 1 || score > MAX_SCORE) return json(req, { error: 'bad score' }, 400);
      const name = String(b.name || 'Anon').replace(/[^\p{L}\p{N} _.-]/gu, '').trim().slice(0, 12) || 'Anon';
      const level = Math.min(MAX_LEVEL, Math.max(1, Math.floor(Number(b.level)) || 1));
      list.push({ name, score, level, t: Date.now() });
      list.sort((a, c) => c.score - a.score || a.t - c.t);
      list = list.slice(0, MAX);
      await env.SCORES.put(KEY, JSON.stringify(list));
      return json(req, { scores: list });
    }
    return json(req, { error: 'method' }, 405);
  },
};
