// Pure renderer for the buyer-view storefront. Used by both the public
// /u/:username route (Storefront.jsx) and the in-app live preview inside the
// builder so the creator sees exactly what fans will see.

import { Icon } from '../lib/icons.jsx';
import { BLOCK_TYPES } from '../lib/themes.js';

export function StoreCard({ T, block, onBuy }) {
  const t = BLOCK_TYPES[block.type] || BLOCK_TYPES.link;
  const iconBg = T.dark ? t.darkIconBg : t.lightStoreBg;
  const iconColor = T.dark ? t.darkIconColor : t.lightStoreColor;
  if (block.type === 'text') {
    return (
      <div style={{ padding: '2px 4px' }}>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 15, color: T.fg, letterSpacing: '-0.02em' }}>{block.title}</div>
      </div>
    );
  }
  return (
    <div style={{ background: T.card, border: T.border, borderRadius: T.radius, padding: 15, position: 'relative' }}>
      {block.badge && (
        <span style={{ position: 'absolute', top: -9, left: 16, background: T.badgeBg, color: T.badgeFg,
          fontWeight: 800, fontSize: 10.5, letterSpacing: '0.04em', textTransform: 'uppercase',
          padding: '3px 9px', borderRadius: 99 }}>{block.badge}</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="sk-itile" style={{ width: 44, height: 44, background: iconBg, borderRadius: 13, flex: '0 0 auto' }}>
          <Icon name={t.icon} size={22} color={iconColor} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 16, color: T.fg, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{block.title}</div>
          <div style={{ fontSize: 12.5, color: T.fg2, marginTop: 3 }}>{block.desc || block.meta}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
        {block.price && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <span className="sk-num" style={{ fontSize: 22, color: T.price }}>{block.price}</span>
            {block.per && <span style={{ fontSize: 12.5, color: T.fg2, fontWeight: 600 }}>{block.per}</span>}
          </div>
        )}
        <button onClick={() => onBuy && onBuy(block)} style={{ marginLeft: 'auto', height: 40, padding: '0 18px', borderRadius: 99, border: 'none',
          background: T.buyBg, color: T.buyFg, boxShadow: T.buySh, fontFamily: 'var(--sans)', fontWeight: 800,
          fontSize: 13.5, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {block.cta || 'Buy'} <Icon name="arrowUR" size={15} sw={2.4} />
        </button>
      </div>
    </div>
  );
}

export function StoreInner({ T, profile, blocks, onBuy, compact }) {
  const visible = blocks.filter((b) => b.enabled);
  const pad = compact ? '14px 18px 18px' : '20px 24px 24px';
  return (
    <div style={{ width: '100%', height: '100%', background: T.page, color: T.fg, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ padding: pad, position: 'relative' }}>
        <div style={{ position: 'absolute', top: -30, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${T.glow}, transparent 68%)`, pointerEvents: 'none' }} />
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: T.avBg, color: T.avFg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontWeight: 800, fontSize: 30, boxShadow: '0 6px 18px rgba(0,0,0,.18)' }}>{(profile.displayName[0] || 'A').toUpperCase()}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12 }}>
          <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 22, color: T.fg, letterSpacing: '-0.03em' }}>{profile.displayName}</span>
          {profile.verified && <span style={{ width: 18, height: 18, borderRadius: '50%', background: T.buyBg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={11} color={T.buyFg} sw={3.4} /></span>}
        </div>
        <p style={{ fontSize: 13.5, color: T.fg2, marginTop: 6, lineHeight: 1.45, maxWidth: 320 }}>{profile.bio}</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {profile.socials.map((s) => (
            <span key={s} style={{ width: 36, height: 36, borderRadius: 11, background: T.chipBg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={s} size={18} color={T.fg} />
            </span>
          ))}
          <span style={{ height: 36, borderRadius: 11, background: T.chipBg, color: T.chipFg, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 12px', fontWeight: 800, fontSize: 12.5 }}>
            <Icon name="users" size={15} /> {profile.followers}
          </span>
        </div>
      </div>

      <div style={{ flex: 1, padding: compact ? '4px 18px 16px' : '8px 24px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {visible.map((b) => <StoreCard key={b.id} T={T} block={b} onBuy={onBuy} />)}
        {visible.length === 0 && (
          <div style={{ textAlign: 'center', color: T.fg2, fontSize: 13, padding: '24px 0' }}>No blocks yet — add one from the builder.</div>
        )}
      </div>

      <div style={{ padding: '14px 24px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: T.fg2 }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: T.fg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 8.5l7-3.5 7 3.5-7 3.5z" fill={T.dark ? T.page : '#F4F1E9'} /></svg>
          </span>
          Powered by Monetish · Secure UPI checkout
        </span>
      </div>
    </div>
  );
}
