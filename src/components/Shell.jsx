import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '../lib/icons.jsx';
import { Avatar, BrandMark } from './kit.jsx';
import { useStore } from '../lib/store.jsx';

const NAV = [
  { key: 'builder',     label: 'Storefront', icon: 'store',    to: '/builder' },
  { key: 'automations', label: 'Auto-DM',    icon: 'bolt',     to: '/automations' },
  { key: 'insights',    label: 'Insights',   icon: 'trend',    to: '/insights' },
  { key: 'settings',    label: 'Settings',   icon: 'settings', to: '/settings' },
];

const PAGE_META = {
  builder:     { eyebrow: 'Your storefront', title: 'Storefront builder' },
  automations: { eyebrow: 'Instagram',       title: 'Auto-DM automations' },
  insights:    { eyebrow: 'Last 7 days',     title: 'Insights' },
  settings:    { eyebrow: 'Account',         title: 'Settings' },
};

function Sidebar({ page }) {
  const { state } = useStore();
  const nav = useNavigate();
  return (
    <aside className="side">
      <div className="side__brand"><BrandMark size={22} /></div>

      <nav className="side__nav">
        <div className="side__sect">Studio</div>
        {NAV.map((n) => (
          <NavLink key={n.key} to={n.to} className={page === n.key ? 'on' : ''}>
            <Icon name={n.icon} size={19} sw={1.9} /> {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="side__foot">
        <div className="side__live">
          <div className="side__live-row">
            <span className="pill-pulse" style={{ color: 'var(--on-ink-2)' }}>
              <span style={{ marginLeft: 4 }}>{state.published ? 'Live' : 'Draft'}</span>
            </span>
          </div>
          <div className="side__live-url">
            monetish.bio/{state.profile.username}
          </div>
          <button className="sk-btn sk-btn--lime sk-btn--sm sk-btn--block" style={{ position: 'relative', zIndex: 1 }}
            onClick={() => nav(`/u/${state.profile.username}`)}>
            <Icon name="arrowUR" size={14} sw={2.4} /> View live
          </button>
        </div>

        <div className="side__user">
          <Avatar size={36} label={(state.profile.displayName[0] || 'A').toUpperCase()} bg="var(--ink)" color="var(--lime)" />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{state.profile.displayName}</div>
            <div style={{ fontSize: 12, color: 'var(--t2)' }}>Creator · ₹499/mo</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ page, right }) {
  const { state } = useStore();
  const nav = useNavigate();
  const [copied, setCopied] = useState(false);
  const link = `monetish.bio/${state.profile.username}`;
  const copy = () => {
    navigator.clipboard?.writeText('https://' + link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const meta = PAGE_META[page] || { eyebrow: '', title: '' };
  return (
    <header className="top">
      <div className="top__title">
        <span className="sk-eyebrow">{meta.eyebrow}</span>
        <h1>{meta.title}</h1>
      </div>
      <div className="top__spacer" />
      <div className="top__actions">
        <div className="top__link" title="Your public storefront link">
          <Icon name="globe" size={16} color="var(--t2)" />
          <span className="top__link-url">{copied ? 'Link copied!' : link}</span>
          <button className="top__link-btn" onClick={copy} aria-label="Copy link"><Icon name="copy" size={15} /></button>
          <button className="top__link-btn top__link-btn--ink" onClick={() => nav(`/u/${state.profile.username}`)} aria-label="Open storefront"><Icon name="arrowUR" size={15} color="var(--lime)" sw={2.2} /></button>
        </div>
        {right}
      </div>
    </header>
  );
}

export function Shell({ page, children, topRight }) {
  return (
    <div className="app">
      <Sidebar page={page} />
      <main>
        <Topbar page={page} right={topRight} />
        <div className="workspace">{children}</div>
      </main>
    </div>
  );
}
