// Monetish — inline Lucide-style icon set. Hand-drawn so icons render crisply
// at any size. Carried over from the design prototype's shared kit.

export const ICONS = {
  // nav / chrome
  back: '<path d="M15 5l-7 7 7 7"/>',
  chev: '<path d="M9 5l7 7-7 7"/>',
  chevDown: '<path d="M6 9l6 6 6-6"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  grip: '<circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/>',
  more: '<circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/>',
  arrowUR: '<path d="M7 17L17 7M8 7h9v9"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  trash: '<path d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13"/>',
  // auth / contact
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/>',
  phone: '<path d="M6 3h4l2 5-3 2a13 13 0 006 6l2-3 5 2v4a2 2 0 01-2 2A17 17 0 014 6a2 2 0 012-3z"/>',
  // blocks / commerce
  link: '<path d="M9 15l6-6"/><path d="M11 6l1-1a4 4 0 016 6l-1 1"/><path d="M13 18l-1 1a4 4 0 01-6-6l1-1"/>',
  box: '<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',
  course: '<path d="M3 6.5L12 3l9 3.5L12 10 3 6.5z"/><path d="M7 9v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V9"/><path d="M21 6.5V12"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0111 0"/><path d="M16 5.2a3.2 3.2 0 010 6M17.5 19a5.5 5.5 0 00-2-4.3"/>',
  text: '<path d="M5 6h14M5 6v-.5M8 6v13M16 6v13M13 19h6M5 19h6"/>',
  // states / trust
  shield: '<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2.2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  bank: '<path d="M4 10h16M5 10l7-5 7 5M6 10v8M10 10v8M14 10v8M18 10v8M4 20h16"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
  // social / share
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>',
  google: '<path d="M21 12.2c0-.7-.06-1.2-.18-1.8H12v3.4h5.1c-.1.9-.66 2.2-1.9 3.1l-.02.1 2.8 2.1.2.02C19.9 17.5 21 15.1 21 12.2z" fill="#4285F4" stroke="none"/><path d="M12 21c2.5 0 4.6-.8 6.1-2.2l-2.9-2.2c-.8.5-1.8.9-3.2.9-2.4 0-4.5-1.6-5.2-3.9l-.1.01-3 2.3-.04.1A9 9 0 0012 21z" fill="#34A853" stroke="none"/><path d="M6.8 13.6c-.2-.5-.3-1-.3-1.6s.1-1.1.28-1.6l-.01-.1-3-2.3-.1.05A9 9 0 003 12c0 1.5.35 2.8.96 4l2.84-2.4z" fill="#FBBC05" stroke="none"/><path d="M12 6.6c1.7 0 2.85.7 3.5 1.3l2.56-2.5C16.6 3.9 14.5 3 12 3A9 9 0 003.96 8l2.84 2.4C7.5 8.2 9.6 6.6 12 6.6z" fill="#EA4335" stroke="none"/>',
  youtube: '<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="M10.5 9.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none"/>',
  share: '<path d="M12 15V4M8.5 7.5L12 4l3.5 3.5"/><path d="M6 12v6a2 2 0 002 2h8a2 2 0 002-2v-6"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h3v3M20 14v6M14 20h3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  palette: '<path d="M12 3a9 9 0 100 18c1.2 0 2-.9 2-2 0-1.3-1-1.8-1-2.8 0-.7.6-1.2 1.4-1.2H17a4 4 0 004-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="16.3" cy="10" r="1.1" fill="currentColor" stroke="none"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.2"/>',
  store: '<path d="M4 9l1-4h14l1 4M4 9v10h16V9M4 9h16M4 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5l1.2 2.4 2.6-.5.5 2.6 2.4 1.2-1.3 2.3 1.3 2.3-2.4 1.2-.5 2.6-2.6-.5L12 21.5l-1.2-2.4-2.6.5-.5-2.6L5.3 15.8l1.3-2.3-1.3-2.3 2.4-1.2.5-2.6 2.6.5z"/>',
  msg: '<path d="M4 5h16v11H8l-4 3.5z"/>',
  heart: '<path d="M12 20s-7-4.6-7-9.5A3.7 3.7 0 0112 7a3.7 3.7 0 017 3.5C19 15.4 12 20 12 20z"/>',
  dumbbell: '<path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/>',
  trend: '<path d="M3 17l5-5 4 3 7-8M16 7h5v5"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
  at: '<circle cx="12" cy="12" r="4"/><path d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.5 7.1"/>',
  filter: '<path d="M3 5h18l-7 8v5l-4 2v-7z"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"/>',
  logout: '<path d="M10 4H6a2 2 0 00-2 2v12a2 2 0 002 2h4"/><path d="M14 8l4 4-4 4"/><path d="M18 12H9"/>',
};

export function Icon({ name, size = 22, color = 'currentColor', sw = 1.9, fill = 'none', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}
      dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }} />
  );
}
