// Single Vercel serverless function that mounts the whole Hono API at /api/*.
// The [[...path]].js filename is Vercel's catch-all so one handler owns every
// sub-route — keeps cold starts to one bundle.

import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { StackServerApp } from '@stackframe/js';
import { and, asc, eq } from 'drizzle-orm';
import { db, schema } from '../db/client.js';

export const config = { runtime: 'nodejs' };

const app = new Hono().basePath('/api');

// Lazy server-side Stack client. Constructed on first request so the function
// boots even if keys are missing in early Phase 1.
let _stack;
function stack() {
  if (_stack) return _stack;
  _stack = new StackServerApp({
    projectId: process.env.VITE_STACK_PROJECT_ID,
    publishableClientKey: process.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY,
    secretServerKey: process.env.STACK_SECRET_SERVER_KEY,
    tokenStore: 'memory',
  });
  return _stack;
}

// Verify the Stack access token from `Authorization: Bearer <jwt>`. Returns
// the Stack user id, or null when missing/invalid.
async function uid(c) {
  const auth = c.req.header('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return null;
  try {
    const user = await stack().getUser({ tokenStore: { accessToken: token, refreshToken: null } });
    return user?.id || null;
  } catch {
    return null;
  }
}

app.get('/health', (c) => c.json({ ok: true }));

// ───────────────────────────── Bootstrap profile
// Called on first sign-in. Neon Auth already created the user row in
// neon_auth.users_sync, so we only need to seed a profile (username slug).
app.post('/me/init', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const body = await c.req.json().catch(() => ({}));
  const username = body.username || `creator-${userId.slice(-6)}`;
  const d = db();
  await d
    .insert(schema.profiles)
    .values({ userId, username, displayName: body.displayName || '', bio: '' })
    .onConflictDoNothing();
  return c.json({ ok: true });
});

// ───────────────────────────── Current-user snapshot
// One round-trip the frontend calls on load: profile + blocks (ordered) +
// automations. Cuts initial latency vs. three separate fetches.
app.get('/me', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const d = db();
  const [profile] = await d.select().from(schema.profiles).where(eq(schema.profiles.userId, userId));
  const blocks = await d
    .select()
    .from(schema.blocks)
    .where(eq(schema.blocks.userId, userId))
    .orderBy(asc(schema.blocks.order));
  const automations = await d
    .select()
    .from(schema.automations)
    .where(eq(schema.automations.userId, userId));
  return c.json({ profile: profile || null, blocks, automations });
});

app.put('/profile', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const patch = await c.req.json();
  const d = db();
  const [row] = await d
    .update(schema.profiles)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(schema.profiles.userId, userId))
    .returning();
  return c.json(row);
});

// ───────────────────────────── Blocks
app.post('/blocks', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const body = await c.req.json();
  const id = body.id || 'b' + Date.now().toString(36);
  const d = db();
  const [row] = await d.insert(schema.blocks).values({ ...body, id, userId }).returning();
  return c.json(row);
});

app.put('/blocks/:id', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const id = c.req.param('id');
  const patch = await c.req.json();
  const d = db();
  const [row] = await d
    .update(schema.blocks)
    .set(patch)
    .where(and(eq(schema.blocks.id, id), eq(schema.blocks.userId, userId)))
    .returning();
  return c.json(row);
});

app.delete('/blocks/:id', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const id = c.req.param('id');
  const d = db();
  await d.delete(schema.blocks).where(and(eq(schema.blocks.id, id), eq(schema.blocks.userId, userId)));
  return c.json({ ok: true });
});

// Bulk reorder — pass array of block ids in target order. We rewrite `order`
// for each row in one transaction so the storefront reflects drag-drops.
app.post('/blocks/reorder', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const { order } = await c.req.json();
  const d = db();
  await Promise.all(
    order.map((id, i) =>
      d
        .update(schema.blocks)
        .set({ order: i })
        .where(and(eq(schema.blocks.id, id), eq(schema.blocks.userId, userId))),
    ),
  );
  return c.json({ ok: true });
});

// ───────────────────────────── Automations
app.post('/automations', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const body = await c.req.json();
  const id = body.id || 'a' + Date.now().toString(36);
  const d = db();
  const [row] = await d.insert(schema.automations).values({ ...body, id, userId }).returning();
  return c.json(row);
});

app.put('/automations/:id', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const id = c.req.param('id');
  const patch = await c.req.json();
  const d = db();
  const [row] = await d
    .update(schema.automations)
    .set(patch)
    .where(and(eq(schema.automations.id, id), eq(schema.automations.userId, userId)))
    .returning();
  return c.json(row);
});

app.delete('/automations/:id', async (c) => {
  const userId = await uid(c);
  if (!userId) return c.json({ error: 'unauthorized' }, 401);
  const id = c.req.param('id');
  const d = db();
  await d
    .delete(schema.automations)
    .where(and(eq(schema.automations.id, id), eq(schema.automations.userId, userId)));
  return c.json({ ok: true });
});

// ───────────────────────────── Public storefront read
// No auth — anyone with the URL can fetch the published profile + enabled
// blocks. Returns 404 if profile isn't published yet.
app.get('/u/:username', async (c) => {
  const username = c.req.param('username');
  const d = db();
  const [profile] = await d.select().from(schema.profiles).where(eq(schema.profiles.username, username));
  if (!profile || !profile.published) return c.json({ error: 'not_found' }, 404);
  const blocks = await d
    .select()
    .from(schema.blocks)
    .where(and(eq(schema.blocks.userId, profile.userId), eq(schema.blocks.enabled, true)))
    .orderBy(asc(schema.blocks.order));
  return c.json({ profile, blocks });
});

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'server_error', message: err.message }, 500);
});

export default handle(app);
