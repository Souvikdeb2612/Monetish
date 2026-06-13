import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../lib/icons.jsx';
import { useStore } from '../lib/store.jsx';
import { BLOCK_TYPES } from '../lib/themes.js';

function Toggle({ on, onClick }) {
  return (
    <button className={'toggle' + (on ? ' on' : '')} onClick={onClick} aria-pressed={on} />
  );
}

function AutoCard({ a, onOpen, onToggle }) {
  const on = a.status === 'Active';
  return (
    <div className="sk-card tap" onClick={onOpen} style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="sk-chip sk-chip--ink" style={{ height: 32, fontSize: 13, fontFamily: 'var(--display)', fontWeight: 700, letterSpacing: '0.02em' }}>
          <Icon name="msg" size={14} color="var(--lime)" /> {a.keyword || 'KEYWORD'}
        </span>
        <Icon name="chev" size={17} color="var(--t3)" />
        <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--t2)' }}>auto-DM</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: on ? 'var(--lime-deep)' : 'var(--t3)' }} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: on ? 'var(--lime-deep)' : 'var(--t3)' }}>{a.status}</span>
        </div>
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--t2)', marginTop: 12, lineHeight: 1.5,
        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        “{a.dm}”
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
        <div>
          <div className="sk-num" style={{ fontSize: 18 }}>{a.sends}</div>
          <div style={{ fontSize: 11.5, color: 'var(--t2)', fontWeight: 600 }}>sent · 7d</div>
        </div>
        <div>
          <div className="sk-num" style={{ fontSize: 18, color: 'var(--coral)' }}>{a.ctr}</div>
          <div style={{ fontSize: 11.5, color: 'var(--t2)', fontWeight: 600 }}>tap rate</div>
        </div>
        <div style={{ marginLeft: 'auto' }} onClick={(e) => e.stopPropagation()}>
          <Toggle on={on} onClick={onToggle} />
        </div>
      </div>
    </div>
  );
}

export function AutomationsList() {
  const nav = useNavigate();
  const { state, toggleAutomation, addAutomation } = useStore();
  const create = () => { const id = addAutomation(); nav(`/automations/${id}`); };
  return (
    <>
      {/* metrics strip */}
      <div className="grid grid-3" style={{ marginBottom: 22 }}>
        <div className="sk-card kpi">
          <div className="kpi__label">DMs sent · 7 days</div>
          <div className="kpi__value">1,204</div>
          <div className="kpi__delta">+22% vs last week</div>
        </div>
        <div className="sk-card sk-card--ink kpi" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(199,242,62,.18), transparent 70%)' }} />
          <div className="kpi__label" style={{ color: 'var(--on-ink-2)', position: 'relative' }}>Sales from DMs</div>
          <div className="kpi__value" style={{ color: 'var(--lime)', position: 'relative' }}>₹61,400</div>
          <div className="kpi__delta" style={{ color: 'var(--lime)', position: 'relative' }}>67% of weekly revenue</div>
        </div>
        <div className="sk-card kpi">
          <div className="kpi__label">Active automations</div>
          <div className="kpi__value">{state.automations.filter((a) => a.status === 'Active').length}</div>
          <div style={{ fontSize: 13, color: 'var(--t2)', fontWeight: 600, marginTop: 4 }}>of {state.automations.length} total · @{state.ig.handle}</div>
        </div>
      </div>

      <div className="section-title">
        <h2>Your automations</h2>
        <button className="sk-btn sk-btn--lime sk-btn--sm" onClick={create}>
          <Icon name="plus" size={16} sw={2.4} /> New automation
        </button>
      </div>

      <div className="grid grid-2">
        {state.automations.map((a) => (
          <AutoCard key={a.id} a={a} onOpen={() => nav(`/automations/${a.id}`)} onToggle={() => toggleAutomation(a.id)} />
        ))}
        <button className="unbtn tap" onClick={create}
          style={{ minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
            borderRadius: 'var(--r-lg)', border: '1.5px dashed var(--line-strong)', background: 'var(--card-2)', color: 'var(--t2)' }}>
          <Icon name="plus" size={26} sw={2.4} />
          <span style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--t1)' }}>Add a new keyword</span>
          <span style={{ fontSize: 12.5, color: 'var(--t2)' }}>e.g. PLAN · JOIN · GUIDE · BOOK</span>
        </button>
      </div>

      <div className="sk-card" style={{ marginTop: 22, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--lime-wash)', border: 'none' }}>
        <Icon name="shield" size={20} color="var(--on-lime)" style={{ marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 800, color: 'var(--on-lime)' }}>Plays by Instagram's rules — always.</div>
          <div style={{ fontSize: 13, color: '#2D3A05', lineHeight: 1.5, marginTop: 4 }}>
            DMs fire only after a fan comments your keyword, only inside the 24-hour window, once per person. Official Graph API · respects rate limits automatically.
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────── Editor
function GuardRow({ children }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <Icon name="check" size={16} color="var(--lime-deep)" sw={2.6} style={{ marginTop: 2, flex: '0 0 auto' }} />
      <span style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

function StepNum({ n }) {
  return (
    <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--ink)', color: 'var(--lime)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--display)', fontWeight: 800, fontSize: 13 }}>{n}</span>
  );
}

export function AutomationEdit() {
  const nav = useNavigate();
  const { id } = useParams();
  const { state, updateAutomation, removeAutomation } = useStore();
  const auto = state.automations.find((a) => a.id === id);
  const sellable = state.blocks.filter((b) => b.price);
  const [keyword, setKeyword] = useState(auto?.keyword || '');
  const [dm, setDm] = useState(auto?.dm || '');
  const [productId, setProductId] = useState(auto?.productId || sellable[0]?.id || null);
  const [alsoReply, setAlsoReply] = useState(auto?.alsoReply ?? true);

  if (!auto) return <Navigate to="/automations" replace />;

  const product = state.blocks.find((b) => b.id === productId) || sellable[0];

  const save = (turnOn) => {
    updateAutomation(id, {
      keyword: keyword.toUpperCase().trim(),
      dm, productId, alsoReply,
      status: turnOn ? 'Active' : auto.status,
    });
    nav('/automations');
  };
  const del = () => { if (confirm('Delete this automation?')) { removeAutomation(id); nav('/automations'); } };

  return (
    <div className="split">
      <div className="split__main">
        <div className="section-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button className="unbtn" onClick={() => nav('/automations')} aria-label="Back"
              style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid var(--line-strong)', background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="back" size={18} />
            </button>
            <h2>{auto.status === 'Active' ? 'Edit automation' : 'New automation'}</h2>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="sk-btn sk-btn--ghost sk-btn--sm" onClick={del} style={{ color: 'var(--coral)' }}>
              <Icon name="trash" size={15} /> Delete
            </button>
            <button className="sk-btn sk-btn--lime sk-btn--sm" disabled={!keyword.trim()} onClick={() => save(true)}>
              {auto.status === 'Active' ? 'Save' : 'Turn on'}
            </button>
          </div>
        </div>

        {/* Step 1 — trigger */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <StepNum n={1} />
            <span style={{ fontWeight: 800, fontSize: 15 }}>When a fan comments…</span>
          </div>
          <div className="sk-card" style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'center' }}>
            <div className="sk-field">
              <label className="sk-label">Keyword</label>
              <input value={keyword} onChange={(e) => setKeyword(e.target.value.toUpperCase())} placeholder="PLAN" maxLength={20}
                className="sk-input"
                style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 20, letterSpacing: '0.04em' }} />
            </div>
            <div className="sk-field">
              <label className="sk-label">On which post</label>
              <div className="sk-input" style={{ alignItems: 'center', gap: 10 }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#FEDA75,#D62976 60%,#4F5BD5)', display: 'inline-block', flex: '0 0 auto' }} />
                <span style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', height: '100%' }}>Latest reel · @{state.ig.handle}</span>
                <Icon name="chev" size={16} style={{ marginLeft: 'auto', color: 'var(--t3)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 — DM */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <StepNum n={2} />
            <span style={{ fontWeight: 800, fontSize: 15 }}>Send this DM, instantly</span>
          </div>
          <div className="sk-card" style={{ padding: 16 }}>
            <label className="sk-label">Message</label>
            <textarea value={dm} onChange={(e) => setDm(e.target.value)} rows={3}
              className="sk-input" placeholder="Here's the link you asked for 👇" style={{ marginTop: 6 }} />
            <label className="sk-label" style={{ marginTop: 12 }}>Attach a product link</label>
            <div className="grid grid-2" style={{ marginTop: 6, gap: 10 }}>
              {sellable.map((b) => {
                const t = BLOCK_TYPES[b.type] || BLOCK_TYPES.link;
                const active = b.id === productId;
                return (
                  <button key={b.id} className="unbtn tap" onClick={() => setProductId(b.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 14,
                      border: active ? '2px solid var(--ink)' : '1.5px solid var(--line-strong)', background: active ? 'var(--card)' : 'transparent' }}>
                    <div className="sk-itile" style={{ width: 38, height: 38, background: t.iconBg, borderRadius: 11 }}>
                      <Icon name={t.icon} size={19} color={t.iconColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--t2)' }}>{b.price}{b.per}</div>
                    </div>
                    {active && <Icon name="check" size={18} color="var(--lime-deep)" sw={2.6} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3 — option: public reply */}
        <div className="sk-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="sk-itile" style={{ width: 42, height: 42, background: 'var(--card-2)', borderRadius: 12, flex: '0 0 auto' }}><Icon name="msg" size={20} color="var(--t1)" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5 }}>Also reply to their comment</div>
            <div style={{ fontSize: 13, color: 'var(--t2)', marginTop: 2 }}>“Check your DMs! 📩” · boosts the reel in IG's algorithm</div>
          </div>
          <Toggle on={alsoReply} onClick={() => setAlsoReply((v) => !v)} />
        </div>
      </div>

      {/* Right pane: phone DM preview + guardrails */}
      <div className="split__aside" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="sk-card" style={{ padding: 16 }}>
          <span className="sk-eyebrow">DM Preview</span>
          <div style={{ background: 'var(--ink)', borderRadius: 'var(--r-md)', padding: 16, marginTop: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#FEDA75,#D62976 60%,#4F5BD5)', flex: '0 0 auto' }} />
              <div style={{ background: 'var(--on-ink)', color: 'var(--ink)', borderRadius: '14px 14px 14px 4px', padding: '10px 13px', fontSize: 13.5, lineHeight: 1.45, maxWidth: 240 }}>
                {dm || "Here's the link you asked for 👇"}
              </div>
            </div>
            {product && (
              <div style={{ background: 'var(--ink-soft)', borderRadius: 12, padding: 11, marginTop: 12, marginLeft: 40, display: 'flex', alignItems: 'center', gap: 10, maxWidth: 260 }}>
                <div className="sk-itile" style={{ width: 36, height: 36, background: '#312E24', borderRadius: 10 }}>
                  <Icon name={(BLOCK_TYPES[product.type] || BLOCK_TYPES.link).icon} size={18} color="var(--lime)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--on-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--on-ink-2)' }}>monetish.bio/{state.profile.username} · {product.price}{product.per}</div>
                </div>
                <Icon name="arrowUR" size={14} color="var(--lime)" sw={2.4} />
              </div>
            )}
          </div>
        </div>

        <div className="sk-card" style={{ padding: 16, background: 'var(--lime-wash)', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Icon name="shield" size={17} color="var(--on-lime)" />
            <span style={{ fontWeight: 800, fontSize: 13.5, color: 'var(--on-lime)' }}>Plays by Instagram's rules</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <GuardRow>Only fires after <b>they</b> comment — never a cold DM.</GuardRow>
            <GuardRow>Sent inside the <b>24-hour window</b>, once per person.</GuardRow>
            <GuardRow>Official Graph API · respects rate limits automatically.</GuardRow>
          </div>
        </div>
      </div>
    </div>
  );
}
