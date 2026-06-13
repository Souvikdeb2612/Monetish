// Shared atoms for the web app. Mobile-only chrome (StatusBar, Home indicator)
// is intentionally dropped — the web shell uses Sidebar + Topbar instead.

export function Avatar({ size = 56, label = '', bg = 'var(--ink)', color = 'var(--lime)', ring, src, style }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg,
      backgroundImage: src ? `url(${src})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
      color, fontFamily: 'var(--display)', fontWeight: 800, fontSize: size * 0.4, letterSpacing: '-0.03em',
      boxShadow: ring ? `0 0 0 3px ${ring}` : 'none', overflow: 'hidden', ...style }}>
      {!src && label}
    </div>
  );
}

export function BrandMark({ color = 'var(--ink)', accent = 'var(--lime)', size = 26, showWord = true }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size * 1.12, height: size * 1.12, borderRadius: 8, background: color, flex: '0 0 auto' }}>
        <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" fill="none">
          <path d="M5 8.5l7-3.5 7 3.5-7 3.5z" fill={accent}/>
          <path d="M5 12.5l7 3.5 7-3.5" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M5 16l7 3.5 7-3.5" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </span>
      {showWord && (
        <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: size * 0.92, letterSpacing: '-0.04em', color }}>monetish</span>
      )}
    </span>
  );
}
