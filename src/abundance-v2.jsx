/* global React, DIChart */
const { useState, useEffect, useMemo, useRef } = React;
const DI2 = window.DI;

// ============================================================
// SHARED HELPERS
// ============================================================
const fmt2 = (v, plus=true) => `${v>0&&plus?'+':''}${v.toFixed(v<10&&v>-10?1:0)}%`;
const compact = (n) => {
  if (n >= 1e9) return (n/1e9).toFixed(1).replace(/\.0$/,'') + 'B';
  if (n >= 1e6) return (n/1e6).toFixed(1).replace(/\.0$/,'') + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'') + 'k';
  if (n >= 1)   return n.toFixed(0);
  if (n >= 0.01) return n.toFixed(2);
  return n.toExponential(1);
};

// Animated count-up hook with IntersectionObserver
function useCountUp(target, opts={}) {
  const { duration = 1400, decimals = 0, prefix='', suffix='' } = opts;
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!ref.current || done) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else setDone(true);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration, done]);
  const formatted = decimals === 0 ? Math.round(val).toLocaleString() : val.toFixed(decimals);
  return [ref, prefix + formatted + suffix];
}

// Reveal-on-scroll wrapper
function Reveal({ children, as='div', style={} }) {
  const Tag = as;
  return <Tag style={style}>{children}</Tag>;
}

// ============================================================
// THEME — Abundance, with palette variants
// ============================================================
const palettes = {
  paper: {  // BRAND — committed editorial print: pure white, deep ink, gold + steel-blue accents
    bg:'#FFFFFF', bgAlt:'#F4F4F1', bgDeep:'#1A1A1A',
    ink:'#1A1A1A', inkSoft:'#4A4A4A', inkMute:'#9A9A98',
    line:'#E8E8E5',
    accent:'#B88A2B', accent2:'#2F5F7A', accentSoft:'#F0E2BD',
    di:'#2F5F7A', m2:'#B88A2B', cpi:'#6A6A68',
  },
};

function makeTheme(paletteId) {
  const p = palettes[paletteId] || palettes.paper;
  return {
    ...p,
    font:"'Spectral', Georgia, serif",
    sans:"'Space Grotesk', system-ui, sans-serif",
    mono:"'Space Mono', ui-monospace, monospace",
    grid:'rgba(26,26,26,0.06)',
    tooltipBg:'#FFFFFF',
  };
}

// ============================================================
// HERO MOTIFS — illustrated SVG hero objects
// ============================================================
function HeroPhone({ T }) {
  return (
    <svg viewBox="0 0 320 380" style={{width:'100%', height:'auto'}}>
      <defs>
        <radialGradient id="phgGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={T.accentSoft} stopOpacity="0.95"/>
          <stop offset="100%" stopColor={T.accentSoft} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="180" rx="140" ry="160" fill="url(#phgGlow)"/>
      {/* Phone body */}
      <rect x="98" y="50" width="124" height="240" rx="22" fill={T.ink}/>
      <rect x="106" y="64" width="108" height="212" rx="14" fill={T.bgAlt}/>
      {/* Notch */}
      <rect x="142" y="62" width="36" height="10" rx="5" fill={T.ink}/>
      {/* Signal bars climbing */}
      <g transform="translate(135, 105)">
        {[8,16,26,38,52].map((h,i)=>(
          <rect key={i} x={i*11} y={52-h} width="8" height={h} rx="1.5" fill={i===4?T.accent:T.accent2} opacity={0.4 + i*0.15}/>
        ))}
      </g>
      <text x="160" y="200" textAnchor="middle" fontFamily={T.font} fontSize="34" fontWeight="500" fill={T.ink}>1.7 TB</text>
      <text x="160" y="222" textAnchor="middle" fontFamily={T.mono} fontSize="10" fill={T.inkMute} letterSpacing=".1em">FOR $100</text>
      <text x="160" y="252" textAnchor="middle" fontFamily={T.sans} fontSize="11" fill={T.inkMute}>1990: 1.06 GB</text>
      {/* Falling-cost arrow */}
      <path d="M 50 260 Q 100 280 160 240" fill="none" stroke={T.accent} strokeWidth="2.5" strokeDasharray="4 4" opacity="0.7"/>
      <polygon points="155,236 168,238 162,250" fill={T.accent}/>
    </svg>
  );
}
function HeroSolar({ T }) {
  return (
    <svg viewBox="0 0 320 380" style={{width:'100%', height:'auto'}}>
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="35%" r="50%">
          <stop offset="0%" stopColor={T.accent} stopOpacity="0.45"/>
          <stop offset="100%" stopColor={T.accent} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="160" rx="140" ry="140" fill="url(#sunGlow)"/>
      <circle cx="160" cy="120" r="42" fill={T.accent}/>
      {Array.from({length:12}).map((_,i)=>{
        const a = i*30*Math.PI/180;
        return <line key={i} x1={160+Math.cos(a)*52} y1={120+Math.sin(a)*52} x2={160+Math.cos(a)*68} y2={120+Math.sin(a)*68} stroke={T.accent} strokeWidth="3" strokeLinecap="round"/>;
      })}
      {/* Solar panel */}
      <g transform="translate(80, 230) skewX(-8)">
        <rect x="0" y="0" width="160" height="100" fill={T.ink} rx="3"/>
        {[0,1,2,3].map(r => [0,1,2,3].map(c => (
          <rect key={r+'-'+c} x={6+c*38} y={6+r*23} width="34" height="19" fill={T.accent2} opacity={0.55+(r+c)*0.05} rx="1"/>
        )))}
      </g>
      <text x="160" y="356" textAnchor="middle" fontFamily={T.font} fontSize="22" fontWeight="500" fill={T.ink}>4¢/kWh</text>
    </svg>
  );
}
function HeroBattery({ T }) {
  return (
    <svg viewBox="0 0 320 380" style={{width:'100%', height:'auto'}}>
      <defs>
        <radialGradient id="bGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={T.accent2} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={T.accent2} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="190" rx="140" ry="150" fill="url(#bGlow)"/>
      {/* Battery */}
      <rect x="60" y="120" width="180" height="120" rx="10" fill={T.ink}/>
      <rect x="240" y="155" width="14" height="50" rx="3" fill={T.ink}/>
      <rect x="68" y="128" width="164" height="104" rx="6" fill={T.bgAlt}/>
      {/* Fill level */}
      <rect x="68" y="128" width="155" height="104" rx="6" fill={T.accent2} opacity="0.85"/>
      <text x="150" y="190" textAnchor="middle" fontFamily={T.font} fontSize="28" fontWeight="600" fill={T.bg}>$108</text>
      <text x="150" y="210" textAnchor="middle" fontFamily={T.mono} fontSize="9" fill={T.bg} letterSpacing=".1em" opacity="0.85">PER kWh · 2025</text>
      {/* Drop arrow */}
      <text x="160" y="290" textAnchor="middle" fontFamily={T.mono} fontSize="11" fill={T.inkMute}>2010 · $1,160</text>
      <path d="M 160 300 L 160 330" stroke={T.accent2} strokeWidth="2" strokeLinecap="round"/>
      <polygon points="155,322 165,322 160,335" fill={T.accent2}/>
      <text x="160" y="356" textAnchor="middle" fontFamily={T.font} fontSize="20" fontWeight="500" fill={T.ink}>−91% in 15 yrs</text>
    </svg>
  );
}
function HeroChip({ T }) {
  return (
    <svg viewBox="0 0 320 380" style={{width:'100%', height:'auto'}}>
      <defs>
        <radialGradient id="cGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={T.accent2} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={T.accent2} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="190" rx="140" ry="150" fill="url(#cGlow)"/>
      {/* chip */}
      <rect x="80" y="110" width="160" height="160" rx="10" fill={T.ink}/>
      <rect x="92" y="122" width="136" height="136" rx="4" fill={T.accent2}/>
      <rect x="108" y="138" width="104" height="104" rx="2" fill={T.ink}/>
      {/* circuit */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <line x1={120+i*16} y1="138" x2={120+i*16} y2="242" stroke={T.accent} strokeWidth="0.8" opacity="0.6"/>
          <line x1="108" y1={150+i*16} x2="212" y2={150+i*16} stroke={T.accent} strokeWidth="0.8" opacity="0.6"/>
        </g>
      ))}
      <text x="160" y="195" textAnchor="middle" fontFamily={T.font} fontSize="22" fontWeight="600" fill={T.bg}>1.4 PFLOPS</text>
      <text x="160" y="215" textAnchor="middle" fontFamily={T.mono} fontSize="9" fill={T.bg} letterSpacing=".1em" opacity="0.85">FOR $100 · 2025</text>
      {/* pins */}
      {[0,1,2,3,4,5].map(i=>(
        <g key={i}>
          <rect x={92+i*24} y="100" width="8" height="14" fill={T.ink}/>
          <rect x={92+i*24} y="266" width="8" height="14" fill={T.ink}/>
        </g>
      ))}
    </svg>
  );
}
const HEROES = { computing: HeroChip, communications: HeroPhone, energy: HeroSolar, transportation: HeroBattery };

// ============================================================
// DATELINE — newspaper-style provenance marker (replaces the old PulseBadge)
// `parts` is an array of strings joined with middots. The first part is set
// in ink for emphasis; the rest are inkMute. No animation, no border, no badge.
// ============================================================
function Dateline({ T, parts = ['Early read', '2025 data'] }) {
  return (
    <span style={{
      display:'inline-block',
      fontFamily:T.mono, fontSize:'.72rem',
      letterSpacing:'.12em', textTransform:'uppercase',
      color:T.inkMute, fontWeight:500, lineHeight:1.4,
    }}>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{margin:'0 .55rem', color:T.line}} aria-hidden="true">·</span>}
          <span style={i === 0 ? {color:T.ink, fontWeight:600} : null}>{p}</span>
        </React.Fragment>
      ))}
    </span>
  );
}

// ============================================================
// NEWSLETTER — styled form that hands off to Substack signup
// (a direct API POST from this domain is blocked by CORS, so we
// send the visitor to Substack with the email prefilled)
// ============================================================
const SUBSTACK_URL = 'https://deflationindex.substack.com';
function NewsletterForm({ T }) {
  const [email, setEmail] = useState('');
  const [invalid, setInvalid] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) { setInvalid(true); return; }
    window.location.href = SUBSTACK_URL + '/subscribe?email=' + encodeURIComponent(email.trim());
  };
  return (
    <form onSubmit={submit} noValidate style={{maxWidth:420, margin:'0 auto'}}>
      <div style={{display:'flex', gap:'.5rem'}}>
        <input
          type="email" placeholder="you@domain.com" value={email}
          aria-label="Email address" aria-invalid={invalid}
          onChange={(e)=>{ setEmail(e.target.value); if (invalid) setInvalid(false); }}
          style={{flex:1, padding:'.85rem 1rem', border:`1px solid ${invalid ? T.accent : T.line}`, borderRadius:999, background:T.bg, fontFamily:T.sans, fontSize:'.95rem', outline:'none', color:T.ink}}/>
        <button type="submit" className="di-tap" style={{padding:'.85rem 1.4rem', background:T.ink, color:T.bg, border:'none', borderRadius:999, fontFamily:T.sans, fontWeight:500, cursor:'pointer'}}>Subscribe</button>
      </div>
      <div style={{fontFamily:T.mono, fontSize:'.7rem', color: invalid ? T.accent : T.inkMute, marginTop:'.6rem', letterSpacing:'.04em'}}>
        {invalid ? 'That doesn’t look like an email address.' : 'Delivered via Substack. Unsubscribe anytime.'}
      </div>
    </form>
  );
}
window.AbundanceV2NewsletterForm = NewsletterForm;
window.AbundanceV2SubstackUrl = SUBSTACK_URL;

// ============================================================
// SHARED NAV (top + mobile bottom tabs)
// ============================================================
function NavV2({ route, nav, T, mobile=false }) {
  const [page] = route.split('/');
  const L = [['home','Home'],['sectors','Sectors'],['explore','Explore'],['stories','Stories'],['method','Method']];
  if (mobile) {
    // Bottom tab bar — visibility controlled by CSS (.di-show-mobile).
    return (
      <div className="di-show-mobile" style={{
        position:'fixed', bottom:0, left:0, right:0, zIndex:50,
        background:T.bg, borderTop:`1px solid ${T.line}`,
        padding:'.4rem .4rem max(.7rem, env(safe-area-inset-bottom))',
        justifyContent:'space-around',
      }}>
        {L.map(([k,lbl])=>(
          <button key={k} onClick={()=>nav(k)} className="di-tap" style={{
            border:'none', background:'transparent', color:page===k?T.accent:T.inkMute,
            fontFamily:T.sans, fontSize:'.7rem', fontWeight:600,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3,
            padding:'.4rem .25rem', cursor:'pointer', flex:'1 1 0', minWidth:0
          }}>
            <span style={{
              width:5, height:5, borderRadius:'50%',
              background: page===k?T.accent:'transparent',
            }}/>
            {lbl}
          </button>
        ))}
      </div>
    );
  }
  // Top bar — logo always visible; pill nav hides on phones via .di-hide-mobile.
  return (
    <nav style={{position:'sticky', top:0, zIndex:50, background:'rgba(255,255,255,0.92)', backdropFilter:'blur(12px) saturate(160%)', borderBottom:`1px solid ${T.line}`}}>
      <div style={{maxWidth:1200, margin:'0 auto', padding:'.85rem 1.25rem', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem'}}>
        <a href="#/home" onClick={(e)=>{e.preventDefault();nav('home');}} style={{display:'flex', alignItems:'center', gap:'.55rem', textDecoration:'none', color:T.ink, fontFamily:T.font, fontWeight:500, fontSize:'clamp(1rem, 3.5vw, 1.18rem)', minWidth:0}}>
          <img src="assets/logo/di_logo_no_border.svg" alt="" style={{height:32, width:32, display:'block', borderRadius:6, flexShrink:0}}/>
          <span style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>The Deflation Index</span>
        </a>
        <div className="di-hide-mobile" style={{alignItems:'center', gap:'.4rem'}}>
          <div style={{display:'flex', gap:'.3rem', background:T.bgAlt, padding:4, borderRadius:999}}>
            {L.map(([k,lbl]) => (
              <a key={k} href={'#/'+k} onClick={(e)=>{e.preventDefault();nav(k);}}
                 style={{textDecoration:'none', fontFamily:T.sans, fontSize:'.85rem', padding:'.45rem .85rem', borderRadius:999, background:page===k?T.ink:'transparent', color:page===k?T.bg:T.inkSoft, fontWeight:500}}>{lbl}</a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================
// DOLLAR-TEST ICONS — small line motifs in the hero-illustration
// style (replaces platform-dependent emoji)
// ============================================================
function DollarIcon({ id, T }) {
  const s = { width: 38, height: 38, display: 'block' };
  if (id === 'data') return (
    <svg viewBox="0 0 38 38" style={s} aria-hidden="true">
      {[9, 15, 22, 30].map((h, i) => (
        <rect key={i} x={4 + i * 8.5} y={33 - h} width="6" height={h} rx="1.5"
              fill={i === 3 ? T.accent : T.accent2} opacity={0.55 + i * 0.15}/>
      ))}
    </svg>
  );
  if (id === 'compute') return (
    <svg viewBox="0 0 38 38" style={s} aria-hidden="true">
      <rect x="7" y="7" width="24" height="24" rx="3" fill={T.ink}/>
      <rect x="12" y="12" width="14" height="14" rx="1.5" fill={T.accent2}/>
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={11 + i * 7} y="2" width="3" height="4" fill={T.ink}/>
          <rect x={11 + i * 7} y="32" width="3" height="4" fill={T.ink}/>
          <rect x="2" y={11 + i * 7} width="4" height="3" fill={T.ink}/>
          <rect x="32" y={11 + i * 7} width="4" height="3" fill={T.ink}/>
        </g>
      ))}
    </svg>
  );
  if (id === 'solar') return (
    <svg viewBox="0 0 38 38" style={s} aria-hidden="true">
      <circle cx="19" cy="19" r="8" fill={T.accent}/>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = i * 45 * Math.PI / 180;
        return <line key={i} x1={19 + Math.cos(a) * 11} y1={19 + Math.sin(a) * 11}
                     x2={19 + Math.cos(a) * 15} y2={19 + Math.sin(a) * 15}
                     stroke={T.accent} strokeWidth="2.5" strokeLinecap="round"/>;
      })}
    </svg>
  );
  // battery
  return (
    <svg viewBox="0 0 38 38" style={s} aria-hidden="true">
      <rect x="3" y="12" width="28" height="14" rx="3" fill={T.ink}/>
      <rect x="31" y="16" width="4" height="6" rx="1.5" fill={T.ink}/>
      <rect x="6" y="15" width="19" height="8" rx="1.5" fill={T.accent2}/>
    </svg>
  );
}

// ============================================================
// THEN→NOW CARD (animated)
// ============================================================
function ThenNowV2({ entry, T, onClick }) {
  return (
    <button onClick={onClick} style={{
      display:'block', textAlign:'left', width:'100%',
      background:T.bg, border:`2px solid ${T.line}`, borderRadius:20,
      padding:'1.7rem 1.5rem', position:'relative', cursor:'pointer',
      transition:'transform .25s, box-shadow .25s, border-color .25s',
      fontFamily:T.sans, color:T.ink,
    }}
    onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 18px 40px rgba(26,28,46,.08)'; e.currentTarget.style.borderColor=T.accent; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor=T.line; }}>
      <div style={{marginBottom:'.7rem', lineHeight:1}}><DollarIcon id={entry.id} T={T}/></div>
      <div style={{fontFamily:T.font, fontSize:'1.4rem', fontWeight:500, letterSpacing:'-.005em', marginBottom:'1rem'}}>{entry.label}</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:'.6rem', alignItems:'center'}}>
        <div>
          <div style={{fontFamily:T.mono, fontSize:'.66rem', letterSpacing:'.1em', textTransform:'uppercase', color:T.inkMute}}>1990</div>
          <div style={{fontFamily:T.font, fontSize:'1.5rem', fontWeight:500, color:T.inkSoft, marginTop:'.15rem'}}>{compact(entry.then)} <span style={{fontSize:'.85rem', color:T.inkMute}}>{entry.unit}</span></div>
        </div>
        <div style={{color:T.accent, fontSize:'1.2rem'}}>→</div>
        <div>
          <div style={{fontFamily:T.mono, fontSize:'.66rem', letterSpacing:'.1em', textTransform:'uppercase', color:T.accent2}}>2025</div>
          <div style={{fontFamily:T.font, fontSize:'1.5rem', fontWeight:600, color:T.accent2, marginTop:'.15rem'}}>{compact(entry.now)} <span style={{fontSize:'.85rem', color:T.inkMute}}>{entry.unit}</span></div>
        </div>
      </div>
      <div className="di-cols-1to2" style={{marginTop:'1rem', fontSize:'.85rem', color:T.inkMute, lineHeight:1.5, gap:'.5rem'}}>
        <div>{entry.thenText}</div>
        <div style={{color:T.accent2}}>{entry.nowText}</div>
      </div>
      <div style={{position:'absolute', top:18, right:18, background:T.bgDeep, color:T.bg, padding:'.3rem .8rem', borderRadius:999, fontFamily:T.mono, fontSize:'.7rem', fontWeight:700, letterSpacing:'.04em'}}>
        ×{compact(entry.now/entry.then)}
      </div>
    </button>
  );
}

// ============================================================
// HOMEPAGE
// ============================================================
function HomeV2({ nav, T }) {
  const H = DI2.headline;
  const isMobile = window.AbundanceV2UseIsMobile ? window.AbundanceV2UseIsMobile() : false;
  // 2025 measured set (v4.0-rc) — single source of truth is data.js headline.
  const diPct  = Math.abs(H.di_2025_cumulative_pct);   // 99.97
  const m2Pct  = Math.round(H.m2_2025_cumulative_pct); // 576
  const cpiPct = Math.round(H.cpi_2025_cumulative_pct);// 150
  const gapPp  = H.abundance_gap_2025_pp;              // 526
  const [diRef, diVal] = useCountUp(diPct, {decimals:2, suffix:'%'});
  const [m2Ref, m2Val] = useCountUp(m2Pct, {suffix:'%'});
  const [cpiRef, cpiVal] = useCountUp(cpiPct, {suffix:'%'});
  const [gapRef, gapVal] = useCountUp(gapPp, {suffix:'pp'});

  return (
    <div style={{background:T.bg, color:T.ink, fontFamily:T.sans}}>
      {/* HERO */}
      <section style={{background:`linear-gradient(180deg, ${T.bgAlt} 0%, ${T.bg} 100%)`, padding:'5rem 1.5rem 3rem', position:'relative', overflow:'hidden'}}>
        {/* Decorative curve */}
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{position:'absolute', bottom:-1, left:0, width:'100%', height:120, pointerEvents:'none'}}>
          <path d="M 0,200 C 360,150 720,100 1440,140 L 1440,200 Z" fill={T.bg}/>
        </svg>
        <div style={{maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1}}>
          <Reveal>
            <div style={{marginBottom:'1.5rem'}}>
              <Dateline T={T} parts={['v4.0 release candidate', '2025 measured', `Retrieved ${DI2.early2025.retrieved}`]}/>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{fontFamily:T.font, fontWeight:400, fontSize:'clamp(2rem,5.8vw,4.8rem)', lineHeight:1.05, letterSpacing:'-.025em', margin:'0 0 1.6rem'}}>
              Technology got <span style={{fontStyle:'italic', color:T.accent, fontWeight:500}}>radically cheaper.</span><br/>
              Here's where the abundance went.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p style={{fontSize:'1.25rem', lineHeight:1.55, color:T.inkSoft, maxWidth:'58ch', marginBottom:'2rem'}}>
              Across 35 years, the cost of computing, communications, energy and transportation collapsed by <strong style={{color:T.ink}}>{diPct.toFixed(2)}%</strong>. Money supply rose <strong style={{color:T.ink}}>{m2Pct}%</strong>. Consumer prices rose <strong style={{color:T.ink}}>{cpiPct}%</strong>. The Deflation Index puts all three on one chart so the divergence is visible at a glance.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div style={{display:'flex', gap:'.7rem', flexWrap:'wrap'}}>
              <button onClick={()=>nav('explore')} className="di-tap-pill" style={{padding:'1rem 1.6rem', background:T.ink, color:T.bg, border:'none', borderRadius:999, fontWeight:500, fontFamily:T.sans, fontSize:'.95rem', cursor:'pointer'}}>Explore the data →</button>
              <button onClick={()=>nav('method')} className="di-tap-pill" style={{padding:'1rem 1.6rem', background:'transparent', color:T.ink, border:`1.5px solid ${T.ink}`, borderRadius:999, fontWeight:500, fontFamily:T.sans, fontSize:'.95rem', cursor:'pointer'}}>How it's built</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HERO MOTIFS — rotating */}
      <section style={{maxWidth:1100, margin:'0 auto', padding:'4rem 1.5rem 2rem'}}>
        <Reveal>
          <div style={{textAlign:'center', marginBottom:'2.5rem'}}>
            <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.6rem'}}>The four motifs</div>
            <h2 style={{fontFamily:T.font, fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:400, letterSpacing:'-.015em', margin:0}}>What a hundred dollars buys now.</h2>
            <p style={{color:T.inkSoft, fontSize:'1.1rem', marginTop:'.6rem', maxWidth:'52ch', marginInline:'auto'}}>Same hundred dollars. Different decade. The unit on the box is the same; the multiplier is real.</p>
          </div>
        </Reveal>
        <div className="di-cols-1to4" style={{gap:'1.2rem'}}>
          {DI2.sectors.map((s,i)=>{
            const Hero = HEROES[s.id];
            return (
              <Reveal key={s.id} delay={i*80}>
                <button onClick={()=>nav('sectors/'+s.id)} style={{
                  display:'block', width:'100%', textAlign:'left',
                  background:T.bg, border:`2px solid ${T.line}`, borderRadius:18,
                  padding:'.8rem .8rem 1.4rem', cursor:'pointer',
                  transition:'transform .25s, border-color .25s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=T.accent;}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor=T.line;}}>
                  <div style={{aspectRatio:'1/1', display:'grid', placeItems:'center'}}>
                    <Hero T={T}/>
                  </div>
                  <div style={{padding:'0 .6rem'}}>
                    <div style={{fontFamily:T.font, fontSize:'1.25rem', fontWeight:500, marginBottom:'.2rem'}}>{s.name}</div>
                    <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.06em'}}>{s.metric} · {fmt2(s.drop,false)} since 1990</div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* THE FOUR NUMBERS */}
      <section style={{background:T.bgDeep, color:T.bg, padding:'5rem 1.5rem', marginTop:'4rem', position:'relative', overflow:'hidden'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <Reveal>
            <div style={{textAlign:'center', marginBottom:'3rem'}}>
              <div style={{fontFamily:T.mono, fontSize:'.72rem', letterSpacing:'.12em', textTransform:'uppercase', color:T.accent, marginBottom:'.7rem'}}>1990 → 2025</div>
              <h2 style={{fontFamily:T.font, fontSize:'clamp(2.4rem,5vw,3.6rem)', fontWeight:400, letterSpacing:'-.02em', margin:0, color:T.bg}}>Four numbers, three decades.</h2>
            </div>
          </Reveal>
          <div className="di-cols-1to4" style={{gap:'2rem'}}>
            {[
              {label:'Tech got cheaper', sym:'−', color:T.accent2, ref:diRef, anim:diVal, sub:'Deflation Index, v4 geometric'},
              {label:'Money supply', sym:'+', color:T.accent, ref:m2Ref, anim:m2Val, sub:'M2, FRED measured'},
              {label:'Consumer prices', sym:'+', color:'#FFFFFF', ref:cpiRef, anim:cpiVal, sub:'CPI-U, BLS measured'},
              {label:'The abundance gap', sym:'', color:T.accent, ref:gapRef, anim:gapVal, sub:'|Tech| + Money − Prices'},
            ].map((s,i)=>(
              <div key={i} ref={s.ref} style={{textAlign:'left', borderTop:`2px solid ${s.color}`, paddingTop:'1.2rem'}}>
                <div style={{fontFamily:T.mono, fontSize:'.7rem', letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)', marginBottom:'.6rem'}}>{s.label}</div>
                <div style={{fontFamily:T.font, fontSize:'clamp(2.6rem,5vw,4rem)', lineHeight:.95, color:s.color, fontWeight:500, letterSpacing:'-.02em'}}>
                  {s.sym}{s.anim}
                </div>
                <div style={{fontSize:'.85rem', color:'rgba(255,255,255,0.55)', marginTop:'.5rem'}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE THREE LINES */}
      <section style={{maxWidth:1100, margin:'0 auto', padding:'4rem 1.5rem 2rem'}}>
        <Reveal>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'1.4rem', flexWrap:'wrap', gap:'1rem'}}>
            <div>
              <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.4rem'}}>Three lines</div>
              <h2 style={{fontFamily:T.font, fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:400, letterSpacing:'-.015em', margin:0}}>One chart that explains the gap.</h2>
            </div>
            <button onClick={()=>nav('explore')} style={{background:T.bgAlt, border:`1px solid ${T.line}`, padding:'.6rem 1.1rem', borderRadius:999, fontFamily:T.sans, fontWeight:500, color:T.ink, cursor:'pointer'}}>Open in Explore →</button>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{background:T.bg, border:`2px solid ${T.line}`, borderRadius:20, padding: isMobile ? '1.1rem' : '1.8rem'}}>
            <DIChart theme={T} height={isMobile ? 300 : 420} annotations={[{year:2008, label:'GFC'}, {year:2020, label:'M2 +24%'}, {year:2025, label:'2025 ER'}]}/>
          </div>
        </Reveal>
      </section>

      {/* THEN → NOW DOLLAR TEST */}
      <section style={{maxWidth:1100, margin:'0 auto', padding:'4rem 1.5rem'}}>
        <Reveal>
          <div style={{marginBottom:'2.5rem'}}>
            <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.4rem'}}>The $100 test</div>
            <h2 style={{fontFamily:T.font, fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:400, letterSpacing:'-.015em', margin:'0 0 .6rem'}}>Hundred dollars, two decades, four sectors.</h2>
            <p style={{color:T.inkSoft, fontSize:'1.05rem', maxWidth:'52ch'}}>Same money. Same unit of capability. The multiplier is what technology bought you.</p>
          </div>
        </Reveal>
        <div className="di-cols-1to2" style={{gap:'1.1rem'}}>
          {DI2.dollarTest.map((it,i)=>(
            <Reveal key={it.id} delay={i*70}>
              <ThenNowV2 entry={it} T={T} onClick={()=>nav('explore')}/>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{maxWidth:780, margin:'0 auto', padding:'4rem 1.5rem'}}>
        <Reveal>
          <div style={{textAlign:'center', marginBottom:'2.5rem'}}>
            <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.5rem'}}>How we got here</div>
            <h2 style={{fontFamily:T.font, fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:400, letterSpacing:'-.015em', margin:0}}>Six inflection points.</h2>
          </div>
        </Reveal>
        <div style={{position:'relative'}}>
          <div className="di-timeline-line" style={{position:'absolute', top:8, bottom:8, width:2, background:T.line}}/>
          {DI2.timeline.map((t, i) => (
            <Reveal key={i} delay={i*60}>
              <div className="di-timeline-row" style={{marginBottom:'2rem', alignItems:'flex-start'}}>
                <div style={{fontFamily:T.font, fontSize:'clamp(1.4rem, 4vw, 1.7rem)', fontWeight:500, color:T.accent, lineHeight:.95, position:'relative', textAlign:'right'}}>
                  {t.year}
                  <div style={{position:'absolute', right:'calc(-50% + 6px)', top:8, width:14, height:14, borderRadius:'50%', background:T.bg, border:`3px solid ${T.accent}`}}/>
                </div>
                <div style={{paddingLeft:'.6rem'}}>
                  <div style={{fontFamily:T.font, fontSize:'1.25rem', fontWeight:500, marginBottom:'.4rem'}}>{t.title}</div>
                  <p style={{color:T.inkSoft, lineHeight:1.6, margin:0}}>{t.text}</p>
                  {t.year === 2026 && <div style={{marginTop:'.5rem'}}><Dateline T={T} parts={['v4.0 release candidate']}/></div>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section style={{background:T.bgAlt, padding:'4rem 1.5rem'}}>
        <div style={{maxWidth:1100, margin:'0 auto'}}>
          <Reveal>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2rem', flexWrap:'wrap'}}>
              <div>
                <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.4rem'}}>Stories</div>
                <h2 style={{fontFamily:T.font, fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:400, letterSpacing:'-.015em', margin:0}}>Going deeper.</h2>
              </div>
              <button onClick={()=>nav('stories')} style={{background:'transparent', border:`1px solid ${T.ink}`, padding:'.6rem 1.1rem', borderRadius:999, fontFamily:T.sans, fontWeight:500, color:T.ink, cursor:'pointer'}}>All stories →</button>
            </div>
          </Reveal>
          <div className="di-cols-1to2" style={{gap:'1rem'}}>
            {DI2.stories.map((st,i)=>(
              <Reveal key={st.slug} delay={i*60}>
                <a href={'#/stories/'+st.slug} onClick={(e)=>{e.preventDefault(); nav('stories/'+st.slug);}}
                   style={{display:'block', background:T.bg, border:`1px solid ${T.line}`, borderRadius:14, padding:'1.6rem', cursor:'pointer', textDecoration:'none', color:'inherit'}}>
                  <div style={{fontFamily:T.mono, fontSize:'.7rem', letterSpacing:'.08em', textTransform:'uppercase', color:T.accent, marginBottom:'.5rem'}}>{st.kicker} · {st.readMins} min</div>
                  <div style={{fontFamily:T.font, fontSize:'1.4rem', fontWeight:500, letterSpacing:'-.005em', lineHeight:1.2, marginBottom:'.5rem'}}>{st.title}</div>
                  <p style={{color:T.inkSoft, fontSize:'.95rem', margin:0, lineHeight:1.55}}>{st.dek}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'4rem 1.5rem'}}>
        <div style={{maxWidth:560, margin:'0 auto', textAlign:'center'}}>
          <h2 style={{fontFamily:T.font, fontSize:'2rem', fontWeight:400, letterSpacing:'-.015em', margin:'0 0 .7rem'}}>Major releases, by email.</h2>
          <p style={{color:T.inkSoft, fontSize:'1rem', marginBottom:'1.4rem'}}>A few emails a year — the v4.0 index revision first. No weekly anything, no upsell.</p>
          <NewsletterForm T={T}/>
        </div>
      </section>
    </div>
  );
}

window.AbundanceV2Home = HomeV2;
window.AbundanceV2Theme = makeTheme;
window.AbundanceV2Nav = NavV2;
window.AbundanceV2Dateline = Dateline;
window.AbundanceV2Reveal = Reveal;
window.AbundanceV2Heroes = HEROES;
window.AbundanceV2Palettes = palettes;
