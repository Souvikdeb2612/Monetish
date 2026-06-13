// Thin fetch wrapper that attaches the Clerk session token to every request.
// The store layer calls these instead of touching `fetch` directly so the
// auth wiring stays in one spot.

let _getToken = null;

// Called once from a component that has access to Clerk's useAuth() — keeps
// this module framework-agnostic and side-effect free at import time.
export function bindAuth(getToken) {
  _getToken = getToken;
}

async function req(path, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('content-type', 'application/json');
  if (_getToken) {
    const t = await _getToken().catch(() => null);
    if (t) headers.set('authorization', `Bearer ${t}`);
  }
  const r = await fetch('/api' + path, { ...init, headers });
  if (!r.ok) {
    const text = await r.text().catch(() => '');
    throw new Error(`API ${r.status}: ${text || r.statusText}`);
  }
  return r.json();
}

export const api = {
  initUser: (body) => req('/me/init', { method: 'POST', body: JSON.stringify(body) }),
  me: () => req('/me'),
  updateProfile: (patch) => req('/profile', { method: 'PUT', body: JSON.stringify(patch) }),
  addBlock: (block) => req('/blocks', { method: 'POST', body: JSON.stringify(block) }),
  updateBlock: (id, patch) => req('/blocks/' + id, { method: 'PUT', body: JSON.stringify(patch) }),
  removeBlock: (id) => req('/blocks/' + id, { method: 'DELETE' }),
  reorderBlocks: (order) => req('/blocks/reorder', { method: 'POST', body: JSON.stringify({ order }) }),
  addAutomation: (a) => req('/automations', { method: 'POST', body: JSON.stringify(a) }),
  updateAutomation: (id, patch) => req('/automations/' + id, { method: 'PUT', body: JSON.stringify(patch) }),
  removeAutomation: (id) => req('/automations/' + id, { method: 'DELETE' }),
  publicStorefront: (username) => req('/u/' + encodeURIComponent(username)),
};
