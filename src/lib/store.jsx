import { createContext, useContext, useEffect, useRef, useState } from 'react';

const KEY = 'monetish-web.state.v1';

// Default demo content — a fitness-coach creator, matching the design.
function makeDefault() {
  return {
    onboarded: false,
    auth: { signedUp: false, email: '' },
    ig: { connected: false, handle: 'aanyamoves' },
    payout: { connected: false },
    profile: {
      username: 'aanyamoves',
      displayName: 'Aanya Kapoor',
      bio: 'Home-workout coach 🏋️‍♀️ Helping busy Indians get fit in 20 min a day. No gym, no excuses.',
      photo: null,
      socials: ['instagram', 'youtube'],
      followers: '184k',
      verified: true,
    },
    theme: 'midnight',
    published: false,
    blocks: [
      { id: 'b1', type: 'product',   title: '12-Week Home Workout Plan', meta: 'Digital product', desc: 'PDF + video · instant access', price: '₹499', per: '', cta: 'Buy', badge: 'Bestseller', enabled: true },
      { id: 'b2', type: 'course',    title: 'Fat-Loss Bootcamp',         meta: 'Course · 6 modules', desc: '6 modules · 40 videos', price: '₹2,999', per: '', cta: 'Enroll', badge: '', enabled: true },
      { id: 'b3', type: 'community', title: 'The Inner Circle',           meta: 'Community', desc: 'Private group · 1,200 members', price: '₹299', per: '/mo', cta: 'Join', badge: '', enabled: true },
      { id: 'b4', type: 'link',      title: 'Free: 5-min morning routine', meta: 'Link · YouTube', desc: 'YouTube', price: '', per: '', cta: 'Open', badge: '', enabled: true },
      { id: 'b5', type: 'text',      title: 'Welcome note',                meta: 'Text', desc: '', price: '', per: '', cta: '', badge: '', enabled: false },
    ],
    automations: [
      { id: 'a1', keyword: 'PLAN',  status: 'Active', sends: 342, ctr: '71%', dm: "Yes! Here's your 12-week plan 💪 Tap below to grab it 👇", productId: 'b1', alsoReply: true },
      { id: 'a2', keyword: 'JOIN',  status: 'Active', sends: 156, ctr: '64%', dm: "Welcome to the Inner Circle! 🔥 Tap below to join the community 👇", productId: 'b3', alsoReply: true },
      { id: 'a3', keyword: 'GUIDE', status: 'Draft',  sends: 0,   ctr: '—',   dm: "Here's your free guide 👇", productId: 'b1', alsoReply: false },
    ],
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...makeDefault(), ...JSON.parse(raw) };
  } catch {}
  return makeDefault();
}

const StoreCtx = createContext(null);

export function StoreProvider({ children }) {
  const [state, setState] = useState(load);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const api = {
    state,
    set: (patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })),
    setProfile: (patch) => setState((s) => ({ ...s, profile: { ...s.profile, ...patch } })),

    // blocks
    addBlock: (type, extra = {}) => setState((s) => {
      const id = 'b' + Date.now().toString(36);
      const defaults = {
        product:   { title: 'New digital product', meta: 'Digital product', desc: 'Instant delivery', price: '₹499', cta: 'Buy' },
        course:    { title: 'New course',           meta: 'Course', desc: 'Modules & videos', price: '₹1,999', cta: 'Enroll' },
        community: { title: 'New community',         meta: 'Community', desc: 'Private group', price: '₹199', per: '/mo', cta: 'Join' },
        link:      { title: 'New link',              meta: 'Link', desc: 'External link', cta: 'Open' },
        text:      { title: 'New text block',        meta: 'Text', desc: '' },
      }[type] || {};
      const block = { id, type, per: '', badge: '', price: '', enabled: true, ...defaults, ...extra };
      return { ...s, blocks: [...s.blocks, block] };
    }),
    updateBlock: (id, patch) => setState((s) => ({ ...s, blocks: s.blocks.map((b) => b.id === id ? { ...b, ...patch } : b) })),
    removeBlock: (id) => setState((s) => ({ ...s, blocks: s.blocks.filter((b) => b.id !== id) })),
    toggleBlock: (id) => setState((s) => ({ ...s, blocks: s.blocks.map((b) => b.id === id ? { ...b, enabled: !b.enabled } : b) })),
    reorderBlocks: (order) => setState((s) => {
      const map = Object.fromEntries(s.blocks.map((b) => [b.id, b]));
      return { ...s, blocks: order.map((id) => map[id]).filter(Boolean) };
    }),

    // automations
    addAutomation: (extra = {}) => {
      const id = 'a' + Date.now().toString(36);
      const auto = { id, keyword: '', status: 'Draft', sends: 0, ctr: '—', dm: "Here's the link you asked for 👇", productId: null, alsoReply: true, ...extra };
      setState((s) => ({ ...s, automations: [...s.automations, auto] }));
      return id;
    },
    updateAutomation: (id, patch) => setState((s) => ({ ...s, automations: s.automations.map((a) => a.id === id ? { ...a, ...patch } : a) })),
    removeAutomation: (id) => setState((s) => ({ ...s, automations: s.automations.filter((a) => a.id !== id) })),
    toggleAutomation: (id) => setState((s) => ({ ...s, automations: s.automations.map((a) => a.id === id ? { ...a, status: a.status === 'Active' ? 'Draft' : 'Active' } : a) })),

    reset: () => setState(makeDefault()),
  };

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
