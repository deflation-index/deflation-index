const {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback
} = React;
function DIChart({
  theme = {},
  height = 360,
  showBrush = true,
  showLegend = true,
  showToggle = true,
  defaultMode = 'cumulative',
  defaultScale = 'log',
  compact = false,
  seriesOverride = null,
  annotations = []
}) {
  const DI = window.DI;
  const T = {
    bg: theme.bg || '#FFFFFF',
    ink: theme.ink || '#1A1A1A',
    inkMute: theme.inkMute || '#9A9A98',
    line: theme.line || '#E8E8E5',
    grid: theme.grid || 'rgba(26,26,26,0.06)',
    accent: theme.accent || '#B88A2B',
    di: theme.di || '#2F5F7A',
    m2: theme.m2 || '#B88A2B',
    cpi: theme.cpi || '#6A6A68',
    font: theme.font || "'Spectral', Georgia, serif",
    mono: theme.mono || "'Space Mono', ui-monospace, monospace",
    tooltipBg: theme.tooltipBg || '#FFFFFF',
    ...theme
  };
  const series = useMemo(() => {
    if (seriesOverride) return seriesOverride;
    return [{
      key: 'di',
      label: 'Deflation Index',
      color: T.di,
      data: DI.di
    }, {
      key: 'm2',
      label: 'M2 money supply',
      color: T.m2,
      data: DI.m2
    }, {
      key: 'cpi',
      label: 'CPI',
      color: T.cpi,
      data: DI.cpi,
      dashed: true
    }];
  }, [seriesOverride, T.di, T.m2, T.cpi]);
  const [mode, setMode] = useState(defaultMode);
  const [scale, setScale] = useState(defaultScale);
  const [enabled, setEnabled] = useState(() => Object.fromEntries(series.map(s => [s.key, true])));
  const [range, setRange] = useState([0, DI.years.length - 1]);
  const [hover, setHover] = useState(null);
  const wrapRef = useRef(null);
  const [w, setW] = useState(800);
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(es => setW(es[0].contentRect.width));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);
  const annualOf = arr => arr.map((v, i) => i === 0 ? 0 : (v / arr[i - 1] - 1) * 100);
  const displaySeries = useMemo(() => series.map(s => ({
    ...s,
    display: mode === 'annual' ? annualOf(s.data) : s.data
  })), [series, mode]);
  const [i0, i1] = range;
  const years = DI.years.slice(i0, i1 + 1);
  const activeValues = displaySeries.filter(s => enabled[s.key]).flatMap(s => s.display.slice(i0, i1 + 1));
  let yMin, yMax;
  if (mode === 'annual') {
    const max = Math.max(...activeValues, 5);
    const min = Math.min(...activeValues, -5);
    const pad = Math.max(2, (max - min) * 0.08);
    yMin = min - pad;
    yMax = max + pad;
  } else if (scale === 'log') {
    const pos = activeValues.filter(v => v > 0);
    yMin = Math.max(0.05, Math.min(...pos) * 0.7);
    yMax = Math.max(...pos) * 1.15;
  } else {
    yMin = 0;
    yMax = Math.max(...activeValues) * 1.08;
  }
  const pad = {
    l: 48,
    r: 20,
    t: 36,
    b: 42
  };
  const H = height;
  const W = Math.max(320, w);
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const x = i => {
    const idx = i - i0;
    const span = Math.max(1, i1 - i0);
    return pad.l + idx / span * innerW;
  };
  const y = v => {
    if (mode === 'annual' || scale === 'linear') {
      return pad.t + (1 - (v - yMin) / (yMax - yMin)) * innerH;
    }
    const lv = Math.log10(Math.max(v, 0.01));
    const lmin = Math.log10(yMin);
    const lmax = Math.log10(yMax);
    return pad.t + (1 - (lv - lmin) / (lmax - lmin)) * innerH;
  };
  const pathFor = arr => {
    let d = '';
    for (let i = i0; i <= i1; i++) {
      const px = x(i);
      const py = y(arr[i]);
      d += (i === i0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
    }
    return d;
  };
  const areaFor = arr => {
    let d = '';
    const baseY = mode === 'annual' ? y(0) : pad.t + innerH;
    for (let i = i0; i <= i1; i++) {
      const px = x(i);
      const py = y(arr[i]);
      d += (i === i0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
    }
    d += `L${x(i1).toFixed(1)},${baseY.toFixed(1)} L${x(i0).toFixed(1)},${baseY.toFixed(1)} Z`;
    return d;
  };
  const yTicks = useMemo(() => {
    if (mode === 'annual') {
      const step = Math.ceil((yMax - yMin) / 5);
      const ticks = [];
      const start = Math.ceil(yMin / step) * step;
      for (let v = start; v <= yMax; v += step) ticks.push(v);
      if (!ticks.includes(0) && yMin < 0 && yMax > 0) ticks.push(0);
      return ticks.sort((a, b) => a - b);
    }
    if (scale === 'log') {
      const lmin = Math.floor(Math.log10(yMin));
      const lmax = Math.ceil(Math.log10(yMax));
      const ticks = [];
      for (let e = lmin; e <= lmax; e++) ticks.push(Math.pow(10, e));
      return ticks;
    }
    const step = Math.ceil(yMax / 5 / 50) * 50 || 100;
    const ticks = [];
    for (let v = 0; v <= yMax; v += step) ticks.push(v);
    return ticks;
  }, [mode, scale, yMin, yMax]);
  const fmtY = v => {
    if (mode === 'annual') return `${v > 0 ? '+' : ''}${v.toFixed(0)}%`;
    if (v >= 100) return v.toFixed(0);
    if (v >= 1) return v.toFixed(1);
    return v.toFixed(2);
  };
  const xTicks = useMemo(() => {
    const span = i1 - i0;
    const step = span > 25 ? 5 : span > 10 ? 2 : 1;
    const ticks = [];
    for (let i = i0; i <= i1; i += step) ticks.push(i);
    if (ticks[ticks.length - 1] !== i1) ticks.push(i1);
    return ticks;
  }, [i0, i1]);
  const onMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    if (px < pad.l || px > pad.l + innerW) {
      setHover(null);
      return;
    }
    const idx = Math.round(i0 + (px - pad.l) / innerW * (i1 - i0));
    setHover(Math.max(i0, Math.min(i1, idx)));
  };
  const onLeave = () => setHover(null);
  const [dragging, setDragging] = useState(null);
  const brushH = 32;
  const brushY = H - brushH;
  const miniY = (v, s) => {
    const vals = s.display;
    const max = Math.max(...vals.filter(x => Number.isFinite(x)));
    const min = Math.min(...vals.filter(x => Number.isFinite(x)));
    return brushY + 4 + (1 - (v - min) / Math.max(0.01, max - min)) * (brushH - 8);
  };
  const bx = i => pad.l + i / (DI.years.length - 1) * innerW;
  const onBrushDown = which => e => {
    e.preventDefault();
    setDragging(which);
  };
  useEffect(() => {
    if (!dragging) return;
    const move = e => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const px = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left;
      const ratio = Math.max(0, Math.min(1, (px - pad.l) / innerW));
      const idx = Math.round(ratio * (DI.years.length - 1));
      setRange(r => {
        if (dragging === 'left') return [Math.min(idx, r[1] - 2), r[1]];
        if (dragging === 'right') return [r[0], Math.max(idx, r[0] + 2)];
        return r;
      });
    };
    const up = () => setDragging(null);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, {
      passive: false
    });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [dragging, innerW]);
  const toggle = k => setEnabled(e => ({
    ...e,
    [k]: !e[k]
  }));
  const hoverYear = hover != null ? DI.years[hover] : null;
  const totalH = H + (showBrush ? brushH + 18 : 0);
  return React.createElement("div", {
    ref: wrapRef,
    style: {
      width: '100%',
      fontFamily: T.font,
      color: T.ink
    }
  }, (showToggle || showLegend) && React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '0.9rem'
    }
  }, showLegend && React.createElement("div", {
    style: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    }
  }, series.map(s => React.createElement("button", {
    key: s.key,
    onClick: () => toggle(s.key),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '.45rem',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontFamily: T.font,
      fontSize: '.85rem',
      color: enabled[s.key] ? T.ink : T.inkMute,
      opacity: enabled[s.key] ? 1 : 0.55,
      padding: '.25rem 0'
    }
  }, React.createElement("span", {
    style: {
      width: 18,
      height: 3,
      background: s.color,
      display: 'inline-block',
      borderRadius: 2,
      opacity: enabled[s.key] ? 1 : 0.4
    }
  }), s.label))), showToggle && React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 3,
      borderRadius: 999,
      border: `1px solid ${T.line}`,
      background: T.bg
    }
  }, ['cumulative', 'annual'].map(m => React.createElement("button", {
    key: m,
    onClick: () => setMode(m),
    style: {
      border: 'none',
      background: mode === m ? T.ink : 'transparent',
      color: mode === m ? T.bg : T.inkMute,
      fontFamily: T.mono,
      fontSize: '.72rem',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      padding: '.4rem .7rem',
      borderRadius: 999,
      cursor: 'pointer'
    }
  }, m))), mode === 'cumulative' && React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 3,
      borderRadius: 999,
      border: `1px solid ${T.line}`,
      background: T.bg,
      marginLeft: 4
    }
  }, ['log', 'linear'].map(sc => React.createElement("button", {
    key: sc,
    onClick: () => setScale(sc),
    style: {
      border: 'none',
      background: scale === sc ? T.ink : 'transparent',
      color: scale === sc ? T.bg : T.inkMute,
      fontFamily: T.mono,
      fontSize: '.72rem',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      padding: '.4rem .7rem',
      borderRadius: 999,
      cursor: 'pointer'
    }
  }, sc))))), React.createElement("svg", {
    viewBox: `0 0 ${W} ${totalH}`,
    width: "100%",
    height: totalH,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: {
      display: 'block',
      overflow: 'visible',
      touchAction: 'none'
    }
  }, yTicks.map((t, i) => React.createElement("g", {
    key: 'y' + i
  }, React.createElement("line", {
    x1: pad.l,
    x2: pad.l + innerW,
    y1: y(t),
    y2: y(t),
    stroke: T.grid
  }), React.createElement("text", {
    x: pad.l - 8,
    y: y(t) + 4,
    fontSize: "10.5",
    fontFamily: T.mono,
    fill: T.inkMute,
    textAnchor: "end"
  }, fmtY(t)))), mode === 'annual' && yMin < 0 && yMax > 0 && React.createElement("line", {
    x1: pad.l,
    x2: pad.l + innerW,
    y1: y(0),
    y2: y(0),
    stroke: T.inkMute,
    strokeWidth: "1"
  }), xTicks.map(i => React.createElement("text", {
    key: 'x' + i,
    x: x(i),
    y: pad.t + innerH + 18,
    fontSize: "10.5",
    fontFamily: T.mono,
    fill: T.inkMute,
    textAnchor: "middle"
  }, DI.years[i])), annotations.map((a, k) => {
    const i = DI.years.indexOf(a.year);
    if (i < i0 || i > i1) return null;
    return React.createElement("g", {
      key: 'a' + k
    }, React.createElement("line", {
      x1: x(i),
      x2: x(i),
      y1: pad.t,
      y2: pad.t + innerH,
      stroke: T.accent,
      strokeDasharray: "3 4",
      opacity: "0.5"
    }), React.createElement("text", {
      x: x(i) + 4,
      y: pad.t - 12,
      fontSize: "10.5",
      fontFamily: T.mono,
      fill: T.accent
    }, a.label));
  }), displaySeries.filter(s => enabled[s.key]).map(s => {
    const measuredEndIdx = DI.years.indexOf(DI.dataEndMeasured);
    const hasEarlyRead = s.key === 'di' && i1 > measuredEndIdx && measuredEndIdx >= i0;
    const solidEnd = hasEarlyRead ? measuredEndIdx : i1;
    const solidPath = (() => {
      let d = '';
      for (let i = i0; i <= solidEnd; i++) {
        const px = x(i),
          py = y(s.display[i]);
        d += (i === i0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
      }
      return d;
    })();
    const earlyPath = hasEarlyRead ? (() => {
      let d = '';
      for (let i = solidEnd; i <= i1; i++) {
        const px = x(i),
          py = y(s.display[i]);
        d += (i === solidEnd ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
      }
      return d;
    })() : null;
    return React.createElement("g", {
      key: s.key
    }, mode !== 'annual' && !s.dashed && React.createElement("path", {
      d: areaFor(s.display),
      fill: s.color,
      opacity: "0.08"
    }), React.createElement("path", {
      d: solidPath,
      fill: "none",
      stroke: s.color,
      strokeWidth: "2.2",
      strokeDasharray: s.dashed ? '4 4' : '0',
      strokeLinejoin: "round",
      strokeLinecap: "round"
    }), earlyPath && React.createElement("path", {
      d: earlyPath,
      fill: "none",
      stroke: s.color,
      strokeWidth: "2.2",
      strokeDasharray: "2 5",
      strokeLinejoin: "round",
      strokeLinecap: "round",
      opacity: "0.85"
    }));
  }), (() => {
    const idx = DI.years.indexOf(DI.dataEndMeasured);
    if (idx <= i0 || idx >= i1) return null;
    return React.createElement("g", null, React.createElement("line", {
      x1: x(idx),
      x2: x(idx),
      y1: pad.t,
      y2: pad.t + innerH,
      stroke: T.inkMute,
      strokeDasharray: "2 4",
      opacity: "0.4"
    }), React.createElement("text", {
      x: x(idx) + 4,
      y: pad.t + innerH - 8,
      fontSize: "9.5",
      fontFamily: T.mono,
      fill: T.inkMute,
      style: {
        letterSpacing: '.06em'
      }
    }, "2025 \xB7 early read"));
  })(), hover != null && React.createElement("g", null, React.createElement("line", {
    x1: x(hover),
    x2: x(hover),
    y1: pad.t,
    y2: pad.t + innerH,
    stroke: T.ink,
    strokeDasharray: "3 3",
    opacity: "0.3"
  }), displaySeries.filter(s => enabled[s.key]).map(s => React.createElement("circle", {
    key: s.key,
    cx: x(hover),
    cy: y(s.display[hover]),
    r: "4",
    fill: T.bg,
    stroke: s.color,
    strokeWidth: "2"
  }))), showBrush && React.createElement("g", null, React.createElement("rect", {
    x: pad.l,
    y: brushY,
    width: innerW,
    height: brushH - 4,
    fill: T.bg,
    stroke: T.line
  }), (() => {
    const s = displaySeries.find(s => s.key === 'di') || displaySeries[0];
    let d = '';
    for (let i = 0; i < DI.years.length; i++) {
      d += (i === 0 ? 'M' : 'L') + bx(i).toFixed(1) + ',' + miniY(s.display[i], s).toFixed(1) + ' ';
    }
    return React.createElement("path", {
      d: d,
      fill: "none",
      stroke: s.color,
      strokeWidth: "1.2",
      opacity: "0.55"
    });
  })(), React.createElement("rect", {
    x: bx(i0),
    y: brushY,
    width: bx(i1) - bx(i0),
    height: brushH - 4,
    fill: T.accent,
    opacity: "0.12"
  }), React.createElement("rect", {
    x: bx(i0) - 5,
    y: brushY - 2,
    width: 10,
    height: brushH,
    fill: T.ink,
    rx: "2",
    style: {
      cursor: 'ew-resize'
    },
    onMouseDown: onBrushDown('left'),
    onTouchStart: onBrushDown('left')
  }), React.createElement("rect", {
    x: bx(i1) - 5,
    y: brushY - 2,
    width: 10,
    height: brushH,
    fill: T.ink,
    rx: "2",
    style: {
      cursor: 'ew-resize'
    },
    onMouseDown: onBrushDown('right'),
    onTouchStart: onBrushDown('right')
  }))), hover != null && React.createElement("div", {
    style: {
      marginTop: showBrush ? -18 : -6,
      pointerEvents: 'none',
      transform: `translateX(${Math.min(Math.max(x(hover) - 80, 8), W - 180)}px)`,
      display: 'inline-block',
      background: T.tooltipBg,
      border: `1px solid ${T.line}`,
      padding: '0.5rem 0.7rem',
      borderRadius: 6,
      fontSize: '.82rem',
      fontFamily: T.mono,
      color: T.ink,
      boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 600,
      marginBottom: 2
    }
  }, hoverYear), displaySeries.filter(s => enabled[s.key]).map(s => React.createElement("div", {
    key: s.key,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '1rem'
    }
  }, React.createElement("span", {
    style: {
      color: s.color
    }
  }, s.label), React.createElement("span", null, mode === 'annual' ? (s.display[hover] > 0 ? '+' : '') + s.display[hover].toFixed(2) + '%' : s.display[hover].toFixed(2))))));
}
window.DIChart = DIChart;