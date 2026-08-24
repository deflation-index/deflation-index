const {
  useState: useStateP,
  useEffect: useEffectP,
  useMemo: useMemoP,
  useRef: useRefP
} = React;
const DIp = window.DI;
const RevealP = window.AbundanceV2Reveal;
const DatelineP = window.AbundanceV2Dateline;
const HEROES_P = window.AbundanceV2Heroes;
const fmtP = (v, plus = true) => `${v > 0 && plus ? '+' : ''}${v.toFixed(v < 10 && v > -10 ? 1 : 0)}%`;
const compactP = n => {
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
  if (n >= 1) return n.toFixed(0);
  if (n >= 0.01) return n.toFixed(2);
  return n.toExponential(1);
};
function SectorPageV2({
  id,
  T,
  nav
}) {
  const sector = DIp.sectors.find(s => s.id === id) || DIp.sectors[0];
  const Hero = HEROES_P[sector.id];
  const isMobileP = window.AbundanceV2UseIsMobile ? window.AbundanceV2UseIsMobile() : false;
  const idx = DIp.sectors.indexOf(sector);
  const next = DIp.sectors[(idx + 1) % DIp.sectors.length];
  const prev = DIp.sectors[(idx - 1 + DIp.sectors.length) % DIp.sectors.length];
  const start = sector.dataStart || 1990;
  const startIdx = DIp.years.indexOf(start);
  const startVal = sector.data[startIdx];
  const endVal = sector.data[sector.data.length - 1];
  const halflife = Math.log(2) / Math.abs(Math.log(1 + sector.annualRate / 100));
  const sectorSeries = [{
    key: sector.id,
    label: sector.metric,
    color: T.accent2,
    data: sector.data
  }, {
    key: 'cpi',
    label: 'CPI',
    color: T.cpi,
    data: DIp.cpi,
    dashed: true
  }];
  return React.createElement("div", {
    style: {
      background: T.bg,
      color: T.ink,
      fontFamily: T.sans,
      paddingBottom: '5rem'
    }
  }, React.createElement("section", {
    style: {
      background: T.bgAlt,
      padding: '3.5rem 1.5rem 2.5rem'
    }
  }, React.createElement("div", {
    className: "di-cols-1to-1p3",
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      gap: '2.5rem',
      alignItems: 'center'
    }
  }, React.createElement("div", null, React.createElement("a", {
    href: "#/sectors",
    onClick: e => {
      e.preventDefault();
      nav('sectors');
    },
    style: {
      display: 'inline-block',
      textDecoration: 'none',
      background: 'transparent',
      border: 'none',
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: T.inkMute,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      padding: 0,
      marginBottom: '.8rem'
    }
  }, "\u2190 All sectors"), React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.74rem',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: T.accent,
      marginBottom: '.6rem'
    }
  }, "Sector \xB7 weight ", (sector.weight * 100).toFixed(1), "%"), React.createElement("h1", {
    style: {
      fontFamily: T.font,
      fontSize: 'clamp(2.4rem,5vw,4rem)',
      fontWeight: 400,
      letterSpacing: '-.02em',
      lineHeight: 1.05,
      margin: '0 0 1rem'
    }
  }, sector.name, "."), React.createElement("p", {
    style: {
      fontSize: '1.2rem',
      lineHeight: 1.55,
      color: T.inkSoft,
      marginBottom: '1.5rem',
      maxWidth: '46ch'
    }
  }, sector.narrative), React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: '.6rem',
      padding: '.7rem 1rem',
      background: T.bg,
      border: `1px solid ${T.line}`,
      borderRadius: 14,
      fontFamily: T.mono,
      fontSize: '.78rem',
      color: T.inkSoft
    }
  }, React.createElement("span", {
    style: {
      color: T.accent
    }
  }, "\u25CF"), sector.metricLong)), React.createElement("div", null, React.createElement(Hero, {
    T: T
  })))), React.createElement("section", {
    style: {
      maxWidth: 1100,
      margin: '-1.5rem auto 0',
      padding: '0 1.5rem',
      position: 'relative',
      zIndex: 2
    }
  }, React.createElement("div", {
    className: "di-cols-1to4",
    style: {
      background: T.bg,
      border: `2px solid ${T.line}`,
      borderRadius: 18,
      padding: '2rem',
      gap: '1.5rem'
    }
  }, [{
    lbl: 'Cumulative drop',
    val: fmtP(sector.drop, false),
    big: true,
    color: T.accent2
  }, {
    lbl: 'Annual rate',
    val: fmtP(sector.annualRate, false),
    big: true,
    color: T.accent
  }, {
    lbl: 'Halving every',
    val: halflife.toFixed(1) + ' yrs',
    big: true,
    color: T.ink
  }, {
    lbl: '2025 raw',
    val: sector.raw2025,
    big: false,
    color: T.ink
  }].map((s, i) => React.createElement("div", {
    key: i
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      color: T.inkMute,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      marginBottom: '.5rem'
    }
  }, s.lbl), React.createElement("div", {
    style: {
      fontFamily: T.font,
      fontSize: s.big ? 'clamp(1.8rem,3.6vw,2.6rem)' : '1.3rem',
      fontWeight: 500,
      color: s.color,
      letterSpacing: '-.015em',
      lineHeight: 1
    }
  }, s.val))))), React.createElement("section", {
    style: {
      maxWidth: 780,
      margin: '0 auto',
      padding: '4rem 1.5rem'
    }
  }, React.createElement(RevealP, null, React.createElement("div", {
    className: "di-cols-1to2",
    style: {
      gap: '2rem'
    }
  }, React.createElement("div", {
    style: {
      padding: '1.6rem',
      background: T.bgAlt,
      borderRadius: 14,
      borderLeft: `4px solid ${T.inkMute}`
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      color: T.inkMute,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      marginBottom: '.5rem'
    }
  }, "Then \xB7 ", start), React.createElement("p", {
    style: {
      fontFamily: T.font,
      fontSize: '1.4rem',
      fontWeight: 400,
      lineHeight: 1.35,
      margin: 0,
      letterSpacing: '-.005em'
    }
  }, sector.tangible.then), React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.8rem',
      color: T.inkSoft,
      marginTop: '.8rem'
    }
  }, sector.raw1990)), React.createElement("div", {
    style: {
      padding: '1.6rem',
      background: T.bg,
      borderRadius: 14,
      borderLeft: `4px solid ${T.accent2}`,
      border: `1px solid ${T.line}`
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      color: T.accent2,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      marginBottom: '.5rem'
    }
  }, "Now \xB7 2025"), React.createElement("p", {
    style: {
      fontFamily: T.font,
      fontSize: '1.4rem',
      fontWeight: 400,
      lineHeight: 1.35,
      margin: 0,
      letterSpacing: '-.005em'
    }
  }, sector.tangible.now), React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.8rem',
      color: T.accent2,
      marginTop: '.8rem'
    }
  }, sector.raw2025))))), React.createElement("section", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '0 1.5rem 4rem'
    }
  }, React.createElement(RevealP, null, React.createElement("div", {
    style: {
      marginBottom: '1.2rem'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: T.inkMute,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      marginBottom: '.4rem'
    }
  }, "The trajectory"), React.createElement("h2", {
    style: {
      fontFamily: T.font,
      fontSize: '2rem',
      fontWeight: 400,
      margin: 0,
      letterSpacing: '-.015em'
    }
  }, sector.name, " cost vs CPI, 1990 = 100."))), React.createElement(RevealP, {
    delay: 100
  }, React.createElement("div", {
    style: {
      background: T.bg,
      border: `2px solid ${T.line}`,
      borderRadius: 18,
      padding: isMobileP ? '1rem' : '1.5rem'
    }
  }, React.createElement(DIChart, {
    theme: T,
    height: isMobileP ? 280 : 400,
    seriesOverride: sectorSeries
  })))), React.createElement("section", {
    style: {
      background: T.bgDeep,
      color: T.bg,
      padding: '4rem 1.5rem'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 780,
      margin: '0 auto',
      textAlign: 'center'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.72rem',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: T.accent,
      marginBottom: '.7rem'
    }
  }, "The $100 test"), React.createElement("h2", {
    style: {
      fontFamily: T.font,
      fontSize: '2.4rem',
      fontWeight: 400,
      letterSpacing: '-.02em',
      margin: '0 0 2rem',
      color: T.bg
    }
  }, "What the same $100 buys."), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gap: '2rem',
      alignItems: 'center'
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,.5)',
      marginBottom: '.6rem'
    }
  }, start), React.createElement("div", {
    style: {
      fontFamily: T.font,
      fontSize: '2.4rem',
      fontWeight: 500,
      color: 'rgba(255,255,255,.7)'
    }
  }, sector.buysPer100.then)), React.createElement("div", {
    style: {
      fontFamily: T.font,
      fontSize: '2rem',
      color: T.accent
    }
  }, "\u2192"), React.createElement("div", null, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: T.accent2,
      marginBottom: '.6rem'
    }
  }, "2025"), React.createElement("div", {
    style: {
      fontFamily: T.font,
      fontSize: '2.4rem',
      fontWeight: 600,
      color: T.accent2
    }
  }, sector.buysPer100.now))))), React.createElement("section", {
    style: {
      maxWidth: 780,
      margin: '0 auto',
      padding: '3rem 1.5rem'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: T.inkMute,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      marginBottom: '.7rem'
    }
  }, "Sources"), React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '.5rem'
    }
  }, sector.sources.map(src => React.createElement("span", {
    key: src,
    style: {
      padding: '.5rem .9rem',
      background: T.bgAlt,
      borderRadius: 999,
      fontFamily: T.mono,
      fontSize: '.78rem',
      color: T.inkSoft
    }
  }, src)))), React.createElement("section", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '2rem 1.5rem'
    }
  }, React.createElement("div", {
    className: "di-cols-1to2",
    style: {
      gap: '1rem'
    }
  }, [prev, next].map((s, i) => React.createElement("a", {
    key: s.id,
    href: '#/sectors/' + s.id,
    onClick: e => {
      e.preventDefault();
      nav('sectors/' + s.id);
    },
    style: {
      display: 'block',
      textDecoration: 'none',
      color: 'inherit',
      textAlign: i === 0 ? 'left' : 'right',
      background: T.bgAlt,
      border: `1px solid ${T.line}`,
      borderRadius: 14,
      padding: '1.4rem 1.6rem',
      cursor: 'pointer',
      fontFamily: T.sans
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      color: T.inkMute,
      letterSpacing: '.1em',
      textTransform: 'uppercase'
    }
  }, i === 0 ? '← Previous' : 'Next →'), React.createElement("div", {
    style: {
      fontFamily: T.font,
      fontSize: '1.5rem',
      fontWeight: 500,
      marginTop: '.3rem'
    }
  }, s.name), React.createElement("div", {
    style: {
      fontSize: '.85rem',
      color: T.inkSoft,
      marginTop: '.2rem'
    }
  }, fmtP(s.drop, false), " since ", s.dataStart || 1990))))));
}
function SectorsIndexV2({
  T,
  nav
}) {
  return React.createElement("div", {
    style: {
      background: T.bg,
      color: T.ink,
      fontFamily: T.sans,
      padding: '3rem 1.5rem 5rem'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, React.createElement(RevealP, null, React.createElement("div", {
    style: {
      marginBottom: '2.5rem'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: T.inkMute,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      marginBottom: '.5rem'
    }
  }, "Sectors"), React.createElement("h1", {
    style: {
      fontFamily: T.font,
      fontSize: 'clamp(2.4rem,5vw,3.6rem)',
      fontWeight: 400,
      letterSpacing: '-.02em',
      margin: 0
    }
  }, "Four sectors. One curve each."), React.createElement("p", {
    style: {
      color: T.inkSoft,
      fontSize: '1.1rem',
      maxWidth: '52ch',
      marginTop: '.6rem'
    }
  }, "The Deflation Index averages four sectors. Each tells its own story."))), React.createElement("div", {
    className: "di-cols-1to2",
    style: {
      gap: '1.4rem'
    }
  }, DIp.sectors.map((s, i) => {
    const Hero = HEROES_P[s.id];
    return React.createElement(RevealP, {
      key: s.id,
      delay: i * 70
    }, React.createElement("a", {
      href: '#/sectors/' + s.id,
      onClick: e => {
        e.preventDefault();
        nav('sectors/' + s.id);
      },
      style: {
        textAlign: 'left',
        display: 'block',
        width: '100%',
        textDecoration: 'none',
        color: 'inherit',
        background: T.bg,
        border: `2px solid ${T.line}`,
        borderRadius: 18,
        padding: '1.6rem',
        cursor: 'pointer',
        fontFamily: T.sans,
        transition: 'transform .25s, border-color .25s'
      },
      onMouseEnter: e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = T.accent;
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.borderColor = T.line;
      }
    }, React.createElement("div", {
      className: "di-cols-1to-fixR",
      style: {
        gap: '1.2rem',
        alignItems: 'center'
      }
    }, React.createElement("div", null, React.createElement("div", {
      style: {
        fontFamily: T.mono,
        fontSize: '.7rem',
        color: T.accent,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        marginBottom: '.4rem'
      }
    }, s.metric), React.createElement("div", {
      style: {
        fontFamily: T.font,
        fontSize: '2rem',
        fontWeight: 500,
        letterSpacing: '-.01em',
        marginBottom: '.5rem'
      }
    }, s.name), React.createElement("div", {
      style: {
        fontFamily: T.font,
        fontSize: '2.2rem',
        fontWeight: 500,
        color: T.accent2,
        lineHeight: 1
      }
    }, fmtP(s.drop, false)), React.createElement("div", {
      style: {
        fontFamily: T.mono,
        fontSize: '.78rem',
        color: T.inkMute,
        marginTop: '.4rem'
      }
    }, "since ", s.dataStart || 1990)), React.createElement("div", null, React.createElement(Hero, {
      T: T
    })))));
  }))));
}
function ExploreV2({
  T
}) {
  const [yearA, setYearA] = useStateP(1990);
  const [yearB, setYearB] = useStateP(2025);
  const [sectorId, setSectorId] = useStateP('computing');
  const [dollars, setDollars] = useStateP(100);
  const sector = DIp.sectors.find(s => s.id === sectorId);
  const idxA = DIp.years.indexOf(yearA);
  const idxB = DIp.years.indexOf(yearB);
  const valA = sector.data[idxA];
  const valB = sector.data[idxB];
  const baseUnit = sector.id === 'computing' ? 0.000104 : sector.id === 'communications' ? 10.8 : sector.id === 'energy' ? 240 : 0.086;
  const buyA = baseUnit * 100 / valA * (dollars / 100);
  const buyB = baseUnit * 100 / valB * (dollars / 100);
  const unit = sector.id === 'computing' ? 'GFLOPS' : sector.id === 'communications' ? 'GB moved' : sector.id === 'energy' ? 'kWh' : 'kWh';
  const m2A = DIp.m2[idxA],
    m2B = DIp.m2[idxB];
  const cpiA = DIp.cpi[idxA],
    cpiB = DIp.cpi[idxB];
  const diA = DIp.di[idxA],
    diB = DIp.di[idxB];
  const isMobileE = window.AbundanceV2UseIsMobile ? window.AbundanceV2UseIsMobile() : false;
  const card = {
    background: T.bg,
    border: `2px solid ${T.line}`,
    borderRadius: 18,
    padding: isMobileE ? '1.1rem' : '1.5rem'
  };
  const lbl = {
    fontFamily: T.mono,
    fontSize: '.7rem',
    color: T.inkMute,
    letterSpacing: '.1em',
    textTransform: 'uppercase',
    marginBottom: '.4rem'
  };
  return React.createElement("div", {
    style: {
      background: T.bg,
      color: T.ink,
      fontFamily: T.sans,
      padding: '3rem 1.5rem 5rem'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, React.createElement(RevealP, null, React.createElement("div", {
    style: {
      marginBottom: '2rem'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: T.inkMute,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      marginBottom: '.5rem'
    }
  }, "Explore"), React.createElement("h1", {
    style: {
      fontFamily: T.font,
      fontSize: 'clamp(2.2rem,5vw,3.4rem)',
      fontWeight: 400,
      letterSpacing: '-.02em',
      margin: 0
    }
  }, "Roll your own."), React.createElement("p", {
    style: {
      color: T.inkSoft,
      fontSize: '1.05rem',
      maxWidth: '52ch',
      marginTop: '.6rem'
    }
  }, "Pick two years. Compare every line. See what a hundred dollars bought."))), React.createElement(RevealP, null, React.createElement("div", {
    style: {
      ...card,
      marginBottom: '1.4rem'
    }
  }, React.createElement(DIChart, {
    theme: T,
    height: isMobileE ? 320 : 460,
    annotations: [{
      year: yearA,
      label: 'A'
    }, {
      year: yearB,
      label: 'B'
    }]
  }))), React.createElement(RevealP, null, React.createElement("div", {
    style: {
      ...card,
      marginBottom: '1.4rem'
    }
  }, React.createElement("div", {
    style: lbl
  }, "Year compare \xB7 A vs B"), React.createElement("div", {
    className: "di-cols-1to2",
    style: {
      gap: '1.5rem',
      marginBottom: '1.5rem'
    }
  }, [['A', yearA, setYearA, T.inkMute], ['B', yearB, setYearB, T.accent]].map(([k, v, setV, col]) => React.createElement("div", {
    key: k
  }, React.createElement("div", {
    style: {
      fontFamily: T.font,
      fontSize: '2.2rem',
      fontWeight: 500,
      color: col,
      lineHeight: 1,
      marginBottom: '.5rem'
    }
  }, v), React.createElement("input", {
    type: "range",
    min: 1990,
    max: 2025,
    step: 1,
    value: v,
    "aria-label": 'Comparison year ' + k,
    onChange: e => setV(+e.target.value),
    style: {
      width: '100%',
      accentColor: col
    }
  })))), React.createElement("div", {
    className: "di-cols-1to3",
    style: {
      gap: '1rem'
    }
  }, [{
    lab: 'Tech (DI)',
    a: diA,
    b: diB,
    color: T.di
  }, {
    lab: 'M2',
    a: m2A,
    b: m2B,
    color: T.m2
  }, {
    lab: 'CPI',
    a: cpiA,
    b: cpiB,
    color: T.cpi
  }].map(r => {
    const pct = (r.b / r.a - 1) * 100;
    return React.createElement("div", {
      key: r.lab,
      style: {
        padding: '1rem',
        background: T.bgAlt,
        borderRadius: 12,
        borderTop: `3px solid ${r.color}`
      }
    }, React.createElement("div", {
      style: lbl
    }, r.lab), React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '.6rem'
      }
    }, React.createElement("span", {
      style: {
        fontFamily: T.font,
        fontSize: '1.1rem',
        color: T.inkSoft
      }
    }, r.a.toFixed(r.a < 10 ? 2 : 0)), React.createElement("span", {
      style: {
        color: T.inkMute
      }
    }, "\u2192"), React.createElement("span", {
      style: {
        fontFamily: T.font,
        fontSize: '1.4rem',
        fontWeight: 500
      }
    }, r.b.toFixed(r.b < 10 ? 2 : 0))), React.createElement("div", {
      style: {
        fontFamily: T.mono,
        fontSize: '.8rem',
        color: pct < 0 ? T.accent2 : T.accent,
        marginTop: '.4rem'
      }
    }, fmtP(pct, true)));
  })))), React.createElement(RevealP, null, React.createElement("div", {
    style: {
      ...card
    }
  }, React.createElement("div", {
    style: lbl
  }, "Dollar calculator"), React.createElement("h3", {
    style: {
      fontFamily: T.font,
      fontSize: '1.6rem',
      fontWeight: 400,
      margin: '0 0 1.2rem'
    }
  }, "What does ", React.createElement("span", {
    style: {
      color: T.accent
    }
  }, "$", dollars), " buy in ", React.createElement("span", {
    style: {
      color: T.inkMute
    }
  }, yearA), " vs ", React.createElement("span", {
    style: {
      color: T.accent2
    }
  }, yearB), "?"), React.createElement("div", {
    className: "di-cols-1to-fixL",
    style: {
      gap: '1.5rem',
      marginBottom: '1.5rem'
    }
  }, React.createElement("div", null, React.createElement("input", {
    type: "range",
    min: 1,
    max: 1000,
    step: 1,
    value: dollars,
    "aria-label": "Dollar amount",
    onChange: e => setDollars(+e.target.value),
    style: {
      width: '100%',
      accentColor: T.accent
    }
  }), React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.78rem',
      color: T.inkMute,
      marginTop: '.4rem'
    }
  }, "$1 \u2014 $1,000")), React.createElement("div", {
    style: {
      display: 'flex',
      gap: '.5rem',
      flexWrap: 'wrap'
    }
  }, DIp.sectors.map(s => React.createElement("button", {
    key: s.id,
    onClick: () => setSectorId(s.id),
    style: {
      padding: '.6rem 1rem',
      borderRadius: 999,
      fontFamily: T.sans,
      fontSize: '.85rem',
      fontWeight: 500,
      background: sectorId === s.id ? T.ink : 'transparent',
      color: sectorId === s.id ? T.bg : T.ink,
      border: `1px solid ${sectorId === s.id ? T.ink : T.line}`,
      cursor: 'pointer'
    }
  }, s.name)))), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gap: '1.5rem',
      alignItems: 'center',
      padding: '2rem 1rem',
      background: T.bgAlt,
      borderRadius: 14
    }
  }, React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, React.createElement("div", {
    style: lbl
  }, yearA), React.createElement("div", {
    style: {
      fontFamily: T.font,
      fontSize: 'clamp(1.8rem,4vw,2.6rem)',
      fontWeight: 500,
      color: T.inkSoft
    }
  }, compactP(buyA)), React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.78rem',
      color: T.inkMute,
      marginTop: '.3rem'
    }
  }, unit)), React.createElement("div", {
    style: {
      fontSize: '2rem',
      color: T.accent
    }
  }, "\xD7", compactP(buyB / buyA)), React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, React.createElement("div", {
    style: {
      ...lbl,
      color: T.accent2
    }
  }, yearB), React.createElement("div", {
    style: {
      fontFamily: T.font,
      fontSize: 'clamp(1.8rem,4vw,2.6rem)',
      fontWeight: 600,
      color: T.accent2
    }
  }, compactP(buyB)), React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.78rem',
      color: T.inkMute,
      marginTop: '.3rem'
    }
  }, unit)))))));
}
function StoriesV2({
  T,
  nav
}) {
  return React.createElement("div", {
    style: {
      background: T.bg,
      color: T.ink,
      fontFamily: T.sans,
      padding: '3rem 1.5rem 5rem'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 780,
      margin: '0 auto'
    }
  }, React.createElement(RevealP, null, React.createElement("div", {
    style: {
      marginBottom: '2.5rem'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: T.inkMute,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      marginBottom: '.5rem'
    }
  }, "Stories"), React.createElement("h1", {
    style: {
      fontFamily: T.font,
      fontSize: 'clamp(2.2rem,5vw,3.4rem)',
      fontWeight: 400,
      letterSpacing: '-.02em',
      margin: 0
    }
  }, "Going deeper."), React.createElement("p", {
    style: {
      color: T.inkSoft,
      fontSize: '1.05rem',
      maxWidth: '52ch',
      marginTop: '.6rem'
    }
  }, "Short essays on the data. New ones occasionally."))), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }, DIp.stories.map((st, i) => React.createElement(RevealP, {
    key: st.slug,
    delay: i * 60
  }, React.createElement("a", {
    href: '#/stories/' + st.slug,
    onClick: e => {
      if (nav) {
        e.preventDefault();
        nav('stories/' + st.slug);
      }
    },
    style: {
      display: 'block',
      background: T.bg,
      border: `1px solid ${T.line}`,
      borderRadius: 14,
      padding: '1.6rem 1.8rem',
      textDecoration: 'none',
      color: T.ink,
      transition: 'border-color .2s, transform .2s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = T.accent;
      e.currentTarget.style.transform = 'translateX(4px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = T.line;
      e.currentTarget.style.transform = 'none';
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: '1rem',
      marginBottom: '.5rem'
    }
  }, React.createElement("span", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: T.accent
    }
  }, st.kicker), React.createElement("span", {
    style: {
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: T.inkMute
    }
  }, st.readMins, " min read")), React.createElement("div", {
    style: {
      fontFamily: T.font,
      fontSize: '1.6rem',
      fontWeight: 500,
      letterSpacing: '-.01em',
      lineHeight: 1.2,
      marginBottom: '.4rem'
    }
  }, st.title), React.createElement("p", {
    style: {
      color: T.inkSoft,
      fontSize: '.95rem',
      margin: 0,
      lineHeight: 1.55
    }
  }, st.dek)))))));
}
function StoryDetailV2({
  slug,
  T,
  nav
}) {
  const story = DIp.stories.find(s => s.slug === slug);
  const [body, setBody] = React.useState(null);
  const [err, setErr] = React.useState(null);
  React.useEffect(() => {
    let cancelled = false;
    setBody(null);
    setErr(null);
    fetch('data/stories/' + slug + '.md', {
      cache: 'no-cache'
    }).then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(txt => {
      if (!cancelled) setBody(txt);
    }).catch(e => {
      if (!cancelled) setErr(String(e.message || e));
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);
  if (!story) {
    return React.createElement("div", {
      style: {
        background: T.bg,
        color: T.ink,
        fontFamily: T.sans,
        padding: '4rem 1.5rem 6rem',
        textAlign: 'center'
      }
    }, React.createElement("div", {
      style: {
        maxWidth: 560,
        margin: '0 auto'
      }
    }, React.createElement("div", {
      style: {
        fontFamily: T.mono,
        fontSize: '.72rem',
        color: T.inkMute,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        marginBottom: '.6rem'
      }
    }, "Story not found"), React.createElement("h1", {
      style: {
        fontFamily: T.font,
        fontSize: '2.2rem',
        fontWeight: 400,
        letterSpacing: '-.02em',
        margin: '0 0 1rem'
      }
    }, "That essay doesn't exist."), React.createElement("a", {
      href: "#/stories",
      onClick: e => {
        e.preventDefault();
        nav && nav('stories');
      },
      style: {
        color: T.accent,
        textDecoration: 'underline',
        textUnderlineOffset: '2px'
      }
    }, "\u2190 All stories")));
  }
  const html = body && window.marked ? window.marked.parse(body) : '';
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
  return React.createElement("div", {
    style: {
      background: T.bg,
      color: T.ink,
      fontFamily: T.sans,
      padding: '2.5rem 1.5rem 5rem'
    }
  }, React.createElement("style", null, proseStyle), React.createElement("div", {
    style: {
      maxWidth: 680,
      margin: '0 auto'
    }
  }, React.createElement(RevealP, null, React.createElement("a", {
    href: "#/stories",
    onClick: e => {
      e.preventDefault();
      nav && nav('stories');
    },
    style: {
      display: 'inline-block',
      fontFamily: T.mono,
      fontSize: '.78rem',
      color: T.inkMute,
      textDecoration: 'none',
      letterSpacing: '.04em',
      marginBottom: '1.6rem'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = T.accent;
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = T.inkMute;
    }
  }, "\u2190 All stories"), React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: '1rem',
      marginBottom: '.8rem'
    }
  }, React.createElement("span", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: T.accent
    }
  }, story.kicker), React.createElement("span", {
    style: {
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: T.inkMute
    }
  }, story.readMins, " min read")), React.createElement("h1", {
    style: {
      fontFamily: T.font,
      fontSize: 'clamp(2rem,4.5vw,3rem)',
      fontWeight: 400,
      letterSpacing: '-.02em',
      margin: '0 0 .8rem',
      lineHeight: 1.15
    }
  }, story.title), React.createElement("p", {
    style: {
      color: T.inkSoft,
      fontSize: '1.15rem',
      maxWidth: '58ch',
      margin: '0 0 2.4rem',
      lineHeight: 1.55
    }
  }, story.dek)), err && React.createElement("div", {
    style: {
      padding: '1.4rem',
      background: T.bgAlt,
      borderRadius: 12,
      fontFamily: T.mono,
      fontSize: '.85rem',
      color: T.inkSoft
    }
  }, "Couldn't load this story (", err, "). If you're viewing locally, make sure you're serving the folder over HTTP rather than opening index.html directly."), !err && body == null && React.createElement("div", {
    style: {
      padding: '1.4rem',
      fontFamily: T.mono,
      fontSize: '.85rem',
      color: T.inkMute
    }
  }, "Loading\u2026"), !err && body != null && React.createElement(RevealP, null, React.createElement("div", {
    className: "di-prose",
    dangerouslySetInnerHTML: {
      __html: html
    }
  }))));
}
function MethodV2({
  T
}) {
  const sectionTitle = {
    fontFamily: T.font,
    fontSize: '1.6rem',
    fontWeight: 500,
    letterSpacing: '-.01em',
    margin: '2rem 0 .8rem'
  };
  const para = {
    fontFamily: T.sans,
    fontSize: '1rem',
    color: T.inkSoft,
    lineHeight: 1.65,
    marginBottom: '1rem'
  };
  return React.createElement("div", {
    style: {
      background: T.bg,
      color: T.ink,
      fontFamily: T.sans,
      padding: '3rem 1.5rem 5rem'
    }
  }, React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto'
    }
  }, React.createElement(RevealP, null, React.createElement("div", {
    style: {
      marginBottom: '2rem'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.72rem',
      color: T.inkMute,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      marginBottom: '.5rem'
    }
  }, "Method"), React.createElement("h1", {
    style: {
      fontFamily: T.font,
      fontSize: 'clamp(2.2rem,5vw,3.4rem)',
      fontWeight: 400,
      letterSpacing: '-.02em',
      margin: 0
    }
  }, "How it's built."), React.createElement("p", {
    style: {
      color: T.inkSoft,
      fontSize: '1.1rem',
      maxWidth: '52ch',
      marginTop: '.6rem'
    }
  }, "The Deflation Index measures cost per unit of capability: what a dollar buys in compute, bandwidth, kilowatt-hours, and stored energy. It is not a cost-of-living measure. The distance between the two is the subject."), React.createElement("p", {
    style: {
      color: T.inkSoft,
      fontSize: '1.1rem',
      maxWidth: '52ch',
      marginTop: '.6rem'
    }
  }, "Mechanically, it is a weighted average of four technology-cost indices, each rebased so that 1990 = 100."))), React.createElement(RevealP, null, React.createElement("h2", {
    style: sectionTitle
  }, "The formula"), React.createElement("pre", {
    style: {
      background: T.bgDeep,
      color: T.bg,
      padding: '1.4rem',
      borderRadius: 14,
      fontFamily: T.mono,
      fontSize: '.85rem',
      overflow: 'auto',
      lineHeight: 1.7,
      margin: '1rem 0 1.4rem'
    }
  }, `DI(t) = Π Iᵢ(t)^wᵢ        (weighted geometric mean)

where:
  wᵢ = sector weight (sum to 1.0)
  Iᵢ(t) = sector index, 100 at its first measured year;
          held at 100 before measurement begins

Sector weights (v4.0):          Series starts:
  Computing       0.2941          1990
  Communications  0.2353          1998
  Energy          0.2941          2010
  Transportation  0.1765          2010

A geometric mean treats a halving as a halving wherever
it happens; an arithmetic mean is dominated by the
slowest components. The arithmetic variant is published
as a sensitivity in data/v4/draft_output.json.`), React.createElement("p", {
    style: {
      ...para,
      fontSize: '.92rem'
    }
  }, "The weights balance GDP contribution, enabling effect, and deflationary force \u2014 and that third factor makes the index partly weighted by the thing it measures. We disclose and size that circularity in ", React.createElement("a", {
    href: "https://github.com/deflation-index/deflation-index/blob/main/docs/methodology/WEIGHT_JUSTIFICATION.md#a-circularity-in-the-weighting",
    target: "_blank",
    rel: "noopener",
    style: {
      color: T.accent
    }
  }, "the weighting doc"), ": removing the factor entirely leaves the composite at \u221299.98% (published: \u221299.97%).")), React.createElement(RevealP, null, React.createElement("h2", {
    style: sectionTitle
  }, "The line, and its reference"), React.createElement("p", {
    style: para
  }, React.createElement("strong", {
    style: {
      color: T.ink
    }
  }, "Deflation Index (DI):"), " the weighted geometric mean above \u2014 the measurement this site exists for. A value of 0.03 in 2025 means the basket costs three-hundredths of one percent of its 1990 price \u2014 a roughly 3,300-fold decline."), React.createElement("p", {
    style: para
  }, React.createElement("strong", {
    style: {
      color: T.ink
    }
  }, "CPI (reference):"), " the Consumer Price Index for All Urban Consumers, from the Bureau of Labor Statistics (CPIAUCSL), indexed to 1990 = 100. Drawn alongside the index so a nominal-dollar series has its context: it answers \"compared to what?\" before you have to ask."), React.createElement("p", {
    style: para
  }, React.createElement("strong", {
    style: {
      color: T.ink
    }
  }, "M2:"), " the broad money supply (FRED, M2SL) is published in our data and available in ", React.createElement("a", {
    href: "#/explore",
    style: {
      color: T.accent
    }
  }, "Explore"), " for anyone who wants the monetary comparison. What that comparison suggests is an essay, not a headline \u2014 ", React.createElement("a", {
    href: "#/stories/the-abundance-gap",
    style: {
      color: T.accent
    }
  }, "we make that argument here"), ", separately from the measurement.")), React.createElement(RevealP, null, React.createElement("h2", {
    style: sectionTitle
  }, "What v4.0 means"), React.createElement(DatelineP, {
    T: T,
    parts: ['v4.0', '2025 measured', 'Ledger open']
  }), React.createElement("p", {
    style: {
      ...para,
      marginTop: '1rem'
    }
  }, "Every sector's 2025 point is now ", React.createElement("strong", {
    style: {
      color: T.ink
    }
  }, "measured"), " \u2014 IRENA published solar in July 2026, BloombergNEF's battery survey and TeleGeography's transit pricing are in, and M2/CPI come directly from FRED/BLS. The verification ledger stays open by design: every anchor datapoint in ", React.createElement("a", {
    href: "https://github.com/deflation-index/deflation-index/tree/main/data/v4",
    target: "_blank",
    rel: "noopener",
    style: {
      color: T.accent
    }
  }, "data/v4"), " carries a status \u2014 verified against a primary document, cross-checked against a cited secondary, or interpolated within documented bounds \u2014 and the release standard requires every row to cite a published source. The ledger is preserved as shipped \u2014 the index is complete through 2025, and anyone can promote or challenge a row from the public record."), React.createElement("div", {
    className: "di-cols-1to2",
    style: {
      gap: '1rem',
      marginTop: '1.5rem'
    }
  }, React.createElement("div", {
    style: {
      padding: '1.2rem',
      background: T.bgAlt,
      borderRadius: 12
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      color: T.accent,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      marginBottom: '.6rem'
    }
  }, "Measured, 2025"), React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: '1.2rem',
      fontSize: '.92rem',
      color: T.inkSoft,
      lineHeight: 1.7
    }
  }, DIp.early2025.measured.map(m => React.createElement("li", {
    key: m
  }, m)))), React.createElement("div", {
    style: {
      padding: '1.2rem',
      background: T.bgAlt,
      borderRadius: 12
    }
  }, React.createElement("div", {
    style: {
      fontFamily: T.mono,
      fontSize: '.7rem',
      color: T.inkMute,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      marginBottom: '.6rem'
    }
  }, "Verification ledger \u2014 as shipped"), React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: '1.2rem',
      fontSize: '.92rem',
      color: T.inkSoft,
      lineHeight: 1.7
    }
  }, DIp.early2025.pending.map(m => React.createElement("li", {
    key: m
  }, m)))))), React.createElement(RevealP, null, React.createElement("h2", {
    style: sectionTitle
  }, "Sources"), React.createElement("p", {
    style: {
      ...para,
      marginBottom: '1.2rem'
    }
  }, "One canonical link per institution below. Series-level URLs and per-datapoint provenance live in ", React.createElement("a", {
    href: "https://github.com/deflation-index/deflation-index/blob/main/data/constants.json",
    target: "_blank",
    rel: "noopener",
    style: {
      color: T.accent,
      textDecoration: 'underline',
      textDecorationThickness: 1,
      textUnderlineOffset: '2px'
    }
  }, "constants.json"), "."), React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    }
  }, [['Compute', 'Cost-of-computing record (period primaries)', 'https://en.wikipedia.org/wiki/Floating_point_operations_per_second'], ['Storage', 'Komorowski / Backblaze cost-per-GB', 'https://www.backblaze.com/blog/hard-drive-cost-per-gigabyte/'], ['Memory', 'McCallum series via Our World in Data', 'https://ourworldindata.org/grapher/historical-cost-of-computer-memory-and-storage'], ['Communications', 'DrPeering + TeleGeography — IP transit', 'https://resources.telegeography.com/ip-transit-pricing-data'], ['Energy', 'IRENA — Renewable Power Generation Costs', 'https://www.irena.org/Publications'], ['Transportation', 'BloombergNEF — Li-ion Battery Price Survey', 'https://about.bnef.com/blog/category/transportation/'], ['M2', 'Federal Reserve via FRED (M2SL)', 'https://fred.stlouisfed.org/series/M2SL'], ['CPI', 'U.S. Bureau of Labor Statistics (CPIAUCSL)', 'https://fred.stlouisfed.org/series/CPIAUCSL']].map(([k, v, url]) => React.createElement("li", {
    key: k,
    className: "di-cols-1to-fixL",
    style: {
      padding: '.85rem 0',
      borderBottom: `1px solid ${T.line}`,
      gap: '.4rem',
      alignItems: 'baseline'
    }
  }, React.createElement("span", {
    style: {
      fontFamily: T.font,
      fontWeight: 500
    }
  }, k), React.createElement("a", {
    href: url,
    target: "_blank",
    rel: "noopener",
    style: {
      fontFamily: T.mono,
      fontSize: '.85rem',
      color: T.inkSoft,
      textDecoration: 'none'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = T.accent;
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = T.inkSoft;
    }
  }, v, " ", React.createElement("span", {
    style: {
      color: T.inkMute
    }
  }, "\u2197")))))), React.createElement(RevealP, null, React.createElement("h2", {
    style: sectionTitle
  }, "What it isn't"), React.createElement("p", {
    style: para
  }, "It is not a replacement for CPI. The Bureau of Labor Statistics measures what people actually pay; the Deflation Index measures what technology made possible. The two together tell a story \u2014 but they answer different questions."), React.createElement("p", {
    style: para
  }, "It is also not yet complete. The four sectors here are the first generation: computing, communications, energy, and lithium-ion batteries \u2014 input layers with the longest time series and the cleanest data. Healthcare, education, housing, and other sectors will follow as the data reaches the same standard. We'd rather wait for measurements we can defend than publish numbers we can't."), React.createElement("p", {
    style: para
  }, "When those sectors are added, they will measure the same thing the current four measure: the ", React.createElement("em", null, "technology input layer"), " of each sector \u2014 genomic sequencing cost, AI-assisted radiology per scan, online-learning cost-per-credit, modular-construction cost-per-square-foot \u2014 not insurance premiums, not tuition, not home prices. Those are what CPI measures. The gap between the two is what this index exists to make visible."), React.createElement("p", {
    style: {
      ...para,
      marginTop: '.8rem'
    }
  }, React.createElement("a", {
    href: "https://github.com/deflation-index/deflation-index/blob/main/docs/methodology/INPUT_LAYER_PRINCIPLE.md",
    target: "_blank",
    rel: "noopener",
    style: {
      color: T.accent,
      textDecoration: 'underline',
      textDecorationThickness: 1,
      textUnderlineOffset: '2px',
      fontFamily: T.mono,
      fontSize: '.85rem'
    }
  }, "\u2192 Why we measure inputs, not headline prices"))), React.createElement(RevealP, null, React.createElement("h2", {
    style: sectionTitle
  }, "The correction, shipped"), React.createElement("p", {
    style: para
  }, "In July 2026 we audited our own index and found the published headline was too conservative: arithmetic averaging muted the fastest-falling components, several early-year series were back-extrapolations rather than measurements, and sector labels didn't match their construction. This release candidate is the fix \u2014 geometric averaging, single sourced metrics per sector, and series that start when measurement starts. The corrections cut both ways: computing got much deeper; energy's claim got smaller, because the honest series is shorter."), React.createElement("p", {
    style: para
  }, "The full audit \u2014 including the unflattering parts \u2014 is public, next to the data it criticizes. The retired arithmetic method is published alongside as a sensitivity. Numbers that survive that kind of scrutiny are the only kind worth publishing."), React.createElement("p", {
    style: {
      ...para,
      marginTop: '.8rem'
    }
  }, React.createElement("a", {
    href: "https://github.com/deflation-index/deflation-index/blob/main/docs/methodology/AUDIT_2026-07_COMPUTING_SERIES.md",
    target: "_blank",
    rel: "noopener",
    style: {
      color: T.accent,
      textDecoration: 'underline',
      textDecorationThickness: 1,
      textUnderlineOffset: '2px',
      fontFamily: T.mono,
      fontSize: '.85rem'
    }
  }, "\u2192 Read the full audit")))));
}
window.AbundanceV2Sectors = SectorsIndexV2;
window.AbundanceV2Sector = SectorPageV2;
window.AbundanceV2Explore = ExploreV2;
window.AbundanceV2Stories = StoriesV2;
window.AbundanceV2Story = StoryDetailV2;
window.AbundanceV2Method = MethodV2;