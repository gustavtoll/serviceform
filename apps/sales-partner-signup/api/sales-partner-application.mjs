import { createPilotService } from './pilot-core.mjs';

const service = createPilotService({});

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 12_000) throw new Error('body too large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  let payload;
  try {
    payload = await readJson(req);
  } catch {
    return res.status(400).json({ error: 'Invalid request.' });
  }
  const result = await service.submit(payload, {
    origin: req.headers.origin,
    host: req.headers.host,
    ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '',
  });
  return res.status(result.status).json(result.body);
}
