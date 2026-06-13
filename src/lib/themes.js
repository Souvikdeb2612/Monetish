// Storefront themes + block-type metadata for Monetish.

// Builder theme-picker preview swatches (compact).
export const BUILDER_THEMES = {
  midnight: { name: 'Midnight', bg: '#16150F', fg: '#F4F1E9', fg2: '#A8A394', av: '#C7F23E', avT: '#1B2105', card: '#2A2820', border: 'none', accent: '#C7F23E', accentSh: '0 4px 12px rgba(199,242,62,.4)', r: 14, font: "'Bricolage Grotesque',sans-serif" },
  daylight: { name: 'Daylight', bg: '#F4F1E9', fg: '#16150F', fg2: '#6B6657', av: '#16150F', avT: '#C7F23E', card: '#fff', border: '1px solid #E7E2D6', accent: '#FF5A36', accentSh: '0 4px 12px rgba(255,90,54,.32)', r: 14, font: "'Bricolage Grotesque',sans-serif" },
  sunrise: { name: 'Sunrise', bg: 'linear-gradient(170deg,#FFE7DF,#FFF7E8)', fg: '#3A1C12', fg2: '#9A6A55', av: '#FF5A36', avT: '#fff', card: '#fff', border: '1px solid #F3D9CC', accent: '#FF5A36', accentSh: '0 4px 12px rgba(255,90,54,.3)', r: 20, font: "'Bricolage Grotesque',sans-serif" },
  mono: { name: 'Mono', bg: '#FFFFFF', fg: '#111', fg2: '#888', av: '#111', avT: '#fff', card: '#F4F4F4', border: '1px solid #E5E5E5', accent: '#111', accentSh: 'none', r: 6, font: "'Hanken Grotesk',sans-serif" },
};

// Full public-storefront theme tokens (buyer view).
export const STORE_THEMES = {
  midnight: {
    name: 'Midnight', dark: true,
    page: '#16150F', fg: '#F4F1E9', fg2: '#A8A394',
    card: '#211F18', border: '1px solid #312E24', radius: 20,
    avBg: '#C7F23E', avFg: '#1B2105',
    buyBg: '#C7F23E', buyFg: '#1B2105', buySh: '0 6px 18px rgba(199,242,62,.35)',
    badgeBg: '#C7F23E', badgeFg: '#1B2105',
    chipBg: '#312E24', chipFg: '#C7F23E',
    price: '#F4F1E9', glow: 'rgba(199,242,62,.16)',
  },
  daylight: {
    name: 'Daylight', dark: false,
    page: '#F4F1E9', fg: '#16150F', fg2: '#6B6657',
    card: '#FFFFFF', border: '1px solid #E7E2D6', radius: 22,
    avBg: '#16150F', avFg: '#C7F23E',
    buyBg: '#FF5A36', buyFg: '#FFFFFF', buySh: '0 6px 18px rgba(255,90,54,.32)',
    badgeBg: '#FFE7DF', badgeFg: '#C5421F',
    chipBg: '#F1EFE8', chipFg: '#6B6657',
    price: '#16150F', glow: 'rgba(255,90,54,.12)',
  },
  sunrise: {
    name: 'Sunrise', dark: false,
    page: 'linear-gradient(170deg,#FFE7DF,#FFF7E8)', fg: '#3A1C12', fg2: '#9A6A55',
    card: '#FFFFFF', border: '1px solid #F3D9CC', radius: 22,
    avBg: '#FF5A36', avFg: '#FFFFFF',
    buyBg: '#FF5A36', buyFg: '#FFFFFF', buySh: '0 6px 18px rgba(255,90,54,.3)',
    badgeBg: '#FFE7DF', badgeFg: '#C5421F',
    chipBg: '#FBE9DF', chipFg: '#9A6A55',
    price: '#3A1C12', glow: 'rgba(255,90,54,.16)',
  },
  mono: {
    name: 'Mono', dark: false,
    page: '#FFFFFF', fg: '#111111', fg2: '#888888',
    card: '#F4F4F4', border: '1px solid #E5E5E5', radius: 8,
    avBg: '#111111', avFg: '#FFFFFF',
    buyBg: '#111111', buyFg: '#FFFFFF', buySh: 'none',
    badgeBg: '#111111', badgeFg: '#FFFFFF',
    chipBg: '#F0F0F0', chipFg: '#666666',
    price: '#111111', glow: 'rgba(0,0,0,.04)',
  },
};

// Block-type presentation (icon + tile colours) and the picker copy.
export const BLOCK_TYPES = {
  product:   { icon: 'box',    label: 'Digital product', sub: 'Ebook, PDF plan, presets — instant delivery', iconBg: 'var(--lime-wash)', iconColor: 'var(--on-lime)', darkIconBg: '#312E24', darkIconColor: '#C7F23E', lightStoreBg: '#EEF9CE', lightStoreColor: '#5E7A12' },
  course:    { icon: 'course', label: 'Course',          sub: 'Modules, videos & lessons drip-fed to buyers', iconBg: '#E6F0FF', iconColor: '#2E62D6', darkIconBg: '#1E2A47', darkIconColor: '#7FA8FF', lightStoreBg: '#E6F0FF', lightStoreColor: '#2E62D6' },
  community: { icon: 'users',  label: 'Paid community',   sub: 'Recurring access to a private group', iconBg: 'var(--coral-wash)', iconColor: '#C5421F', darkIconBg: '#3A2218', darkIconColor: '#FF8A6B', lightStoreBg: '#FFE7DF', lightStoreColor: '#C5421F' },
  link:      { icon: 'link',   label: 'Link',             sub: 'Send fans anywhere — YouTube, WhatsApp, site', iconBg: 'var(--card-2)', iconColor: 'var(--t1)', darkIconBg: '#312E24', darkIconColor: '#A8A394', lightStoreBg: '#F1EFE8', lightStoreColor: '#6B6657' },
  text:      { icon: 'text',   label: 'Text',             sub: 'A heading or note between your blocks', iconBg: 'var(--card-2)', iconColor: 'var(--t1)', darkIconBg: '#312E24', darkIconColor: '#A8A394', lightStoreBg: '#F1EFE8', lightStoreColor: '#6B6657' },
};
