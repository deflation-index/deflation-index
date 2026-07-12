/* global React, ReactDOM */
const { useState, useEffect, useCallback } = React;

// Viewport-driven isMobile — single source of truth for layout decisions
// that CSS @media queries can't reach (chart height prop, conditional renders).
function useIsMobile(maxPx = 768) {
  const [m, setM] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(`(max-width: ${maxPx}px)`).matches);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxPx}px)`);
    const onChange = (e) => setM(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [maxPx]);
  return m;
}
// Expose to JSX files loaded as separate scripts.
window.AbundanceV2UseIsMobile = useIsMobile;

function useRoute() {
  const [route, setRoute] = useState(() => (window.location.hash.replace('#/','')) || 'home');
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#/','') || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const nav = useCallback((r) => { window.location.hash = '#/' + r; window.scrollTo({top:0, behavior:'smooth'}); }, []);
  return [route, nav];
}

function loadTweaks() {
  try {
    const raw = localStorage.getItem('di-v2-tweaks');
    if (raw) return { ...window.__TWEAKS__, ...JSON.parse(raw) };
  } catch {}
  return window.__TWEAKS__;
}

function App() {
  const [tw, setTw] = useState(loadTweaks);
  const [route, nav] = useRoute();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('di-v2-tweaks', JSON.stringify(tw)); } catch {}
  }, [tw]);

  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || !d.type) return;
      if (d.type === '__activate_edit_mode') setEditMode(true);
      if (d.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({type:'__edit_mode_available'}, '*'); } catch {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setTweak = (key, val) => {
    setTw(prev => {
      const next = { ...prev, [key]: val };
      try { window.parent.postMessage({type:'__edit_mode_set_keys', edits:{[key]:val}}, '*'); } catch {}
      return next;
    });
  };

  const T = window.AbundanceV2Theme(tw.palette);

  // Inject root bg color
  useEffect(() => {
    document.body.style.background = T.bg;
  }, [T.bg]);

  const [page, sub] = route.split('/');

  let content;
  if (page === 'home') content = <window.AbundanceV2Home nav={nav} T={T}/>;
  else if (page === 'sectors' && sub) content = <window.AbundanceV2Sector id={sub} T={T} nav={nav}/>;
  else if (page === 'sectors') content = <window.AbundanceV2Sectors T={T} nav={nav}/>;
  else if (page === 'explore') content = <window.AbundanceV2Explore T={T}/>;
  else if (page === 'stories' && sub) content = <window.AbundanceV2Story slug={sub} T={T} nav={nav}/>;
  else if (page === 'stories') content = <window.AbundanceV2Stories T={T} nav={nav}/>;
  else if (page === 'method') content = <window.AbundanceV2Method T={T}/>;
  else content = <window.AbundanceV2Home nav={nav} T={T}/>;

  // Two sources of "mobile-ness":
  //   - viewportMobile reflects the actual screen width (matchMedia)
  //   - tw.device === 'mobile' is a manual override from the dev panel
  // Either makes us render the mobile-shaped UI for things CSS can't handle.
  const viewportMobile = useIsMobile(768);
  const isMobile = tw.device === 'mobile' || viewportMobile;

  return (
    <div style={{background:T.bg, minHeight:'100vh'}}>
      {/* Top nav (always rendered; the pill row hides via .di-hide-mobile on phones) */}
      <window.AbundanceV2Nav route={route} nav={nav} T={T}/>
      {content}
      {/* Bottom tab nav (always rendered; hides via .di-show-mobile on desktop) */}
      <window.AbundanceV2Nav route={route} nav={nav} T={T} mobile={true}/>

      {/* Footer — extra bottom padding on mobile keeps content above the bottom tab bar */}
      <footer style={{background:T.bgDeep, color:T.bg, padding:`3rem 1.5rem ${isMobile ? '7rem' : '4rem'}`, marginTop:0}}>
        <div className="di-footer-grid" style={{maxWidth:1100, margin:'0 auto', gap:'2rem'}}>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:'.55rem', marginBottom:'.7rem'}}>
              <img src="assets/logo/di_logo_no_border.svg" alt="" style={{height:32, width:32, display:'block', borderRadius:5, background:'#FFFFFF'}}/>
              <span style={{fontFamily:T.font, fontSize:'1.2rem'}}>The Deflation Index</span>
            </div>
            <p style={{color:'rgba(255,255,255,0.6)', fontSize:'.92rem', maxWidth:'42ch', margin:0, lineHeight:1.6}}>An open record of how technology made things radically cheaper, and where the abundance went.</p>
          </div>
          {[
            {h:'Site', l:[['home','Home'],['sectors','Sectors'],['explore','Explore'],['stories','Stories'],['method','Method']]},
            {h:'Data', l:[['method','Sources & method'],['https://github.com/deflation-index/deflation-index','Data & code (GitHub)'],['https://github.com/deflation-index/deflation-index/blob/main/docs/operations/CHANGELOG.md','Changelog']]},
            {h:'Updates', l:[['https://deflationindex.substack.com','Newsletter'],['https://deflationindex.substack.com/feed','RSS']]},
          ].map((col,i)=>(
            <div key={i}>
              <div style={{fontFamily:T.mono, fontSize:'.7rem', letterSpacing:'.12em', textTransform:'uppercase', color:T.accent, marginBottom:'.8rem'}}>{col.h}</div>
              <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'.5rem'}}>
                {col.l.map(([k,v])=>{
                  const ext = k.startsWith('http');
                  return (
                    <li key={v}>
                      <a href={ext ? k : '#/'+k}
                         target={ext ? '_blank' : undefined} rel={ext ? 'noopener' : undefined}
                         onClick={(e)=>{if(!ext){e.preventDefault();nav(k);}}}
                         style={{color:'rgba(255,255,255,0.85)', textDecoration:'none', fontSize:'.92rem'}}>{v}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{maxWidth:1100, margin:'2.5rem auto 0', paddingTop:'1.4rem', borderTop:'1px solid rgba(255,255,255,0.1)', display:'flex', justifyContent:'space-between', fontFamily:T.mono, fontSize:'.72rem', color:'rgba(255,255,255,0.5)', letterSpacing:'.06em'}}>
          <span>v3.1.1 · 2025 EARLY READ</span>
          <span>data through dec 2025 · retrieved {window.DI.early2025.retrieved}</span>
        </div>
      </footer>

      {/* Tweaks */}
      {editMode && (
        <div style={{
          position:'fixed', bottom:20, right:20, width:280, zIndex:100,
          background:T.bg, borderRadius:14, boxShadow:'0 14px 38px rgba(0,0,0,0.2)',
          border:`1px solid ${T.line}`, fontFamily:T.sans
        }}>
          <div style={{padding:'1rem 1.1rem .7rem', borderBottom:`1px solid ${T.line}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2 style={{margin:0, fontFamily:T.font, fontWeight:500, fontSize:'1.05rem'}}>Tweaks</h2>
            <span style={{fontFamily:T.mono, fontSize:'.65rem', color:T.inkMute, cursor:'pointer'}} onClick={()=>setEditMode(false)}>close ✕</span>
          </div>
          <div style={{padding:'.9rem 1.1rem 1.1rem'}}>
            <div style={{marginBottom:'.9rem'}}>
              <label style={{fontFamily:T.mono, fontSize:'.66rem', color:T.inkMute, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'.45rem', display:'block'}}>Palette</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:4, padding:3, borderRadius:10, background:T.bgAlt}}>
                {Object.keys(window.AbundanceV2Palettes).map(k=>{
                  const p = window.AbundanceV2Palettes[k];
                  return (
                    <button key={k} onClick={()=>setTweak('palette',k)} style={{
                      background: tw.palette===k ? T.ink : 'transparent',
                      color: tw.palette===k ? T.bg : T.ink,
                      border:'none', padding:'.55rem .3rem', borderRadius:7, cursor:'pointer',
                      fontFamily:T.font, fontSize:'.85rem', fontWeight:500, textTransform:'capitalize',
                      display:'flex', flexDirection:'column', alignItems:'center', gap:4
                    }}>
                      <span style={{display:'flex', gap:2}}>
                        <span style={{width:8,height:8,borderRadius:'50%',background:p.accent}}/>
                        <span style={{width:8,height:8,borderRadius:'50%',background:p.accent2}}/>
                      </span>
                      {k}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{marginBottom:'.9rem'}}>
              <label style={{fontFamily:T.mono, fontSize:'.66rem', color:T.inkMute, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'.45rem', display:'block'}}>Device</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, padding:3, borderRadius:10, background:T.bgAlt}}>
                {[['desktop','Desktop'],['mobile','Mobile']].map(([k,v])=>(
                  <button key={k} onClick={()=>setTweak('device',k)} style={{
                    background: tw.device===k ? T.ink : 'transparent',
                    color: tw.device===k ? T.bg : T.ink,
                    border:'none', padding:'.55rem .3rem', borderRadius:7, cursor:'pointer',
                    fontFamily:T.sans, fontSize:'.78rem', fontWeight:500
                  }}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{fontFamily:T.mono, fontSize:'.66rem', color:T.inkMute, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:'.45rem', display:'block'}}>Jump to</label>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:4, padding:3, borderRadius:10, background:T.bgAlt}}>
                {[['home','Home'],['sectors','Sectors'],['explore','Explore'],['stories','Stories'],['method','Method']].map(([k,v])=>(
                  <button key={k} onClick={()=>nav(k)} style={{
                    background: route.split('/')[0]===k ? T.ink : 'transparent',
                    color: route.split('/')[0]===k ? T.bg : T.ink,
                    border:'none', padding:'.5rem .3rem', borderRadius:7, cursor:'pointer',
                    fontFamily:T.sans, fontSize:'.78rem', fontWeight:500
                  }}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Dev tweaks panel is gated behind editMode, which only flips on
          via __activate_edit_mode postMessage from a parent preview frame.
          The public-facing trigger button has been removed. */}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
