const {
  useState,
  useEffect,
  useCallback
} = React;
function useIsMobile(maxPx = 768) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${maxPx}px)`).matches);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxPx}px)`);
    const onChange = e => setM(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [maxPx]);
  return m;
}
window.AbundanceV2UseIsMobile = useIsMobile;
function useRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace('#/', '') || 'home');
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#/', '') || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const nav = useCallback(r => {
    window.location.hash = '#/' + r;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  return [route, nav];
}
function loadTweaks() {
  try {
    const raw = localStorage.getItem('di-v2-tweaks');
    if (raw) return {
      ...window.__TWEAKS__,
      ...JSON.parse(raw)
    };
  } catch {}
  return window.__TWEAKS__;
}
function App() {
  const [tw, setTw] = useState(loadTweaks);
  const [route, nav] = useRoute();
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem('di-v2-tweaks', JSON.stringify(tw));
    } catch {}
  }, [tw]);
  useEffect(() => {
    const onMsg = e => {
      const d = e.data;
      if (!d || !d.type) return;
      if (d.type === '__activate_edit_mode') setEditMode(true);
      if (d.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    try {
      window.parent.postMessage({
        type: '__edit_mode_available'
      }, '*');
    } catch {}
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const setTweak = (key, val) => {
    setTw(prev => {
      const next = {
        ...prev,
        [key]: val
      };
      try {
        window.parent.postMessage({
          type: '__edit_mode_set_keys',
          edits: {
            [key]: val
          }
        }, '*');
      } catch {}
      return next;
    });
  };
  const T = window.AbundanceV2Theme(tw.palette);
  useEffect(() => {
    document.body.style.background = T.bg;
  }, [T.bg]);
  const [page, sub] = route.split('/');
  let content;
  if (page === 'home') content = React.createElement(window.AbundanceV2Home, {
    nav: nav,
    T: T
  });else if (page === 'sectors' && sub) content = React.createElement(window.AbundanceV2Sector, {
    id: sub,
    T: T,
    nav: nav
  });else if (page === 'sectors') content = React.createElement(window.AbundanceV2Sectors, {
    T: T,
    nav: nav
  });else if (page === 'explore') content = React.createElement(window.AbundanceV2Explore, {
    T: T
  });else if (page === 'stories' && sub) content = React.createElement(window.AbundanceV2Story, {
    slug: sub,
    T: T,
    nav: nav
  });else if (page === 'stories') content = React.createElement(window.AbundanceV2Stories, {
    T: T,
    nav: nav
  });else if (page === 'method') content = React.createElement(window.AbundanceV2Method, {
    T: T
  });else content = React.createElement(window.AbundanceV2Home, {
    nav: nav,
    T: T
  });
  const viewportMobile = useIsMobile(768);
  const isMobile = tw.device === 'mobile' || viewportMobile;
  return React.createElement("div", {
    style: {
      background: T.bg,
      minHeight: '100vh'
    }
  }, React.createElement(window.AbundanceV2Nav, {
    route: route,
    nav: nav,
    T: T
  }), content, React.createElement(window.AbundanceV2Nav, {
    route: route,
    nav: nav,
    T: T,
    mobile: true
  }), React.createElement("footer", {
    style: {
      background: T.bgDeep,
      color: T.bg,
      padding: `3rem 1.5rem ${isMobile ? '7rem' : '4rem'}`,
      marginTop: 0
    }
  }, React.createElement("div", {
    className: "di-footer-grid",
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      gap: '2rem'
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '.55rem',
      marginBottom: '.7rem'
    }
  }, React.createElement("img", {
    src: "assets/logo/di_logo_no_border.svg",
    alt: "",
    style: {
      height: 32,
      width: 32,
      display: 'block',
      borderRadius: 5,
      background: '#FFFFFF'
    }
  }), React.createElement("span", {
    style: {
      fontFamily: T.font,
      fontSize: '1.2rem'
    }
  }, "The Deflation Index")), React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: '.92rem',
      maxWidth: '42ch',
      margin: 0,
      lineHeight: 1.6
    }
  }, "An open record of how technology made things radically cheaper, and where the abundance went.")), [{
    h: 'Site',
    l: [['home', 'Home'], ['sectors', 'Sectors'], ['explore', 'Explore'], ['stories', 'Stories'], ['method', 'Method']]
  }, {
    h: 'Data',
    l: [['method', 'Sources & method'], ['https://github.com/deflation-index/deflation-index', 'Data & code (GitHub)'], ['https://github.com/deflation-index/deflation-index/blob/main/docs/operations/CHANGELOG.md', 'Changelog']]
  }, {
    h: 'Updates',
    l: [['https://deflationindex.substack.com', 'Newsletter'], ['https://deflationindex.substack.com/feed', 'RSS']]
  }].map((col, i) => React.createElement("div", {
    key: i
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: T.accent,
      marginBottom: '.8rem'
    }
  }, col.h), React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '.5rem'
    }
  }, col.l.map(([k, v]) => {
    const ext = k.startsWith('http');
    return React.createElement("li", {
      key: v
    }, React.createElement("a", {
      href: ext ? k : '#/' + k,
      target: ext ? '_blank' : undefined,
      rel: ext ? 'noopener' : undefined,
      onClick: e => {
        if (!ext) {
          e.preventDefault();
          nav(k);
        }
      },
      style: {
        color: 'rgba(255,255,255,0.85)',
        textDecoration: 'none',
        fontSize: '.92rem'
      }
    }, v));
  }))))), React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '2.5rem auto 0',
      paddingTop: '1.4rem',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: 'rgba(255,255,255,0.5)',
      letterSpacing: '.06em'
    }
  }, React.createElement("span", null, "v3.1.3 \xB7 2025 EARLY READ"), React.createElement("span", null, "data through dec 2025 \xB7 retrieved ", window.DI.early2025.retrieved))), editMode && React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 20,
      right: 20,
      width: 280,
      zIndex: 100,
      background: T.bg,
      borderRadius: 14,
      boxShadow: '0 14px 38px rgba(0,0,0,0.2)',
      border: `1px solid ${T.line}`,
      fontFamily: T.sans
    }
  }, React.createElement("div", {
    style: {
      padding: '1rem 1.1rem .7rem',
      borderBottom: `1px solid ${T.line}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: T.font,
      fontWeight: 500,
      fontSize: '1.05rem'
    }
  }, "Tweaks"), React.createElement("span", {
    style: {
      fontFamily: T.mono,
      fontSize: '.65rem',
      color: T.inkMute,
      cursor: 'pointer'
    },
    onClick: () => setEditMode(false)
  }, "close \u2715")), React.createElement("div", {
    style: {
      padding: '.9rem 1.1rem 1.1rem'
    }
  }, React.createElement("div", {
    style: {
      marginBottom: '.9rem'
    }
  }, React.createElement("label", {
    style: {
      fontFamily: T.mono,
      fontSize: '.66rem',
      color: T.inkMute,
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      marginBottom: '.45rem',
      display: 'block'
    }
  }, "Palette"), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 4,
      padding: 3,
      borderRadius: 10,
      background: T.bgAlt
    }
  }, Object.keys(window.AbundanceV2Palettes).map(k => {
    const p = window.AbundanceV2Palettes[k];
    return React.createElement("button", {
      key: k,
      onClick: () => setTweak('palette', k),
      style: {
        background: tw.palette === k ? T.ink : 'transparent',
        color: tw.palette === k ? T.bg : T.ink,
        border: 'none',
        padding: '.55rem .3rem',
        borderRadius: 7,
        cursor: 'pointer',
        fontFamily: T.font,
        fontSize: '.85rem',
        fontWeight: 500,
        textTransform: 'capitalize',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4
      }
    }, React.createElement("span", {
      style: {
        display: 'flex',
        gap: 2
      }
    }, React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: p.accent
      }
    }), React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: p.accent2
      }
    })), k);
  }))), React.createElement("div", {
    style: {
      marginBottom: '.9rem'
    }
  }, React.createElement("label", {
    style: {
      fontFamily: T.mono,
      fontSize: '.66rem',
      color: T.inkMute,
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      marginBottom: '.45rem',
      display: 'block'
    }
  }, "Device"), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 4,
      padding: 3,
      borderRadius: 10,
      background: T.bgAlt
    }
  }, [['desktop', 'Desktop'], ['mobile', 'Mobile']].map(([k, v]) => React.createElement("button", {
    key: k,
    onClick: () => setTweak('device', k),
    style: {
      background: tw.device === k ? T.ink : 'transparent',
      color: tw.device === k ? T.bg : T.ink,
      border: 'none',
      padding: '.55rem .3rem',
      borderRadius: 7,
      cursor: 'pointer',
      fontFamily: T.sans,
      fontSize: '.78rem',
      fontWeight: 500
    }
  }, v)))), React.createElement("div", null, React.createElement("label", {
    style: {
      fontFamily: T.mono,
      fontSize: '.66rem',
      color: T.inkMute,
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      marginBottom: '.45rem',
      display: 'block'
    }
  }, "Jump to"), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 4,
      padding: 3,
      borderRadius: 10,
      background: T.bgAlt
    }
  }, [['home', 'Home'], ['sectors', 'Sectors'], ['explore', 'Explore'], ['stories', 'Stories'], ['method', 'Method']].map(([k, v]) => React.createElement("button", {
    key: k,
    onClick: () => nav(k),
    style: {
      background: route.split('/')[0] === k ? T.ink : 'transparent',
      color: route.split('/')[0] === k ? T.bg : T.ink,
      border: 'none',
      padding: '.5rem .3rem',
      borderRadius: 7,
      cursor: 'pointer',
      fontFamily: T.sans,
      fontSize: '.78rem',
      fontWeight: 500
    }
  }, v)))))));
}
ReactDOM.createRoot(document.getElementById('app')).render(React.createElement(App, null));