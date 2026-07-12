/* global React, DIChart */
const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP, useRef: useRefP } = React;
const DIp = window.DI;
const RevealP = window.AbundanceV2Reveal;
const DatelineP = window.AbundanceV2Dateline;
const HEROES_P = window.AbundanceV2Heroes;

const fmtP = (v, plus=true) => `${v>0&&plus?'+':''}${v.toFixed(v<10&&v>-10?1:0)}%`;
const compactP = (n) => {
  if (n >= 1e9) return (n/1e9).toFixed(1).replace(/\.0$/,'') + 'B';
  if (n >= 1e6) return (n/1e6).toFixed(1).replace(/\.0$/,'') + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'') + 'k';
  if (n >= 1)   return n.toFixed(0);
  if (n >= 0.01) return n.toFixed(2);
  return n.toExponential(1);
};

// =====================================================================
// SECTOR PAGE — expanded narrative
// =====================================================================
function SectorPageV2({ id, T, nav }) {
  const sector = DIp.sectors.find(s => s.id === id) || DIp.sectors[0];
  const Hero = HEROES_P[sector.id];
  const isMobileP = window.AbundanceV2UseIsMobile ? window.AbundanceV2UseIsMobile() : false;
  const idx = DIp.sectors.indexOf(sector);
  const next = DIp.sectors[(idx+1) % DIp.sectors.length];
  const prev = DIp.sectors[(idx-1+DIp.sectors.length) % DIp.sectors.length];

  // Per-sector stats
  const start = sector.dataStart || 1990;
  const startIdx = DIp.years.indexOf(start);
  const startVal = sector.data[startIdx];
  const endVal = sector.data[sector.data.length - 1];
  const halflife = Math.log(2) / Math.abs(Math.log(1 + sector.annualRate/100));

  // Build a per-sector chart series
  const sectorSeries = [
    { key:sector.id, label:sector.metric, color:T.accent2, data:sector.data },
    { key:'cpi',     label:'CPI',          color:T.cpi,    data:DIp.cpi, dashed:true },
  ];

  return (
    <div style={{background:T.bg, color:T.ink, fontFamily:T.sans, paddingBottom:'5rem'}}>
      {/* Sector hero */}
      <section style={{background:T.bgAlt, padding:'3.5rem 1.5rem 2.5rem'}}>
        <div className="di-cols-1to-1p3" style={{maxWidth:1100, margin:'0 auto', gap:'2.5rem', alignItems:'center'}}>
          <div>
            <button onClick={()=>nav('sectors')} style={{background:'transparent', border:'none', fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.08em', textTransform:'uppercase', cursor:'pointer', padding:0, marginBottom:'.8rem'}}>← All sectors</button>
            <div style={{fontFamily:T.mono, fontSize:'.74rem', letterSpacing:'.12em', textTransform:'uppercase', color:T.accent, marginBottom:'.6rem'}}>Sector · weight {(sector.weight*100).toFixed(1)}%</div>
            <h1 style={{fontFamily:T.font, fontSize:'clamp(2.4rem,5vw,4rem)', fontWeight:400, letterSpacing:'-.02em', lineHeight:1.05, margin:'0 0 1rem'}}>{sector.name}.</h1>
            <p style={{fontSize:'1.2rem', lineHeight:1.55, color:T.inkSoft, marginBottom:'1.5rem', maxWidth:'46ch'}}>
              {sector.narrative}
            </p>
            <div style={{display:'inline-flex', gap:'.6rem', padding:'.7rem 1rem', background:T.bg, border:`1px solid ${T.line}`, borderRadius:14, fontFamily:T.mono, fontSize:'.78rem', color:T.inkSoft}}>
              <span style={{color:T.accent}}>●</span>{sector.metricLong}
            </div>
          </div>
          <div>
            <Hero T={T}/>
          </div>
        </div>
      </section>

      {/* Big stats strip */}
      <section style={{maxWidth:1100, margin:'-1.5rem auto 0', padding:'0 1.5rem', position:'relative', zIndex:2}}>
        <div className="di-cols-1to4" style={{background:T.bg, border:`2px solid ${T.line}`, borderRadius:18, padding:'2rem', gap:'1.5rem'}}>
          {[
            {lbl:'Cumulative drop', val: fmtP(sector.drop,false), big:true, color:T.accent2},
            {lbl:'Annual rate', val: fmtP(sector.annualRate,false), big:true, color:T.accent},
            {lbl:'Halving every', val: halflife.toFixed(1) + ' yrs', big:true, color:T.ink},
            {lbl:'2025 raw', val: sector.raw2025, big:false, color:T.ink},
          ].map((s,i)=>(
            <div key={i}>
              <div style={{fontFamily:T.mono, fontSize:'.7rem', color:T.inkMute, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'.5rem'}}>{s.lbl}</div>
              <div style={{fontFamily:T.font, fontSize: s.big ? 'clamp(1.8rem,3.6vw,2.6rem)' : '1.3rem', fontWeight:500, color:s.color, letterSpacing:'-.015em', lineHeight:1}}>{s.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tangible narrative */}
      <section style={{maxWidth:780, margin:'0 auto', padding:'4rem 1.5rem'}}>
        <RevealP>
          <div className="di-cols-1to2" style={{gap:'2rem'}}>
            <div style={{padding:'1.6rem', background:T.bgAlt, borderRadius:14, borderLeft:`4px solid ${T.inkMute}`}}>
              <div style={{fontFamily:T.mono, fontSize:'.7rem', color:T.inkMute, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'.5rem'}}>Then · {start}</div>
              <p style={{fontFamily:T.font, fontSize:'1.4rem', fontWeight:400, lineHeight:1.35, margin:0, letterSpacing:'-.005em'}}>{sector.tangible.then}</p>
              <div style={{fontFamily:T.mono, fontSize:'.8rem', color:T.inkSoft, marginTop:'.8rem'}}>{sector.raw1990}</div>
            </div>
            <div style={{padding:'1.6rem', background:T.bg, borderRadius:14, borderLeft:`4px solid ${T.accent2}`, border:`1px solid ${T.line}`}}>
              <div style={{fontFamily:T.mono, fontSize:'.7rem', color:T.accent2, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'.5rem'}}>Now · 2025</div>
              <p style={{fontFamily:T.font, fontSize:'1.4rem', fontWeight:400, lineHeight:1.35, margin:0, letterSpacing:'-.005em'}}>{sector.tangible.now}</p>
              <div style={{fontFamily:T.mono, fontSize:'.8rem', color:T.accent2, marginTop:'.8rem'}}>{sector.raw2025}</div>
            </div>
          </div>
        </RevealP>
      </section>

      {/* The chart */}
      <section style={{maxWidth:1100, margin:'0 auto', padding:'0 1.5rem 4rem'}}>
        <RevealP>
          <div style={{marginBottom:'1.2rem'}}>
            <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.4rem'}}>The trajectory</div>
            <h2 style={{fontFamily:T.font, fontSize:'2rem', fontWeight:400, margin:0, letterSpacing:'-.015em'}}>{sector.name} cost vs CPI, 1990 = 100.</h2>
          </div>
        </RevealP>
        <RevealP delay={100}>
          <div style={{background:T.bg, border:`2px solid ${T.line}`, borderRadius:18, padding: isMobileP ? '1rem' : '1.5rem'}}>
            <DIChart theme={T} height={isMobileP ? 280 : 400} seriesOverride={sectorSeries}/>
          </div>
        </RevealP>
      </section>

      {/* The $100 test */}
      <section style={{background:T.bgDeep, color:T.bg, padding:'4rem 1.5rem'}}>
        <div style={{maxWidth:780, margin:'0 auto', textAlign:'center'}}>
          <div style={{fontFamily:T.mono, fontSize:'.72rem', letterSpacing:'.12em', textTransform:'uppercase', color:T.accent, marginBottom:'.7rem'}}>The $100 test</div>
          <h2 style={{fontFamily:T.font, fontSize:'2.4rem', fontWeight:400, letterSpacing:'-.02em', margin:'0 0 2rem', color:T.bg}}>What the same $100 buys.</h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:'2rem', alignItems:'center'}}>
            <div>
              <div style={{fontFamily:T.mono, fontSize:'.7rem', letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:'.6rem'}}>{start}</div>
              <div style={{fontFamily:T.font, fontSize:'2.4rem', fontWeight:500, color:'rgba(255,255,255,.7)'}}>{sector.buysPer100.then}</div>
            </div>
            <div style={{fontFamily:T.font, fontSize:'2rem', color:T.accent}}>→</div>
            <div>
              <div style={{fontFamily:T.mono, fontSize:'.7rem', letterSpacing:'.1em', textTransform:'uppercase', color:T.accent2, marginBottom:'.6rem'}}>2025</div>
              <div style={{fontFamily:T.font, fontSize:'2.4rem', fontWeight:600, color:T.accent2}}>{sector.buysPer100.now}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section style={{maxWidth:780, margin:'0 auto', padding:'3rem 1.5rem'}}>
        <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.7rem'}}>Sources</div>
        <div style={{display:'flex', flexWrap:'wrap', gap:'.5rem'}}>
          {sector.sources.map(src=>(
            <span key={src} style={{padding:'.5rem .9rem', background:T.bgAlt, borderRadius:999, fontFamily:T.mono, fontSize:'.78rem', color:T.inkSoft}}>{src}</span>
          ))}
        </div>
      </section>

      {/* Prev / Next */}
      <section style={{maxWidth:1100, margin:'0 auto', padding:'2rem 1.5rem'}}>
        <div className="di-cols-1to2" style={{gap:'1rem'}}>
          {[prev, next].map((s,i)=>(
            <button key={s.id} onClick={()=>nav('sectors/'+s.id)} style={{
              textAlign:i===0?'left':'right', background:T.bgAlt, border:`1px solid ${T.line}`,
              borderRadius:14, padding:'1.4rem 1.6rem', cursor:'pointer', fontFamily:T.sans
            }}>
              <div style={{fontFamily:T.mono, fontSize:'.7rem', color:T.inkMute, letterSpacing:'.1em', textTransform:'uppercase'}}>{i===0?'← Previous':'Next →'}</div>
              <div style={{fontFamily:T.font, fontSize:'1.5rem', fontWeight:500, marginTop:'.3rem'}}>{s.name}</div>
              <div style={{fontSize:'.85rem', color:T.inkSoft, marginTop:'.2rem'}}>{fmtP(s.drop,false)} since {s.dataStart||1990}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

// =====================================================================
// SECTORS INDEX
// =====================================================================
function SectorsIndexV2({ T, nav }) {
  return (
    <div style={{background:T.bg, color:T.ink, fontFamily:T.sans, padding:'3rem 1.5rem 5rem'}}>
      <div style={{maxWidth:1100, margin:'0 auto'}}>
        <RevealP>
          <div style={{marginBottom:'2.5rem'}}>
            <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.5rem'}}>Sectors</div>
            <h1 style={{fontFamily:T.font, fontSize:'clamp(2.4rem,5vw,3.6rem)', fontWeight:400, letterSpacing:'-.02em', margin:0}}>Four sectors. One curve each.</h1>
            <p style={{color:T.inkSoft, fontSize:'1.1rem', maxWidth:'52ch', marginTop:'.6rem'}}>The Deflation Index averages four sectors. Each tells its own story.</p>
          </div>
        </RevealP>
        <div className="di-cols-1to2" style={{gap:'1.4rem'}}>
          {DIp.sectors.map((s,i)=>{
            const Hero = HEROES_P[s.id];
            return (
              <RevealP key={s.id} delay={i*70}>
                <button onClick={()=>nav('sectors/'+s.id)} style={{
                  textAlign:'left', display:'block', width:'100%', background:T.bg, border:`2px solid ${T.line}`,
                  borderRadius:18, padding:'1.6rem', cursor:'pointer', fontFamily:T.sans,
                  transition:'transform .25s, border-color .25s'
                }} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.borderColor=T.accent;}} onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.borderColor=T.line;}}>
                  <div className="di-cols-1to-fixR" style={{gap:'1.2rem', alignItems:'center'}}>
                    <div>
                      <div style={{fontFamily:T.mono, fontSize:'.7rem', color:T.accent, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'.4rem'}}>{s.metric}</div>
                      <div style={{fontFamily:T.font, fontSize:'2rem', fontWeight:500, letterSpacing:'-.01em', marginBottom:'.5rem'}}>{s.name}</div>
                      <div style={{fontFamily:T.font, fontSize:'2.2rem', fontWeight:500, color:T.accent2, lineHeight:1}}>{fmtP(s.drop,false)}</div>
                      <div style={{fontFamily:T.mono, fontSize:'.78rem', color:T.inkMute, marginTop:'.4rem'}}>since {s.dataStart||1990}</div>
                    </div>
                    <div><Hero T={T}/></div>
                  </div>
                </button>
              </RevealP>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// EXPLORE — interactive playground
// =====================================================================
function ExploreV2({ T }) {
  const [yearA, setYearA] = useStateP(1990);
  const [yearB, setYearB] = useStateP(2025);
  const [sectorId, setSectorId] = useStateP('computing');
  const [dollars, setDollars] = useStateP(100);

  const sector = DIp.sectors.find(s=>s.id===sectorId);
  const idxA = DIp.years.indexOf(yearA);
  const idxB = DIp.years.indexOf(yearB);
  const valA = sector.data[idxA];
  const valB = sector.data[idxB];

  // What $X buys at A vs B (units inverse to index value)
  const baseUnit = sector.id === 'computing' ? 0.12 : sector.id === 'communications' ? 1.06 : sector.id === 'energy' ? 33 : 0.086;
  const buyA = (baseUnit * 100 / valA) * (dollars/100);
  const buyB = (baseUnit * 100 / valB) * (dollars/100);
  const unit = sector.id === 'computing' ? 'GFLOPS' : sector.id === 'communications' ? 'GB' : sector.id === 'energy' ? 'kWh' : 'kWh';

  const m2A = DIp.m2[idxA], m2B = DIp.m2[idxB];
  const cpiA = DIp.cpi[idxA], cpiB = DIp.cpi[idxB];
  const diA = DIp.di[idxA], diB = DIp.di[idxB];

  const isMobileE = window.AbundanceV2UseIsMobile ? window.AbundanceV2UseIsMobile() : false;
  const card = {background:T.bg, border:`2px solid ${T.line}`, borderRadius:18, padding: isMobileE ? '1.1rem' : '1.5rem'};
  const lbl = {fontFamily:T.mono, fontSize:'.7rem', color:T.inkMute, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'.4rem'};

  return (
    <div style={{background:T.bg, color:T.ink, fontFamily:T.sans, padding:'3rem 1.5rem 5rem'}}>
      <div style={{maxWidth:1100, margin:'0 auto'}}>
        <RevealP>
          <div style={{marginBottom:'2rem'}}>
            <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.5rem'}}>Explore</div>
            <h1 style={{fontFamily:T.font, fontSize:'clamp(2.2rem,5vw,3.4rem)', fontWeight:400, letterSpacing:'-.02em', margin:0}}>Roll your own.</h1>
            <p style={{color:T.inkSoft, fontSize:'1.05rem', maxWidth:'52ch', marginTop:'.6rem'}}>Pick two years. Compare every line. See what a hundred dollars bought.</p>
          </div>
        </RevealP>

        {/* Big chart */}
        <RevealP>
          <div style={{...card, marginBottom:'1.4rem'}}>
            <DIChart theme={T} height={isMobileE ? 320 : 460} annotations={[{year:yearA,label:'A'},{year:yearB,label:'B'}]}/>
          </div>
        </RevealP>

        {/* Year compare row */}
        <RevealP>
          <div style={{...card, marginBottom:'1.4rem'}}>
            <div style={lbl}>Year compare · A vs B</div>
            <div className="di-cols-1to2" style={{gap:'1.5rem', marginBottom:'1.5rem'}}>
              {[['A',yearA,setYearA,T.inkMute],['B',yearB,setYearB,T.accent]].map(([k,v,setV,col])=>(
                <div key={k}>
                  <div style={{fontFamily:T.font, fontSize:'2.2rem', fontWeight:500, color:col, lineHeight:1, marginBottom:'.5rem'}}>{v}</div>
                  <input type="range" min={1990} max={2025} step={1} value={v} aria-label={'Comparison year '+k} onChange={e=>setV(+e.target.value)} style={{width:'100%', accentColor:col}}/>
                </div>
              ))}
            </div>
            <div className="di-cols-1to3" style={{gap:'1rem'}}>
              {[
                {lab:'Tech (DI)', a:diA, b:diB, color:T.di},
                {lab:'M2', a:m2A, b:m2B, color:T.m2},
                {lab:'CPI', a:cpiA, b:cpiB, color:T.cpi},
              ].map(r=>{
                const pct = ((r.b/r.a) - 1) * 100;
                return (
                  <div key={r.lab} style={{padding:'1rem', background:T.bgAlt, borderRadius:12, borderTop:`3px solid ${r.color}`}}>
                    <div style={lbl}>{r.lab}</div>
                    <div style={{display:'flex', alignItems:'baseline', gap:'.6rem'}}>
                      <span style={{fontFamily:T.font, fontSize:'1.1rem', color:T.inkSoft}}>{r.a.toFixed(r.a<10?2:0)}</span>
                      <span style={{color:T.inkMute}}>→</span>
                      <span style={{fontFamily:T.font, fontSize:'1.4rem', fontWeight:500}}>{r.b.toFixed(r.b<10?2:0)}</span>
                    </div>
                    <div style={{fontFamily:T.mono, fontSize:'.8rem', color: pct<0?T.accent2:T.accent, marginTop:'.4rem'}}>{fmtP(pct, true)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealP>

        {/* Dollar calculator */}
        <RevealP>
          <div style={{...card}}>
            <div style={lbl}>Dollar calculator</div>
            <h3 style={{fontFamily:T.font, fontSize:'1.6rem', fontWeight:400, margin:'0 0 1.2rem'}}>What does <span style={{color:T.accent}}>${dollars}</span> buy in <span style={{color:T.inkMute}}>{yearA}</span> vs <span style={{color:T.accent2}}>{yearB}</span>?</h3>

            <div className="di-cols-1to-fixL" style={{gap:'1.5rem', marginBottom:'1.5rem'}}>
              <div>
                <input type="range" min={1} max={1000} step={1} value={dollars} aria-label="Dollar amount" onChange={e=>setDollars(+e.target.value)} style={{width:'100%', accentColor:T.accent}}/>
                <div style={{fontFamily:T.mono, fontSize:'.78rem', color:T.inkMute, marginTop:'.4rem'}}>$1 — $1,000</div>
              </div>
              <div style={{display:'flex', gap:'.5rem', flexWrap:'wrap'}}>
                {DIp.sectors.map(s=>(
                  <button key={s.id} onClick={()=>setSectorId(s.id)} style={{
                    padding:'.6rem 1rem', borderRadius:999, fontFamily:T.sans, fontSize:'.85rem', fontWeight:500,
                    background: sectorId===s.id ? T.ink : 'transparent',
                    color: sectorId===s.id ? T.bg : T.ink,
                    border:`1px solid ${sectorId===s.id?T.ink:T.line}`, cursor:'pointer'
                  }}>{s.name}</button>
                ))}
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:'1.5rem', alignItems:'center', padding:'2rem 1rem', background:T.bgAlt, borderRadius:14}}>
              <div style={{textAlign:'center'}}>
                <div style={lbl}>{yearA}</div>
                <div style={{fontFamily:T.font, fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:500, color:T.inkSoft}}>{compactP(buyA)}</div>
                <div style={{fontFamily:T.mono, fontSize:'.78rem', color:T.inkMute, marginTop:'.3rem'}}>{unit}</div>
              </div>
              <div style={{fontSize:'2rem', color:T.accent}}>×{compactP(buyB/buyA)}</div>
              <div style={{textAlign:'center'}}>
                <div style={{...lbl, color:T.accent2}}>{yearB}</div>
                <div style={{fontFamily:T.font, fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:600, color:T.accent2}}>{compactP(buyB)}</div>
                <div style={{fontFamily:T.mono, fontSize:'.78rem', color:T.inkMute, marginTop:'.3rem'}}>{unit}</div>
              </div>
            </div>
          </div>
        </RevealP>
      </div>
    </div>
  );
}

// =====================================================================
// STORIES INDEX
// =====================================================================
function StoriesV2({ T, nav }) {
  return (
    <div style={{background:T.bg, color:T.ink, fontFamily:T.sans, padding:'3rem 1.5rem 5rem'}}>
      <div style={{maxWidth:780, margin:'0 auto'}}>
        <RevealP>
          <div style={{marginBottom:'2.5rem'}}>
            <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.5rem'}}>Stories</div>
            <h1 style={{fontFamily:T.font, fontSize:'clamp(2.2rem,5vw,3.4rem)', fontWeight:400, letterSpacing:'-.02em', margin:0}}>Going deeper.</h1>
            <p style={{color:T.inkSoft, fontSize:'1.05rem', maxWidth:'52ch', marginTop:'.6rem'}}>Short essays on the data. New ones occasionally.</p>
          </div>
        </RevealP>
        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
          {DIp.stories.map((st,i)=>(
            <RevealP key={st.slug} delay={i*60}>
              <a href={'#/stories/'+st.slug}
                 onClick={(e)=>{ if(nav){ e.preventDefault(); nav('stories/'+st.slug); } }}
                 style={{
                   display:'block', background:T.bg, border:`1px solid ${T.line}`, borderRadius:14,
                   padding:'1.6rem 1.8rem', textDecoration:'none', color:T.ink, transition:'border-color .2s, transform .2s'
                 }}
                 onMouseEnter={e=>{e.currentTarget.style.borderColor=T.accent;e.currentTarget.style.transform='translateX(4px)';}}
                 onMouseLeave={e=>{e.currentTarget.style.borderColor=T.line;e.currentTarget.style.transform='none';}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:'1rem', marginBottom:'.5rem'}}>
                  <span style={{fontFamily:T.mono, fontSize:'.7rem', letterSpacing:'.1em', textTransform:'uppercase', color:T.accent}}>{st.kicker}</span>
                  <span style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute}}>{st.readMins} min read</span>
                </div>
                <div style={{fontFamily:T.font, fontSize:'1.6rem', fontWeight:500, letterSpacing:'-.01em', lineHeight:1.2, marginBottom:'.4rem'}}>{st.title}</div>
                <p style={{color:T.inkSoft, fontSize:'.95rem', margin:0, lineHeight:1.55}}>{st.dek}</p>
              </a>
            </RevealP>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// STORY DETAIL — fetches data/stories/<slug>.md and renders via marked
// =====================================================================
function StoryDetailV2({ slug, T, nav }) {
  const story = DIp.stories.find(s => s.slug === slug);
  const [body, setBody] = React.useState(null);
  const [err, setErr]   = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    setBody(null); setErr(null);
    fetch('data/stories/' + slug + '.md', { cache: 'no-cache' })
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(txt => { if (!cancelled) setBody(txt); })
      .catch(e   => { if (!cancelled) setErr(String(e.message || e)); });
    return () => { cancelled = true; };
  }, [slug]);

  if (!story) {
    return (
      <div style={{background:T.bg, color:T.ink, fontFamily:T.sans, padding:'4rem 1.5rem 6rem', textAlign:'center'}}>
        <div style={{maxWidth:560, margin:'0 auto'}}>
          <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.6rem'}}>Story not found</div>
          <h1 style={{fontFamily:T.font, fontSize:'2.2rem', fontWeight:400, letterSpacing:'-.02em', margin:'0 0 1rem'}}>That essay doesn't exist.</h1>
          <a href="#/stories" onClick={(e)=>{e.preventDefault(); nav && nav('stories');}}
             style={{color:T.accent, textDecoration:'underline', textUnderlineOffset:'2px'}}>← All stories</a>
        </div>
      </div>
    );
  }

  const html = (body && window.marked) ? window.marked.parse(body) : '';

  // Scoped prose typography keyed off .di-prose so the markdown HTML inherits
  // the same Spectral/Space Grotesk rhythm as the rest of the site.
  const proseStyle = `
    .di-prose { font-family: ${T.sans}; color: ${T.inkSoft}; font-size: 1.06rem; line-height: 1.75; }
    .di-prose p { margin: 0 0 1.15rem; }
    .di-prose strong { color: ${T.ink}; font-weight: 600; }
    .di-prose em { font-style: italic; }
    .di-prose h2 { font-family: ${T.font}; color: ${T.ink}; font-size: 1.55rem; font-weight: 500; letter-spacing: -.01em; margin: 2.4rem 0 .8rem; }
    .di-prose h3 { font-family: ${T.font}; color: ${T.ink}; font-size: 1.2rem; font-weight: 500; margin: 2rem 0 .6rem; }
    .di-prose ul, .di-prose ol { margin: 0 0 1.2rem; padding-left: 1.4rem; }
    .di-prose li { margin: .35rem 0; }
    .di-prose a { color: ${T.accent}; text-decoration: underline; text-underline-offset: 2px; }
    .di-prose hr { border: 0; border-top: 1px solid ${T.line}; margin: 2rem 0; }
    .di-prose blockquote { border-left: 3px solid ${T.accent}; margin: 1.4rem 0; padding: .2rem 0 .2rem 1.2rem; color: ${T.inkSoft}; font-style: italic; }
    .di-prose code { font-family: ${T.mono}; font-size: .9em; background: ${T.bgAlt}; padding: .1rem .35rem; border-radius: 4px; }
  `;

  return (
    <div style={{background:T.bg, color:T.ink, fontFamily:T.sans, padding:'2.5rem 1.5rem 5rem'}}>
      <style>{proseStyle}</style>
      <div style={{maxWidth:680, margin:'0 auto'}}>
        <RevealP>
          <a href="#/stories" onClick={(e)=>{e.preventDefault(); nav && nav('stories');}}
             style={{display:'inline-block', fontFamily:T.mono, fontSize:'.78rem', color:T.inkMute, textDecoration:'none', letterSpacing:'.04em', marginBottom:'1.6rem'}}
             onMouseEnter={e=>{e.currentTarget.style.color=T.accent;}}
             onMouseLeave={e=>{e.currentTarget.style.color=T.inkMute;}}>← All stories</a>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:'1rem', marginBottom:'.8rem'}}>
            <span style={{fontFamily:T.mono, fontSize:'.7rem', letterSpacing:'.12em', textTransform:'uppercase', color:T.accent}}>{story.kicker}</span>
            <span style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute}}>{story.readMins} min read</span>
          </div>
          <h1 style={{fontFamily:T.font, fontSize:'clamp(2rem,4.5vw,3rem)', fontWeight:400, letterSpacing:'-.02em', margin:'0 0 .8rem', lineHeight:1.15}}>{story.title}</h1>
          <p style={{color:T.inkSoft, fontSize:'1.15rem', maxWidth:'58ch', margin:'0 0 2.4rem', lineHeight:1.55}}>{story.dek}</p>
        </RevealP>

        {err && (
          <div style={{padding:'1.4rem', background:T.bgAlt, borderRadius:12, fontFamily:T.mono, fontSize:'.85rem', color:T.inkSoft}}>
            Couldn't load this story ({err}). If you're viewing locally, make sure you're serving the folder over HTTP rather than opening index.html directly.
          </div>
        )}
        {!err && body == null && (
          <div style={{padding:'1.4rem', fontFamily:T.mono, fontSize:'.85rem', color:T.inkMute}}>Loading…</div>
        )}
        {!err && body != null && (
          <RevealP>
            <div className="di-prose" dangerouslySetInnerHTML={{__html: html}}/>
          </RevealP>
        )}
      </div>
    </div>
  );
}

// =====================================================================
// METHODOLOGY
// =====================================================================
function MethodV2({ T }) {
  const sectionTitle = {fontFamily:T.font, fontSize:'1.6rem', fontWeight:500, letterSpacing:'-.01em', margin:'2rem 0 .8rem'};
  const para = {fontFamily:T.sans, fontSize:'1rem', color:T.inkSoft, lineHeight:1.65, marginBottom:'1rem'};

  return (
    <div style={{background:T.bg, color:T.ink, fontFamily:T.sans, padding:'3rem 1.5rem 5rem'}}>
      <div style={{maxWidth:720, margin:'0 auto'}}>
        <RevealP>
          <div style={{marginBottom:'2rem'}}>
            <div style={{fontFamily:T.mono, fontSize:'.72rem', color:T.inkMute, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'.5rem'}}>Method</div>
            <h1 style={{fontFamily:T.font, fontSize:'clamp(2.2rem,5vw,3.4rem)', fontWeight:400, letterSpacing:'-.02em', margin:0}}>How it's built.</h1>
            <p style={{color:T.inkSoft, fontSize:'1.1rem', maxWidth:'52ch', marginTop:'.6rem'}}>The Deflation Index is a weighted average of four technology-cost indices, each rebased so that 1990 = 100.</p>
          </div>
        </RevealP>

        <RevealP>
          <h2 style={sectionTitle}>The formula</h2>
          <pre style={{
            background:T.bgDeep, color:T.bg, padding:'1.4rem', borderRadius:14,
            fontFamily:T.mono, fontSize:'.85rem', overflow:'auto',
            lineHeight:1.7, margin:'1rem 0 1.4rem'
          }}>{`DI(t) = Σ wᵢ · Iᵢ(t)

where:
  wᵢ = sector weight (sum to 1.0)
  Iᵢ(t) = sector index, 1990 = 100

Sector weights (v3.1.1):
  Computing       0.2941
  Communications  0.2353
  Energy          0.2941
  Transportation  0.1765`}</pre>
        </RevealP>

        <RevealP>
          <h2 style={sectionTitle}>The three lines</h2>
          <p style={para}>
            <strong style={{color:T.ink}}>Deflation Index (DI):</strong> the weighted average above. A value of 3.75 in 2024 means the basket cost 3.75% of what it cost in 1990.
          </p>
          <p style={para}>
            <strong style={{color:T.ink}}>M2:</strong> the broad money supply, from the U.S. Federal Reserve via FRED (series M2SL). Indexed to 1990 = 100.
          </p>
          <p style={para}>
            <strong style={{color:T.ink}}>CPI:</strong> the Consumer Price Index for All Urban Consumers, from the Bureau of Labor Statistics (CPIAUCSL). Indexed to 1990 = 100.
          </p>
        </RevealP>

        <RevealP>
          <h2 style={sectionTitle}>What 2025 means</h2>
          <DatelineP T={T} parts={['Early read', '2025 data']}/>
          <p style={{...para, marginTop:'1rem'}}>
            2025 is an <strong style={{color:T.ink}}>early read</strong>, not a published index point. M2 and CPI are measured directly from FRED/BLS (retrieved {DIp.early2025.retrieved}). The DI 2025 figure blends measured sector data — battery packs, AI compute — with trend extrapolation for solar and broadband, which won't publish 2025 numbers until mid-to-late 2026. The full v4.0 weighted index will be published when those are in.
          </p>
          <div className="di-cols-1to2" style={{gap:'1rem', marginTop:'1.5rem'}}>
            <div style={{padding:'1.2rem', background:T.bgAlt, borderRadius:12}}>
              <div style={{fontFamily:T.mono, fontSize:'.7rem', color:T.accent, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'.6rem'}}>Measured for 2025</div>
              <ul style={{margin:0, paddingLeft:'1.2rem', fontSize:'.92rem', color:T.inkSoft, lineHeight:1.7}}>
                {DIp.early2025.measured.map(m=><li key={m}>{m}</li>)}
              </ul>
            </div>
            <div style={{padding:'1.2rem', background:T.bgAlt, borderRadius:12}}>
              <div style={{fontFamily:T.mono, fontSize:'.7rem', color:T.inkMute, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'.6rem'}}>Pending publication</div>
              <ul style={{margin:0, paddingLeft:'1.2rem', fontSize:'.92rem', color:T.inkSoft, lineHeight:1.7}}>
                {DIp.early2025.pending.map(m=><li key={m}>{m}</li>)}
              </ul>
            </div>
          </div>
        </RevealP>

        <RevealP>
          <h2 style={sectionTitle}>Sources</h2>
          <p style={{...para, marginBottom:'1.2rem'}}>One canonical link per institution below. Series-level URLs and per-datapoint provenance live in <a href="https://github.com/deflation-index/deflation-index/blob/main/data/constants.json" target="_blank" rel="noopener" style={{color:T.accent, textDecoration:'underline', textDecorationThickness:1, textUnderlineOffset:'2px'}}>constants.json</a>.</p>
          <ul style={{listStyle:'none', padding:0, margin:0}}>
            {[
              ['Computing','Epoch AI','https://epoch.ai/data'],
              ['Communications','FCC Broadband Reports','https://www.fcc.gov/reports-research/reports'],
              ['Energy','IRENA — Renewable Power Costs','https://www.irena.org/Publications'],
              ['Transportation','BloombergNEF — Li-ion Battery Price Survey','https://about.bnef.com/blog/category/transportation/'],
              ['M2','Federal Reserve via FRED (M2SL)','https://fred.stlouisfed.org/series/M2SL'],
              ['CPI','U.S. Bureau of Labor Statistics (CPIAUCSL)','https://fred.stlouisfed.org/series/CPIAUCSL'],
            ].map(([k,v,url])=>(
              <li key={k} className="di-cols-1to-fixL" style={{padding:'.85rem 0', borderBottom:`1px solid ${T.line}`, gap:'.4rem', alignItems:'baseline'}}>
                <span style={{fontFamily:T.font, fontWeight:500}}>{k}</span>
                <a href={url} target="_blank" rel="noopener" style={{fontFamily:T.mono, fontSize:'.85rem', color:T.inkSoft, textDecoration:'none'}}
                   onMouseEnter={e=>{e.currentTarget.style.color=T.accent;}}
                   onMouseLeave={e=>{e.currentTarget.style.color=T.inkSoft;}}>{v} <span style={{color:T.inkMute}}>↗</span></a>
              </li>
            ))}
          </ul>
        </RevealP>

        <RevealP>
          <h2 style={sectionTitle}>What it isn't</h2>
          <p style={para}>
            It is not a replacement for CPI. The Bureau of Labor Statistics measures what people actually pay; the Deflation Index measures what technology made possible. The two together tell a story — but they answer different questions.
          </p>
          <p style={para}>
            It is also not yet complete. The four sectors here are the first generation: computing, communications, energy, and lithium-ion batteries — input layers with the longest time series and the cleanest data. Healthcare, education, housing, and other sectors will follow as the data reaches the same standard. We'd rather wait for measurements we can defend than publish numbers we can't.
          </p>
          <p style={para}>
            When those sectors are added, they will measure the same thing the current four measure: the <em>technology input layer</em> of each sector — genomic sequencing cost, AI-assisted radiology per scan, online-learning cost-per-credit, modular-construction cost-per-square-foot — not insurance premiums, not tuition, not home prices. Those are what CPI measures. The gap between the two is what this index exists to make visible.
          </p>
          <p style={{...para, marginTop:'.8rem'}}>
            <a href="https://github.com/deflation-index/deflation-index/blob/main/docs/methodology/INPUT_LAYER_PRINCIPLE.md" target="_blank" rel="noopener" style={{color:T.accent, textDecoration:'underline', textDecorationThickness:1, textUnderlineOffset:'2px', fontFamily:T.mono, fontSize:'.85rem'}}>
              → Why we measure inputs, not headline prices
            </a>
          </p>
        </RevealP>
      </div>
    </div>
  );
}

window.AbundanceV2Sectors = SectorsIndexV2;
window.AbundanceV2Sector = SectorPageV2;
window.AbundanceV2Explore = ExploreV2;
window.AbundanceV2Stories = StoriesV2;
window.AbundanceV2Story = StoryDetailV2;
window.AbundanceV2Method = MethodV2;
