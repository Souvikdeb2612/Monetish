import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../lib/icons.jsx';
import { Avatar, BrandMark } from '../components/kit.jsx';
import { useStore } from '../lib/store.jsx';

function Progress({ n, of }) {
  return (
    <div className="onb__progress" aria-label={`Step ${n} of ${of}`}>
      {Array.from({ length: of }).map((_, i) => (
        <span key={i} className={i + 1 === n ? 'cur' : i + 1 < n ? 'on' : ''} />
      ))}
    </div>
  );
}

function StepHeader({ n, of }) {
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 8 }}>
      <button className="unbtn" onClick={() => nav(-1)} aria-label="Back"
        style={{ width: 42, height: 42, borderRadius: '50%', border: '1.5px solid var(--line-strong)',
          background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="back" size={20} />
      </button>
      <Progress n={n} of={of} />
      <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: 'var(--t2)' }}>Step {n}/{of}</span>
    </div>
  );
}

// Big visual side panel — reused across every onboarding screen.
function HeroPanel({ children, eyebrow = 'For Indian creators' }) {
  return (
    <aside className="onb__hero">
      <BrandMark color="var(--lime)" accent="var(--ink)" size={26} />
      <span className="sk-chip sk-chip--lime" style={{ width: 'fit-content', zIndex: 1 }}>
        <Icon name="bolt" size={13} sw={2.2} /> {eyebrow}
      </span>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 460 }}>
        {children}
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', gap: 24, position: 'relative', zIndex: 1 }}>
        <Stat label="creators" value="12k+" />
        <Stat label="paid out" value="₹4.8cr" />
        <Stat label="txn fee" value="0%" coral />
      </div>
    </aside>
  );
}

function Stat({ label, value, coral }) {
  return (
    <div>
      <div className="sk-num" style={{ fontSize: 24, color: coral ? 'var(--coral)' : 'var(--lime)' }}>{value}</div>
      <div style={{ fontSize: 12.5, color: 'var(--on-ink-2)', fontWeight: 600, marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────── 1. Sign up
export function SignUp() {
  const nav = useNavigate();
  const { set, state } = useStore();
  const [email, setEmail] = useState(state.auth.email || '');

  const proceed = () => {
    set((s) => ({ auth: { ...s.auth, signedUp: true, email } }));
    nav('/connect-instagram');
  };

  return (
    <div className="onb">
      <HeroPanel>
        <h1 className="sk-display" style={{ fontSize: 64, color: 'var(--on-ink)', marginTop: 14 }}>
          Your link in<br />bio, but it<br /><span style={{ color: 'var(--lime)' }}>pays.</span>
        </h1>
        <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.5, color: 'var(--on-ink-2)' }}>
          Sell guides, courses & paid community to your followers — from one link. You keep{' '}
          <b style={{ color: 'var(--on-ink)' }}>100% of every sale.</b>
        </p>
      </HeroPanel>

      <div className="onb__form">
        <div>
          <span className="sk-eyebrow">Sign up</span>
          <h2 className="sk-h1" style={{ marginTop: 6 }}>Create your free account</h2>
          <p style={{ color: 'var(--t2)', marginTop: 8 }}>It takes 2 minutes. No credit card.</p>
        </div>

        <button className="sk-btn sk-btn--ghost sk-btn--block sk-btn--lg" onClick={proceed}>
          <Icon name="google" size={22} sw={1.4} /> Continue with Google
        </button>
        <button className="sk-btn sk-btn--ghost sk-btn--block sk-btn--lg" onClick={proceed}>
          <Icon name="phone" size={20} /> Continue with phone
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0' }}>
          <div className="sk-hr" style={{ flex: 1 }} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--t3)' }}>or with email</span>
          <div className="sk-hr" style={{ flex: 1 }} />
        </div>

        <div className="sk-field">
          <label className="sk-label">Email address</label>
          <input className="sk-input" type="email" inputMode="email" placeholder="you@email.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <button className="sk-btn sk-btn--lime sk-btn--block sk-btn--lg" disabled={!email.includes('@')} onClick={proceed}>
          Create my free account <Icon name="arrowUR" size={19} sw={2.2} />
        </button>

        <p style={{ fontSize: 12.5, color: 'var(--t3)', textAlign: 'center', lineHeight: 1.5, marginTop: 4 }}>
          By continuing you agree to Monetish's <u>Terms</u> & <u>Privacy</u>.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────── 2. Connect Instagram
function PermRow({ icon, title, sub }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '8px 0' }}>
      <div className="sk-itile" style={{ width: 40, height: 40, background: 'var(--lime-wash)' }}>
        <Icon name={icon} size={20} color="var(--on-lime)" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.45, marginTop: 2 }}>{sub}</div>
      </div>
      <Icon name="check" size={20} color="var(--lime-deep)" sw={2.4} style={{ marginTop: 10 }} />
    </div>
  );
}

export function ConnectInstagram() {
  const nav = useNavigate();
  const { set, state } = useStore();
  const connect = () => { set((s) => ({ ig: { ...s.ig, connected: true } })); nav('/profile'); };
  return (
    <div className="onb">
      <HeroPanel eyebrow="Instagram Graph API">
        <h1 className="sk-display" style={{ fontSize: 52, color: 'var(--on-ink)', marginTop: 14 }}>
          Reach fans where<br />they already <span style={{ color: 'var(--lime)' }}>DM you.</span>
        </h1>
        <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.5, color: 'var(--on-ink-2)' }}>
          When someone comments your keyword on a reel, Monetish auto-DMs them the right link —
          inside the official Graph API, inside the 24-hour window. No scraping, no cold DMs.
        </p>
      </HeroPanel>

      <div className="onb__form">
        <StepHeader n={2} of={4} />
        <h2 className="sk-h1">Connect your Instagram</h2>
        <p style={{ color: 'var(--t2)' }}>So your storefront link and auto-replies live inside your DMs.</p>

        <div className="sk-card" style={{ padding: 14, marginTop: 6, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="sk-itile" style={{ width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg,#FEDA75,#FA7E1E 30%,#D62976 60%,#962FBF 85%,#4F5BD5)' }}>
            <Icon name="instagram" size={26} color="#fff" sw={2} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 15.5 }}>@{state.ig.handle}</div>
            <span className="sk-chip" style={{ height: 23, fontSize: 11.5, marginTop: 4 }}>Business account · eligible</span>
          </div>
          <Icon name="check" size={24} color="var(--lime-deep)" sw={2.6} />
        </div>

        <div className="sk-card" style={{ padding: '6px 18px', marginTop: 4 }}>
          <PermRow icon="msg"   title="Read keyword comments"  sub="To trigger auto-DMs when fans comment your word." />
          <div className="sk-hr" />
          <PermRow icon="share" title="Send DMs you initiate"   sub="Replies sent only inside the 24-hour window." />
          <div className="sk-hr" />
          <PermRow icon="eye"   title="Read your public profile" sub="Photo & display name to prefill your storefront." />
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'var(--card-2)',
          border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
          <Icon name="shield" size={18} color="var(--t2)" style={{ marginTop: 1, flex: '0 0 auto' }} />
          <span style={{ fontSize: 12.5, color: 'var(--t2)', lineHeight: 1.5 }}>
            Official Instagram Graph API. Monetish never posts, scrapes, or cold-DMs on your behalf.
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          <button className="sk-btn sk-btn--ghost" onClick={() => nav('/profile')}>Skip for now</button>
          <button className="sk-btn sk-btn--ink" style={{ flex: 1 }} onClick={connect}>Connect with Instagram <Icon name="arrowUR" size={18} sw={2.2} color="var(--lime)" /></button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────── 3. Profile setup
export function ProfileSetup() {
  const nav = useNavigate();
  const { state, setProfile } = useStore();
  const [username, setUsername] = useState(state.profile.username);
  const [displayName, setDisplayName] = useState(state.profile.displayName);
  const [bio, setBio] = useState(state.profile.bio);
  const available = username.trim().length >= 3;

  const cont = () => {
    setProfile({ username: username.trim(), displayName: displayName.trim(), bio });
    nav('/payout');
  };

  return (
    <div className="onb">
      <HeroPanel eyebrow="Your storefront">
        <h1 className="sk-display" style={{ fontSize: 52, color: 'var(--on-ink)', marginTop: 14 }}>
          One link.<br />Everything you <span style={{ color: 'var(--lime)' }}>sell.</span>
        </h1>
        <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.5, color: 'var(--on-ink-2)' }}>
          Pick your handle and we'll spin up <code style={{ background: 'var(--ink-soft)', padding: '2px 8px', borderRadius: 6, fontFamily: 'var(--display)' }}>monetish.bio/yourname</code> — the only link you'll ever need in your Instagram bio.
        </p>
      </HeroPanel>

      <div className="onb__form">
        <StepHeader n={3} of={4} />
        <h2 className="sk-h1">Set up your storefront</h2>
        <p style={{ color: 'var(--t2)' }}>You can change all of this later.</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
          <div style={{ position: 'relative' }}>
            <Avatar size={72} label={(displayName[0] || 'A').toUpperCase()} bg="var(--ink)" color="var(--lime)" />
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: 30, height: 30, borderRadius: '50%',
              background: 'var(--lime)', border: '3px solid var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="camera" size={15} color="var(--on-lime)" sw={2} />
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15.5 }}>Add a profile photo</div>
            <div style={{ fontSize: 13.5, color: 'var(--t2)', marginTop: 2 }}>Square works best · pulled from IG by default</div>
          </div>
        </div>

        <div className="sk-field">
          <label className="sk-label">Your Monetish link</label>
          <div className="sk-input" style={{ padding: 0, overflow: 'hidden' }}>
            <span style={{ padding: '0 4px 0 16px', color: 'var(--t2)', fontWeight: 600, height: '100%', display: 'inline-flex', alignItems: 'center' }}>monetish.bio/</span>
            <input value={username}
              onChange={(e) => setUsername(e.target.value.replace(/[^a-z0-9._]/gi, '').toLowerCase())}
              style={{ border: 'none', outline: 'none', background: 'transparent', fontWeight: 700, color: 'var(--t1)', fontSize: 15, fontFamily: 'var(--sans)', flex: 1, minWidth: 0, height: '100%' }} />
            {available && (
              <span style={{ marginRight: 14, display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--lime-deep)', fontWeight: 700, fontSize: 13 }}>
                <Icon name="check" size={16} sw={2.6} /> Available
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-2">
          <div className="sk-field">
            <label className="sk-label">Display name</label>
            <input className="sk-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="sk-field">
            <label className="sk-label">Social links</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="sk-chip" style={{ height: 38, borderRadius: 12 }}><Icon name="instagram" size={17} /> Instagram</span>
              <span className="sk-chip" style={{ height: 38, borderRadius: 12 }}><Icon name="youtube" size={17} /> YouTube</span>
              <span className="sk-chip tap" style={{ height: 38, borderRadius: 12, color: 'var(--t1)', borderStyle: 'dashed' }}><Icon name="plus" size={16} sw={2.4} /> Add</span>
            </div>
          </div>
        </div>

        <div className="sk-field">
          <label className="sk-label">Bio</label>
          <textarea className="sk-input" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell fans what you do" />
        </div>

        <button className="sk-btn sk-btn--ink sk-btn--block sk-btn--lg" disabled={!available || !displayName.trim()} onClick={cont}>
          Continue <Icon name="arrowUR" size={18} sw={2.2} color="var(--lime)" />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────── 4. Payout setup
function PayoutBullet({ children }) {
  return (
    <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--lime)', flex: '0 0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
        <Icon name="check" size={14} color="var(--on-lime)" sw={2.8} />
      </div>
      <span style={{ fontSize: 14.5, lineHeight: 1.45, color: 'var(--on-ink)' }}>{children}</span>
    </div>
  );
}

export function PayoutSetup() {
  const nav = useNavigate();
  const { set } = useStore();
  const finish = () => {
    set({ payout: { connected: true }, onboarded: true, published: true });
    nav('/builder');
  };
  return (
    <div className="onb">
      <HeroPanel eyebrow="0% transaction fee">
        <h1 className="sk-display" style={{ fontSize: 52, color: 'var(--on-ink)', marginTop: 14 }}>
          Get paid,<br /><span style={{ color: 'var(--lime)' }}>directly.</span>
        </h1>
        <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.5, color: 'var(--on-ink-2)' }}>
          Money settles to your bank through Razorpay. Monetish never touches your funds —
          we charge a flat creator plan, not a cut of sales.
        </p>
      </HeroPanel>

      <div className="onb__form">
        <StepHeader n={4} of={4} />
        <h2 className="sk-h1">Connect your payouts</h2>
        <p style={{ color: 'var(--t2)' }}>KYC (PAN + bank) is verified securely by Razorpay. Takes ~2 minutes.</p>

        <div style={{ background: 'var(--ink)', borderRadius: 'var(--r-lg)', padding: '22px 22px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(199,242,62,.18), transparent 70%)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, position: 'relative', zIndex: 1 }}>
            <Icon name="shield" size={20} color="var(--lime)" />
            <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 17, color: 'var(--on-ink)', letterSpacing: '-0.02em' }}>You are the merchant of record</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16, position: 'relative', zIndex: 1 }}>
            <PayoutBullet>Money goes <b>straight to your bank</b> via Razorpay.</PayoutBullet>
            <PayoutBullet>Monetish <b>never holds, routes or touches</b> your funds.</PayoutBullet>
            <PayoutBullet>You keep <b>every rupee</b> — we charge a flat plan, not a cut.</PayoutBullet>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--coral-wash)', borderRadius: 'var(--r-md)', padding: '14px 20px' }}>
          <span className="sk-num" style={{ fontSize: 44, color: 'var(--coral)', lineHeight: 1 }}>0%</span>
          <span style={{ fontSize: 14.5, fontWeight: 600, color: '#8A2A14', lineHeight: 1.4 }}>transaction fee.<br />Ever. On any sale.</span>
        </div>

        <button className="sk-btn sk-btn--ink sk-btn--block sk-btn--lg" onClick={finish}>
          Set up payouts with Razorpay <Icon name="arrowUR" size={18} sw={2.2} color="var(--lime)" />
        </button>
      </div>
    </div>
  );
}
