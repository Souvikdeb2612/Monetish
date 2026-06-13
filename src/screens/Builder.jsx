import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../lib/icons.jsx';
import { useStore } from '../lib/store.jsx';
import { STORE_THEMES, BUILDER_THEMES, BLOCK_TYPES } from '../lib/themes.js';
import { StoreInner } from '../components/StorePreview.jsx';

// ─────────────────────────────────────────── Builder home
export function BuilderHome({ addOpen }) {
  const nav = useNavigate();
  const { state, reorderBlocks, toggleBlock, removeBlock, updateBlock, set } = useStore();
  const { profile, blocks, theme } = state;
  const rowsRef = useRef({});
  const [dragId, setDragId] = useState(null);
  const [showAdd, setShowAdd] = useState(!!addOpen);
  const [editId, setEditId] = useState(null);

  const T = STORE_THEMES[theme] || STORE_THEMES.midnight;

  const onGripDown = (e, id) => {
    e.preventDefault();
    const slots = blocks.map((b) => b.id);
    const homesY = slots.map((bid) => rowsRef.current[bid].getBoundingClientRect().top);
    const startIdx = slots.indexOf(id);
    const startY = e.clientY;
    let liveOrder = slots.slice();
    const me = rowsRef.current[id];
    me.classList.add('dragging');
    setDragId(id);

    const layout = () => {
      slots.forEach((bid, i) => {
        if (bid === id) return;
        const el = rowsRef.current[bid];
        if (el) el.style.transform = `translateY(${homesY[liveOrder.indexOf(bid)] - homesY[i]}px)`;
      });
    };
    const move = (ev) => {
      const dy = ev.clientY - startY;
      me.style.transform = `translateY(${dy}px)`;
      const cur = homesY[startIdx] + dy;
      let nearest = 0, best = Infinity;
      homesY.forEach((y, i) => { const d = Math.abs(y - cur); if (d < best) { best = d; nearest = i; } });
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = slots.filter((k) => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      slots.forEach((bid) => { const el = rowsRef.current[bid]; if (el) { el.style.transition = 'none'; el.style.transform = ''; } });
      me.classList.remove('dragging');
      setDragId(null);
      if (liveOrder.join('|') !== slots.join('|')) reorderBlocks(liveOrder);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        slots.forEach((bid) => { const el = rowsRef.current[bid]; if (el) el.style.transition = ''; });
      }));
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const editingBlock = blocks.find((b) => b.id === editId) || null;

  return (
    <>
      <div className="split">
        <div className="split__main">
          {/* heading + quick actions */}
          <div className="section-title">
            <div>
              <h2>Blocks <small style={{ marginLeft: 6 }}>· drag to reorder</small></h2>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="sk-btn sk-btn--ghost sk-btn--sm" onClick={() => nav('/builder/theme')}>
                <Icon name="palette" size={15} /> Theme · <span style={{ textTransform: 'capitalize' }}>{theme}</span>
              </button>
              <button className="sk-btn sk-btn--lime sk-btn--sm" onClick={() => setShowAdd(true)}>
                <Icon name="plus" size={16} sw={2.4} /> Add block
              </button>
            </div>
          </div>

          {/* block list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {blocks.map((b) => {
              const t = BLOCK_TYPES[b.type] || BLOCK_TYPES.link;
              return (
                <div key={b.id} ref={(el) => { rowsRef.current[b.id] = el; }}
                  className={'sk-card block-row' + (dragId === b.id ? ' dragging' : '')}
                  style={{ padding: '14px 16px 14px 8px', display: 'flex', alignItems: 'center', gap: 12, opacity: b.enabled ? 1 : 0.55 }}>
                  <button onPointerDown={(e) => onGripDown(e, b.id)} className="unbtn"
                    title="Drag to reorder"
                    style={{ display: 'flex', alignItems: 'center', color: 'var(--t3)', padding: '0 4px', cursor: 'grab', touchAction: 'none' }}>
                    <Icon name="grip" size={20} sw={0} fill="currentColor" />
                  </button>
                  <div className="sk-itile" style={{ width: 44, height: 44, background: t.iconBg, borderRadius: 12 }}>
                    <Icon name={t.icon} size={22} color={t.iconColor} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.title}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--t2)', marginTop: 2 }}>{b.meta}</div>
                  </div>
                  {b.price && <span className="sk-chip sk-chip--ink" style={{ height: 28, fontSize: 12.5 }}>{b.price}{b.per}</span>}
                  <button className="unbtn tap" onClick={() => setEditId(b.id)} title="Edit" aria-label="Edit block"
                    style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t2)' }}>
                    <Icon name="settings" size={17} />
                  </button>
                  <button className="unbtn tap" onClick={() => toggleBlock(b.id)} title={b.enabled ? 'Hide' : 'Show'} aria-label={b.enabled ? 'Hide block' : 'Show block'}
                    style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.enabled ? 'var(--lime-deep)' : 'var(--t3)' }}>
                    <Icon name="eye" size={18} />
                  </button>
                  <button className="unbtn tap" onClick={() => { if (confirm(`Delete "${b.title}"?`)) removeBlock(b.id); }} title="Delete" aria-label="Delete block"
                    style={{ width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t3)' }}>
                    <Icon name="trash" size={17} />
                  </button>
                </div>
              );
            })}

            <button className="unbtn tap" onClick={() => setShowAdd(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--r-lg)', border: '1.5px dashed var(--line-strong)', background: 'var(--card-2)' }}>
              <Icon name="plus" size={20} sw={2.4} color="var(--t2)" />
              <span style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--t1)' }}>Add another block</span>
              <span style={{ marginLeft: 'auto', color: 'var(--t3)', fontSize: 12.5, fontWeight: 700 }}>product · course · community · link · text</span>
            </button>
          </div>

          {/* publish strip */}
          <div className="sk-card" style={{ marginTop: 22, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="sk-itile" style={{ width: 48, height: 48, background: 'var(--lime-wash)', borderRadius: 14 }}>
              <Icon name="globe" size={22} color="var(--on-lime)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15 }}>{state.published ? 'Your storefront is live' : 'Publish your storefront'}</div>
              <div style={{ fontSize: 13, color: 'var(--t2)', marginTop: 2 }}>
                {state.published
                  ? 'Changes save automatically — fans always see the latest version.'
                  : "Publish so anyone tapping your bio link sees the storefront."}
              </div>
            </div>
            {!state.published && (
              <button className="sk-btn sk-btn--ink sk-btn--sm" onClick={() => set({ published: true })}>
                Publish
              </button>
            )}
            {state.published && (
              <span className="sk-chip sk-chip--lime" style={{ height: 32 }}>
                <Icon name="check" size={14} sw={2.6} /> Published
              </span>
            )}
          </div>
        </div>

        {/* live preview */}
        <div className="split__aside">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, justifyContent: 'space-between' }}>
            <span className="pill-pulse">Live preview</span>
            <button className="sk-btn sk-btn--ghost sk-btn--sm" onClick={() => nav(`/u/${profile.username}`)}>
              <Icon name="arrowUR" size={14} sw={2.4} /> Open
            </button>
          </div>
          <div className="phoneframe">
            <div className="phoneframe__inner">
              <StoreInner T={T} profile={profile} blocks={blocks} compact />
            </div>
          </div>
        </div>
      </div>

      {showAdd && <AddBlockSheet onClose={() => setShowAdd(false)} />}
      {editingBlock && <EditBlockModal block={editingBlock} onSave={(patch) => { updateBlock(editingBlock.id, patch); setEditId(null); }} onClose={() => setEditId(null)} />}
    </>
  );
}

// ─────────────────────────────────────────── Add block (modal)
function BlockTypeRow({ type, onPick }) {
  const t = BLOCK_TYPES[type];
  return (
    <button className="unbtn tap" onClick={() => onPick(type)}
      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 4px', borderRadius: 12 }}>
      <div className="sk-itile" style={{ width: 48, height: 48, background: t.iconBg, borderRadius: 14 }}>
        <Icon name={t.icon} size={23} color={t.iconColor} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 800, fontSize: 15.5 }}>{t.label}</div>
        <div style={{ fontSize: 13, color: 'var(--t2)', marginTop: 2 }}>{t.sub}</div>
      </div>
      <Icon name="chev" size={20} color="var(--t3)" />
    </button>
  );
}

export function AddBlockSheet({ onClose }) {
  const { addBlock } = useStore();
  const pick = (type) => { addBlock(type); onClose(); };
  const types = ['product', 'course', 'community', 'link', 'text'];
  return (
    <div className="modal-scrim fade-enter" onClick={onClose}>
      <div className="modal sheet-enter" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
          <h2 className="sk-h2">Add a block</h2>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--t2)' }}>What do you want to sell?</span>
        </div>
        <div className="sk-stack" style={{ marginTop: 10 }}>
          {types.map((type, i) => (
            <div key={type}>
              <BlockTypeRow type={type} onPick={pick} />
              {i < types.length - 1 && <div className="sk-hr" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────── Edit existing block
function EditBlockModal({ block, onSave, onClose }) {
  const [title, setTitle] = useState(block.title);
  const [desc, setDesc] = useState(block.desc || '');
  const [price, setPrice] = useState(block.price || '');
  const [per, setPer] = useState(block.per || '');
  const [cta, setCta] = useState(block.cta || '');
  const [badge, setBadge] = useState(block.badge || '');
  const t = BLOCK_TYPES[block.type] || BLOCK_TYPES.link;
  const hasPrice = block.type !== 'link' && block.type !== 'text';

  return (
    <div className="modal-scrim fade-enter" onClick={onClose}>
      <div className="modal sheet-enter" style={{ position: 'relative', maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div className="sk-itile" style={{ width: 44, height: 44, background: t.iconBg, borderRadius: 12 }}>
            <Icon name={t.icon} size={22} color={t.iconColor} />
          </div>
          <div>
            <span className="sk-eyebrow">{t.label}</span>
            <h2 className="sk-h2" style={{ marginTop: 2 }}>Edit block</h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="sk-field">
            <label className="sk-label">Title</label>
            <input className="sk-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          {block.type !== 'text' && (
            <div className="sk-field">
              <label className="sk-label">Description</label>
              <textarea className="sk-input" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Short blurb shown under the title" style={{ minHeight: 72 }} />
            </div>
          )}
          {hasPrice && (
            <div className="grid grid-3">
              <div className="sk-field">
                <label className="sk-label">Price</label>
                <input className="sk-input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="₹499" />
              </div>
              <div className="sk-field">
                <label className="sk-label">Suffix</label>
                <input className="sk-input" value={per} onChange={(e) => setPer(e.target.value)} placeholder="/mo" />
              </div>
              <div className="sk-field">
                <label className="sk-label">CTA</label>
                <input className="sk-input" value={cta} onChange={(e) => setCta(e.target.value)} placeholder="Buy" />
              </div>
            </div>
          )}
          {hasPrice && (
            <div className="sk-field">
              <label className="sk-label">Badge (optional)</label>
              <input className="sk-input" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Bestseller · New · Limited" />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 22, justifyContent: 'flex-end' }}>
          <button className="sk-btn sk-btn--ghost" onClick={onClose}>Cancel</button>
          <button className="sk-btn sk-btn--ink" onClick={() => onSave({ title, desc, price, per, cta, badge })}>
            <Icon name="check" size={17} sw={2.4} color="var(--lime)" /> Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────── Theme picker
function ThemeSwatch({ t, active, onClick }) {
  return (
    <button className="unbtn tap" onClick={onClick}
      style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, padding: 12, borderRadius: 16,
        border: active ? '2px solid var(--ink)' : '2px solid var(--line)', background: active ? 'var(--card)' : 'transparent',
        boxShadow: active ? 'var(--sh-md)' : 'none', width: '100%' }}>
      <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', height: 110, position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', background: t.bg, padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: t.av }} />
          <div style={{ width: '100%', height: 12, borderRadius: t.r > 12 ? 7 : 4, background: t.card, border: t.border }} />
          <div style={{ width: '100%', height: 12, borderRadius: t.r > 12 ? 7 : 4, background: t.accent }} />
          <div style={{ width: '100%', height: 12, borderRadius: t.r > 12 ? 7 : 4, background: t.card, border: t.border }} />
        </div>
        {active && <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={14} color="var(--on-lime)" sw={3} /></div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--t1)' }}>{t.name}</span>
        <span style={{ fontSize: 12, color: 'var(--t2)', fontWeight: 600 }}>{t.r > 12 ? 'Soft' : 'Sharp'}</span>
      </div>
    </button>
  );
}

export function ThemePicker() {
  const nav = useNavigate();
  const { state, set } = useStore();
  const [selected, setSelected] = useState(state.theme);
  const keys = ['midnight', 'daylight', 'sunrise', 'mono'];
  const T = STORE_THEMES[selected] || STORE_THEMES.midnight;

  const apply = () => { set({ theme: selected, published: true }); nav('/builder'); };

  return (
    <div className="split">
      <div className="split__main">
        <div className="section-title">
          <div>
            <h2>Pick a theme</h2>
            <p style={{ fontSize: 13.5, color: 'var(--t2)', marginTop: 4 }}>Theme styles every block — try a few and publish when you're happy.</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="sk-btn sk-btn--ghost sk-btn--sm" onClick={() => nav('/builder')}>Cancel</button>
            <button className="sk-btn sk-btn--ink sk-btn--sm" onClick={apply}>Apply &amp; publish</button>
          </div>
        </div>

        <div className="grid grid-2">
          {keys.map((k) => (
            <ThemeSwatch key={k} t={BUILDER_THEMES[k]} active={selected === k} onClick={() => setSelected(k)} />
          ))}
        </div>

        <div className="sk-card" style={{ padding: 16, marginTop: 22, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <Icon name="sparkle" size={20} color="var(--lime-deep)" style={{ marginTop: 2 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 14.5 }}>About these themes</div>
            <div style={{ fontSize: 13, color: 'var(--t2)', marginTop: 4, lineHeight: 1.5 }}>
              <b>Midnight</b> reads premium — pairs well with fitness, music, premium guides. <b>Daylight</b> is warm & editorial.
              <b> Sunrise</b> is energetic — good for new launches. <b>Mono</b> is for minimalists.
            </div>
          </div>
        </div>
      </div>

      <div className="split__aside">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, justifyContent: 'space-between' }}>
          <span className="pill-pulse">Live preview · {BUILDER_THEMES[selected].name}</span>
        </div>
        <div className="phoneframe">
          <div className="phoneframe__inner">
            <StoreInner T={T} profile={state.profile} blocks={state.blocks} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
