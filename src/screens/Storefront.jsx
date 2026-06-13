import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Icon } from '../lib/icons.jsx';
import { useStore } from '../lib/store.jsx';
import { STORE_THEMES, BLOCK_TYPES } from '../lib/themes.js';
import { StoreInner } from '../components/StorePreview.jsx';
import { BrandMark } from '../components/kit.jsx';

// Razorpay-style UPI checkout simulation (overlay sheet).
function Checkout({ block, onClose }) {
  const [stage, setStage] = useState('pay');
  return (
    <div onClick={onClose} className="modal-scrim fade-enter">
      <div onClick={(e) => e.stopPropagation()} className="modal sheet-enter" style={{ position: 'relative' }}>
        <button className="modal__close" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
        {stage === 'pay' ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Icon name="lock" size={16} color="var(--t2)" />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--t2)' }}>Secure UPI checkout · Razorpay</span>
            </div>
            <div className="sk-card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="sk-itile" style={{ width: 48, height: 48, background: 'var(--lime-wash)', borderRadius: 13 }}>
                <Icon name={(BLOCK_TYPES[block.type] || BLOCK_TYPES.link).icon} size={24} color="var(--on-lime)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15.5 }}>{block.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--t2)' }}>{block.desc || block.meta}</div>
              </div>
              <span className="sk-num" style={{ fontSize: 22 }}>{block.price}{block.per}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="sk-chip" style={{ height: 32 }}><Icon name="phone" size={14} /> UPI</span>
              <span className="sk-chip" style={{ height: 32 }}>GPay</span>
              <span className="sk-chip" style={{ height: 32 }}>PhonePe</span>
              <span className="sk-chip" style={{ height: 32 }}>Paytm</span>
              <span className="sk-chip" style={{ height: 32 }}>+ cards / netbanking</span>
            </div>
            <button className="sk-btn sk-btn--lime sk-btn--block sk-btn--lg" style={{ marginTop: 18 }} onClick={() => setStage('done')}>
              Pay {block.price}{block.per} <Icon name="arrowUR" size={18} sw={2.2} />
            </button>
            <p style={{ fontSize: 12, color: 'var(--t3)', textAlign: 'center', marginTop: 12, lineHeight: 1.5 }}>
              Paid directly to the creator's bank via Razorpay. Monetish charges 0% — funds never touch us.
            </p>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Icon name="check" size={40} color="var(--on-lime)" sw={2.6} />
            </div>
            <h2 className="sk-h2">Payment successful</h2>
            <p style={{ fontSize: 14, color: 'var(--t2)', marginTop: 10, lineHeight: 1.5 }}>
              You'll get instant access to <b>{block.title}</b>. A receipt is on its way to your email.
            </p>
            <button className="sk-btn sk-btn--ink sk-btn--block sk-btn--lg" style={{ marginTop: 22 }} onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Storefront() {
  const nav = useNavigate();
  useParams();
  const [params] = useSearchParams();
  const { state } = useStore();
  const themeKey = params.get('theme') || state.theme;
  const T = STORE_THEMES[themeKey] || STORE_THEMES.midnight;
  const [checkout, setCheckout] = useState(null);

  return (
    <div className="storefront" style={{ background: T.page }}>
      {/* floating back-to-builder badge (creator-only convenience) */}
      <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 5 }}>
        <button className="sk-btn sk-btn--ghost sk-btn--sm" onClick={() => nav('/builder')}>
          <Icon name="back" size={15} /> Back to builder
        </button>
      </div>
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 5, display: 'flex', gap: 8 }}>
        <button className="sk-btn sk-btn--ghost sk-btn--sm"><Icon name="share" size={15} /> Share</button>
      </div>

      <div className="storefront__col">
        <StoreInner T={T} profile={state.profile} blocks={state.blocks} onBuy={setCheckout} />
      </div>

      {/* footer brand (visible below the bio-link card) */}
      <div style={{ position: 'fixed', bottom: 18, left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(8px)', borderRadius: 99, padding: '6px 14px', boxShadow: 'var(--sh-sm)', display: 'inline-flex', alignItems: 'center', gap: 8, pointerEvents: 'auto' }}>
          <BrandMark size={16} />
          <span style={{ fontSize: 12, color: 'var(--t2)', fontWeight: 700 }}>· Make your own at monetish.bio</span>
        </div>
      </div>

      {checkout && <Checkout block={checkout} onClose={() => setCheckout(null)} />}
    </div>
  );
}
