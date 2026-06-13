import { useNavigate } from 'react-router-dom';
import { Icon } from '../lib/icons.jsx';
import { Avatar } from '../components/kit.jsx';
import { useStore } from '../lib/store.jsx';

// ─────────────────────────────────────────── Insights
export function Insights() {
  const { state } = useStore();
  const sales = [
    { label: 'Mon', v: 0.4, amt: '₹6.8k' },
    { label: 'Tue', v: 0.7, amt: '₹11.9k' },
    { label: 'Wed', v: 0.5, amt: '₹8.5k' },
    { label: 'Thu', v: 0.9, amt: '₹15.4k' },
    { label: 'Fri', v: 1.0, amt: '₹17.1k' },
    { label: 'Sat', v: 0.75, amt: '₹12.7k' },
    { label: 'Sun', v: 0.6, amt: '₹10.2k' },
  ];
  const top = state.blocks.filter((b) => b.price).slice(0, 4);

  return (
    <>
      {/* hero: earnings + sparkline */}
      <div className="grid grid-2" style={{ marginBottom: 22 }}>
        <div className="sk-card sk-card--ink kpi" style={{ position: 'relative', overflow: 'hidden', padding: 26 }}>
          <div style={{ position: 'absolute', top: -60, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(199,242,62,.18), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <div className="kpi__label" style={{ color: 'var(--on-ink-2)' }}>Earnings this week</div>
            <div className="kpi__value" style={{ color: 'var(--lime)', fontSize: 48 }}>₹84,200</div>
            <div className="kpi__delta" style={{ color: 'var(--lime)' }}>
              <Icon name="trend" size={16} color="var(--lime)" /> +18% vs last week
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 96, marginTop: 22 }}>
              {sales.map((d) => (
                <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div title={d.amt} style={{ width: '100%', height: `${d.v * 100}%`, background: d.v === 1 ? 'var(--lime)' : 'rgba(244,241,233,.22)', borderRadius: 6 }} />
                  <span style={{ fontSize: 10.5, color: 'var(--on-ink-2)', fontWeight: 600 }}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { ic: 'eye',   n: '12.4k', l: 'Store views',        d: '+8% vs last week' },
            { ic: 'users', n: '892',   l: 'New buyers',         d: '+24% vs last week' },
            { ic: 'bolt',  n: '67%',   l: 'Sales coming from DMs', d: 'auto-DM conversion' },
            { ic: 'heart', n: '4.8',   l: 'Avg buyer rating',   d: '321 reviews · 7d' },
          ].map(({ ic, n, l, d }) => (
            <div key={l} className="sk-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="sk-itile" style={{ width: 44, height: 44, background: 'var(--card-2)', borderRadius: 12 }}>
                <Icon name={ic} size={20} color="var(--t1)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: 'var(--t2)', fontWeight: 600 }}>{l}</div>
                <div className="sk-num" style={{ fontSize: 22, marginTop: 2 }}>{n}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--t2)', textAlign: 'right', maxWidth: 110 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* top products */}
      <div className="section-title"><h2>Top products · last 7 days</h2><small>By revenue</small></div>
      <div className="sk-card" style={{ padding: 4 }}>
        <div className="row" style={{ gridTemplateColumns: '40px 1fr 100px 100px 130px', color: 'var(--t2)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <span>#</span><span>Product</span><span>Price</span><span style={{ textAlign: 'right' }}>Sales</span><span style={{ textAlign: 'right' }}>Revenue</span>
        </div>
        {top.map((b, i) => {
          const sales = [124, 86, 53, 22][i] || 12;
          const rev = sales * parseInt(String(b.price).replace(/[^0-9]/g, '') || '0', 10);
          return (
            <div key={b.id} className="row" style={{ gridTemplateColumns: '40px 1fr 100px 100px 130px' }}>
              <span className="sk-num" style={{ fontSize: 16, color: 'var(--t3)' }}>{i + 1}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{b.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--t2)' }}>{b.meta}</div>
              </div>
              <span className="sk-num" style={{ fontSize: 15, color: 'var(--t1)' }}>{b.price}{b.per}</span>
              <span className="sk-num" style={{ fontSize: 15, textAlign: 'right' }}>{sales}</span>
              <span className="sk-num" style={{ fontSize: 15, textAlign: 'right', color: 'var(--coral)' }}>₹{rev.toLocaleString('en-IN')}</span>
            </div>
          );
        })}
      </div>

      {/* payouts strip */}
      <div className="sk-card" style={{ marginTop: 22, padding: 22, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div className="sk-itile" style={{ width: 56, height: 56, background: 'var(--lime-wash)', borderRadius: 16 }}>
          <Icon name="bank" size={26} color="var(--on-lime)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>Next payout · in 2 days</div>
          <div style={{ fontSize: 13.5, color: 'var(--t2)', marginTop: 2 }}>
            Razorpay will settle <b className="sk-num" style={{ color: 'var(--t1)' }}>₹84,200</b> directly to your linked bank account. 0% transaction fee.
          </div>
        </div>
        <button className="sk-btn sk-btn--ghost sk-btn--sm"><Icon name="arrowUR" size={14} sw={2.4} /> Razorpay dashboard</button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────── Settings
function SettingsRow({ icon, title, value, ok, onClick }) {
  return (
    <button className="unbtn tap" onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px' }}>
      <div className="sk-itile" style={{ width: 40, height: 40, background: 'var(--card-2)', borderRadius: 11 }}><Icon name={icon} size={20} color="var(--t1)" /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5 }}>{title}</div>
        {value && <div style={{ fontSize: 12.5, color: 'var(--t2)', marginTop: 2 }}>{value}</div>}
      </div>
      {ok != null && (
        <span className={'sk-chip ' + (ok ? 'sk-chip--lime' : '')} style={{ height: 28, fontSize: 12 }}>
          {ok ? <><Icon name="check" size={14} sw={2.6} /> Connected</> : 'Not set'}
        </span>
      )}
      <Icon name="chev" size={18} color="var(--t3)" />
    </button>
  );
}

export function Settings() {
  const nav = useNavigate();
  const { state, reset, set } = useStore();
  const { profile } = state;
  const restart = () => { if (confirm('Reset all demo data and restart onboarding?')) { reset(); nav('/signup'); } };
  const signOut = () => { set({ onboarded: false }); nav('/signup'); };

  return (
    <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* profile card */}
        <div className="sk-card" style={{ padding: 22, display: 'flex', alignItems: 'center', gap: 18 }}>
          <Avatar size={64} label={(profile.displayName[0] || 'A').toUpperCase()} bg="var(--ink)" color="var(--lime)" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{profile.displayName}</div>
            <div style={{ fontSize: 13.5, color: 'var(--t2)' }}>monetish.bio/{profile.username}</div>
          </div>
          <button className="sk-btn sk-btn--ghost sk-btn--sm" onClick={() => nav('/profile')}>
            <Icon name="settings" size={15} /> Edit profile
          </button>
        </div>

        {/* connections */}
        <div>
          <div className="section-title"><h2>Connections</h2></div>
          <div className="sk-card" style={{ padding: 0, overflow: 'hidden' }}>
            <SettingsRow icon="instagram" title="Instagram" value={`@${state.ig.handle} · keyword auto-DM enabled`} ok={state.ig.connected} onClick={() => nav('/connect-instagram')} />
            <div className="sk-hr" />
            <SettingsRow icon="bank" title="Razorpay payouts" value="Merchant of record · 0% transaction fee" ok={state.payout.connected} onClick={() => nav('/payout')} />
            <div className="sk-hr" />
            <SettingsRow icon="palette" title="Theme" value={state.theme[0].toUpperCase() + state.theme.slice(1)} onClick={() => nav('/builder/theme')} />
          </div>
        </div>

        {/* account / danger */}
        <div>
          <div className="section-title"><h2>Account</h2></div>
          <div className="sk-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="sk-itile" style={{ width: 40, height: 40, background: 'var(--card-2)', borderRadius: 11 }}><Icon name="logout" size={20} color="var(--t1)" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5 }}>Sign out</div>
                <div style={{ fontSize: 13, color: 'var(--t2)' }}>Returns you to the login screen. Your data stays saved.</div>
              </div>
              <button className="sk-btn sk-btn--ghost sk-btn--sm" onClick={signOut}>Sign out</button>
            </div>
            <div className="sk-hr" />
            <div style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="sk-itile" style={{ width: 40, height: 40, background: 'var(--card-2)', borderRadius: 11 }}><Icon name="trash" size={20} color="var(--coral)" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5 }}>Restart demo</div>
                <div style={{ fontSize: 13, color: 'var(--t2)' }}>Wipes all data and sends you back to onboarding.</div>
              </div>
              <button className="sk-btn sk-btn--ghost sk-btn--sm" onClick={restart} style={{ color: 'var(--coral)' }}>Restart</button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--t3)', padding: '12px 0' }}>Monetish · web v0.1 demo</div>
      </div>

      {/* sidebar: plan + brand reminders */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="sk-card sk-card--ink" style={{ padding: 22, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(199,242,62,.18), transparent 70%)' }} />
          <div style={{ position: 'relative' }}>
            <span className="sk-chip sk-chip--lime" style={{ marginBottom: 14 }}><Icon name="bolt" size={13} sw={2.2} /> Creator plan</span>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 28, color: 'var(--on-ink)', letterSpacing: '-0.02em' }}>
              ₹499<span style={{ fontSize: 15, color: 'var(--on-ink-2)' }}>/month</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--on-ink-2)', marginTop: 8, lineHeight: 1.5 }}>
              Flat subscription. We never take a cut of your sales — that's how 0% transaction fees work.
            </div>
            <button className="sk-btn sk-btn--lime sk-btn--block sk-btn--sm" style={{ marginTop: 16 }}>Manage billing</button>
          </div>
        </div>

        <div className="sk-card" style={{ padding: 18 }}>
          <span className="sk-eyebrow">Why 0%</span>
          <div style={{ fontWeight: 800, marginTop: 6, fontSize: 14.5 }}>You are the merchant of record</div>
          <div style={{ fontSize: 13, color: 'var(--t2)', marginTop: 8, lineHeight: 1.5 }}>
            Funds settle to your bank via Razorpay. Monetish never holds, routes, or touches your money — so there's no cut to take.
          </div>
        </div>

        <div className="sk-card" style={{ padding: 18 }}>
          <span className="sk-eyebrow">Need help?</span>
          <div style={{ fontWeight: 800, marginTop: 6, fontSize: 14.5 }}>We answer in 24h on weekdays</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <span className="sk-chip" style={{ height: 32 }}><Icon name="mail" size={14} /> help@monetish.bio</span>
            <span className="sk-chip" style={{ height: 32 }}><Icon name="msg" size={14} /> DM @monetish</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
