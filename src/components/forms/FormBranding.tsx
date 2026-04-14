import React from 'react';

const GOLD = '#b8976a';

interface FormBrandingProps {
  /** Form-specific hero title */
  heroTitle: string;
  /** Subtitle beneath the hero title */
  heroDesc: string;
  /** Badge labels shown below hero e.g. ['Free estimates', 'Insurance approved'] */
  badges: string[];
  /** Stars label e.g. "Trusted collision repairs across the GTA" */
  proofTitle: string;
  /** Subtitle line below stars */
  proofSub: string;
  /** Customer reviews */
  reviews: { text: string; name: string; detail: string }[];
  /** Trust stats e.g. [{ n: '500+', l: 'REPAIRS' }] */
  stats: { n: string; l: string }[];
}

export function FormHeader({ heroTitle, heroDesc, badges }: Pick<FormBrandingProps, 'heroTitle' | 'heroDesc' | 'badges'>) {
  return (
    <div style={{ position: 'relative', textAlign: 'center', padding: '2.5rem 1.5rem 1.75rem', overflow: 'hidden', background: '#0a0a0a' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 400, height: 200, background: 'radial-gradient(ellipse, rgba(184,151,106,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0a0a0a 8%, rgba(10,10,10,0.85) 50%, #0a0a0a 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Logo text fallback */}
        <div style={{ fontWeight: 600, fontSize: 28, letterSpacing: 10, color: '#f5f5f0', marginBottom: 4, fontFamily: "'Outfit', sans-serif" }}>
          <span style={{ color: GOLD }}>AVNTS</span>
        </div>
        <div style={{ fontSize: 11, letterSpacing: 5, color: GOLD, fontStyle: 'italic', marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>Dream it, Rent it, Own it.</div>
        <div style={{ width: 36, height: 1, background: GOLD, margin: '0 auto 16px', opacity: 0.3 }} />
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, letterSpacing: -0.5, marginBottom: 8, color: '#f5f5f0' }}>{heroTitle}</h1>
        <p style={{ fontSize: 13, color: '#777', lineHeight: 1.6, maxWidth: 400, margin: '0 auto 16px' }}>{heroDesc}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {badges.map(b => (
            <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 14px', borderRadius: 20, fontSize: 11, background: 'rgba(184,151,106,0.06)', border: '1px solid rgba(184,151,106,0.12)', color: GOLD }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormSocialProof({ proofTitle, proofSub, reviews, stats }: Pick<FormBrandingProps, 'proofTitle' | 'proofSub' | 'reviews' | 'stats'>) {
  return (
    <div style={{ padding: '2rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center', background: '#0a0a0a' }}>
      <div style={{ color: GOLD, fontSize: 18, letterSpacing: 4, marginBottom: 8 }}>★★★★★</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, marginBottom: 6, color: '#f5f5f0' }}>{proofTitle}</div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>{proofSub}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 20, textAlign: 'left' }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ background: '#0f0f0f', borderRadius: 12, padding: 18, border: '1px solid rgba(255,255,255,0.04)', position: 'relative' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: GOLD, opacity: 0.15, position: 'absolute', top: 6, left: 14, lineHeight: 1 }}>"</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontStyle: 'italic', color: '#aaa', lineHeight: 1.6, marginBottom: 12, position: 'relative', zIndex: 1 }}>{r.text}</div>
            <div style={{ fontSize: 12, color: '#444' }}><span style={{ color: GOLD, fontWeight: 500 }}>{r.name}</span> · {r.detail}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 10 }}>
        {stats.map((t, i) => (
          <div key={i} style={{ background: '#0f0f0f', borderRadius: 12, padding: '18px 8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 500, lineHeight: 1, marginBottom: 4, color: '#f5f5f0' }}>{t.n}</div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: '#555', fontWeight: 500 }}>{t.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormFooter() {
  return (
    <div style={{ textAlign: 'center', padding: '1.5rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', background: '#0a0a0a' }}>
      <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: 8, color: '#333', marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>AVNTS</div>
      <div style={{ fontSize: 12, color: '#333' }}>7A Musgrave Street, Toronto ON · (437) 553-9211</div>
    </div>
  );
}
