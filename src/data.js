// Deflation Index data — extracted from constants.json & sectors.json v3.1.1
// Available on window.DI

window.DI = (function(){
  // 1990–2025 inclusive (36 years). Values through 2024 are measured (v3.0.3 weighted DI).
  // 2025 is an EARLY READ: M2 and CPI are measured from FRED/BLS; DI 2025 is projected
  // from known sector headlines (batteries $108/kWh, AI compute -37%/yr) + trend for
  // solar & comms which are not yet published. v4.0 will finalize mid-2026.
  const years = Array.from({length: 36}, (_, i) => 1990 + i);
  const dataEndMeasured = 2024; // last fully-weighted DI year
  const dataEndEarly = 2025;    // last early-read year

  // Rebased to 1990=100, from data/master_index.json (1990-2024 measured)
  const di = [100,80.46,67.53,58.69,52.4,49.47,45.54,42.4,39.84,37.7,42.83,38.44,35.08,32.45,30.34,35.16,31.48,28.8,26.81,25.32,24.08,19.16,15.55,13.35,10.1,8.73,7.29,6.05,5.32,4.77,4.46,4.14,4.2,4.02,3.75,
    // 2025 early read: weighted from measured sectors (computing trend, batteries $108/kWh = 9.31 idx, partial solar/comms)
    3.48
  ];
  // M2 real through 2025 (FRED live, 1990-base index)
  const m2 = [100,103.06,104.68,106.23,106.71,111.11,116.58,123.09,133.59,141.62,150.21,165.87,176.42,184.95,195.64,203.67,214.31,227.87,250.06,259.2,267.86,293.1,318.15,335.45,356.14,375.89,402.68,422.45,437.96,467.38,583.04,658.39,654.39,636.81,650.02,
    675.69  // 2025: +3.95% YoY measured, FRED M2SL
  ];
  // CPI real through 2025 (BLS CPIAUCSL)
  const cpi = [100,105.4,109.8,113.1,116.1,119.3,121.9,124.7,128.0,132.4,136,138.9,141.1,143.3,143.4,144.4,146.3,149.3,152.9,155.7,159.3,161.2,163.5,165.9,168.6,175.5,181.5,187.3,192.7,197.3,201.5,210.9,227.8,237.1,243.5,
    250.10  // 2025: +2.71% YoY measured, BLS
  ];

  // Per-sector indices, 1990=100. 2025 values are early-read where available.
  const computing = [100,68.51,47.52,33.43,23.81,17.22,12.63,9.37,7.10,5.41,4.18,3.25,2.55,2.02,1.64,1.33,1.07,0.89,0.74,0.75,0.56,0.46,0.40,0.35,0.33,0.29,0.25,0.22,0.19,0.18,0.17,0.15,0.13,0.12,0.12,
    0.078  // 2025: AI compute -37% from Epoch AI (blended into category)
  ];
  const communications = [100,66.63,47.31,35.85,28.84,31.63,27.03,23.51,20.74,18.51,16.66,15.07,13.80,12.67,11.49,10.39,9.35,8.31,7.30,6.29,5.28,4.78,4.28,3.78,3.28,2.78,2.28,2.08,1.79,1.49,1.29,1.08,0.96,0.85,0.73,
    0.65  // 2025: trend extrapolation (no FCC 2025 yet)
  ];
  const energy = [100,91.74,84.25,77.45,71.27,65.67,60.58,55.96,51.77,47.96,68.12,55.38,45.66,38.17,32.32,49.91,38.47,30.38,24.56,20.29,17.09,12.96,10.28,7.98,6.09,4.78,4.02,3.17,2.66,2.20,1.95,1.72,1.81,1.68,1.58,
    1.48  // 2025: trend extrapolation (IRENA 2025 pending)
  ];
  const transportation = [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,79.84,64.58,56.72,42.20,37.29,31.12,25.85,23.00,21.05,20.06,18.92,19.25,18.63,17.41,
    13.53  // 2025: BNEF $108/kWh measured (vs $1160 base 2010 → 9.31 idx rebased; here on 1990=100 scale matches bnef)
  ];

  const sectors = [
    {id:'computing', name:'Computing', icon:'chip', weight:0.2941, metric:'$/GFLOPS',
     metricLong:'Cost per billion floating-point operations per second',
     drop:-99.88, annualRate:-17.87, data:computing,
     raw1990:'$831/GFLOP', raw2025:'$0.00007/GFLOP',
     buysPer100: {then: '0.12 GFLOPS', now: '1.4M GFLOPS (1.4 TFLOPS)'},
     tangible:{then:'A GFLOP of compute cost about $831.', now:'Less than a hundredth of a cent.'},
     narrative:'The first 30 years of Moore\'s Law, then GPUs, then the AI accelerator boom. Performance-per-dollar is still halving every ~2.2 years.',
     sources:['Epoch AI','PassMark','Top500']},

    {id:'communications', name:'Communications', icon:'wave', weight:0.2353, metric:'$/GB',
     metricLong:'Cost per gigabyte of data transmitted',
     drop:-99.35, annualRate:-13.64, data:communications,
     raw1990:'$94/GB', raw2025:'$0.058/GB',
     buysPer100: {then:'1.06 GB', now:'1,724 GB (1.7 TB)'},
     tangible:{then:'A gigabyte of data cost ninety-four dollars.', now:'About six cents.'},
     narrative:'Dial-up to DSL to fiber to 5G. Bandwidth cost fell every year for 35 straight years.',
     sources:['FCC','Speedtest','Industry benchmarks']},

    {id:'energy', name:'Energy', icon:'sun', weight:0.2941, metric:'$/kWh',
     metricLong:'Levelized cost of electricity from solar PV',
     drop:-98.52, annualRate:-11.71, data:energy,
     raw1990:'$3.05/kWh', raw2025:'$0.040/kWh',
     buysPer100:{then:'33 kWh of solar', now:'2,500 kWh of solar'},
     tangible:{then:'A solar kilowatt-hour cost three dollars.', now:'Four cents — cheaper than most grids.'},
     narrative:'Swanson\'s Law: solar module costs fall ~20% with every doubling of cumulative production. In 2024 solar was the cheapest electricity in history.',
     sources:['IRENA','BloombergNEF','DOE']},

    {id:'transportation', name:'Transportation', icon:'battery', weight:0.1765, metric:'$/kWh',
     metricLong:'Lithium-ion battery pack cost',
     drop:-86.47, annualRate:-5.68, data:transportation, dataStart:2010,
     raw1990:'—', raw2025:'$108/kWh',
     buysPer100:{then:'0.086 kWh (2010)', now:'0.93 kWh'},
     tangible:{then:'An EV battery pack was $1,160/kWh in 2010.', now:'$108 — a ten-fold drop in fifteen years.'},
     narrative:'The battery is the car. When packs fall below $100/kWh, EVs cross under gas-car sticker prices for good. 2025: $108 pack, $99 BEV-specific.',
     sources:['BloombergNEF','IEA']}
  ];

  const headline = {
    di_cumulative_pct: -96.25,
    di_annual_pct: -9.21,
    di_2024: 3.75,
    di_2025_early: 3.48,
    di_2025_cumulative_pct: -96.52,
    m2_cumulative_pct: 550.02,
    m2_annual_pct: 5.66,
    m2_2024: 650.02,
    m2_2024_trillions: 21.30,
    m2_2025: 675.69,
    m2_2025_cumulative_pct: 575.69,
    m2_2025_trillions: 21.97,
    cpi_cumulative_pct: 143.5,
    cpi_annual_pct: 2.72,
    cpi_2025: 250.10,
    cpi_2025_cumulative_pct: 150.10,
    gap_annual_pp: 14.87,
    abundance_gap_pp: 503,
    abundance_gap_2025_pp: 522
  };

  const early2025 = {
    status: 'early_read',
    retrieved: '2026-04-20',
    m2_dec2025_trillions: 22.39,
    m2_yoy: 3.95,
    cpi_yoy: 2.71,
    battery_pack: 108,
    bev_pack: 99,
    stationary: 70,
    ai_compute_yoy: -37,
    ai_doubling_years: 2.2,
    measured: ['M2 (FRED)','CPI (BLS)','Battery pack (BNEF)','AI compute (Epoch)'],
    pending: ['Solar LCOE (IRENA, ~Jul 2026)','Broadband (FCC, late 2026)']
  };

  const timeline = [
    {year:1990, title:'The baseline', text:'M2 at $3.3T. Dial-up modems scream through copper. A GFLOP of compute costs about $831. Solar power is a novelty for calculators and satellites.'},
    {year:2000, title:'Computing bends the curve', text:"The dot-com boom wires the world. Moore's Law is in full stride. M2 reaches $4.9T; a gigabyte of data is down to $1.50."},
    {year:2010, title:'Energy joins the party', text:'Solar falls below $2/watt. The first mass-market EVs ship with $1,160/kWh lithium packs. LEDs reach scale. M2: $8.7T.'},
    {year:2020, title:'The monetary break', text:'M2 expands 24% in one year — the largest peacetime expansion in U.S. history. Tech deflation keeps compounding underneath.'},
    {year:2024, title:'The measurement', text:'DI at 3.75 (−96.25% since 1990). M2 at $21.3T (+550%). CPI at 243.5 (+143%). The gap between these three lines is the story.'},
    {year:2025, title:'Early read', text:'M2 at $22.0T (+3.95% YoY). CPI +2.71%. Battery packs $108/kWh, AI compute −37%/yr. Full weighted DI waits for 2026 publications.'}
  ];

  // The $100 test — what a constant $100 (1990 dollars equivalent) bought then vs now
  const dollarTest = [
    { id:'data', label:'Mobile data', unit:'GB', then:1.06, now:1724,
      thenText:'About 1 GB — the size of a CD', nowText:'1.7 terabytes — 400 HD movies' },
    { id:'compute', label:'Computing power', unit:'GFLOPS', then:0.12, now:1400000,
      thenText:'A fraction of a GFLOP', nowText:'1.4 petaflops — more than a 1995 supercomputer' },
    { id:'solar', label:'Solar electricity', unit:'kWh', then:33, now:2500,
      thenText:'33 kWh — enough for a few days of lighting', nowText:'2,500 kWh — a year of fridge + lights for a small home' },
    { id:'battery', label:'Battery capacity (since 2010)', unit:'kWh', then:0.086, now:0.93,
      thenText:'86 watt-hours — phone battery', nowText:'930 watt-hours — power tool or small e-bike' },
  ];

  // Stories — short explainer shelf
  const stories = [
    {slug:'what-is-deflation-index', kicker:'Explainer', title:'What the Deflation Index actually measures.',
     dek:'Three lines on a chart. One idea you already know but rarely see mapped.', readMins:4},
    {slug:'the-abundance-gap', kicker:'Concept', title:'The Abundance Gap: tech savings, minus inflation.',
     dek:'Technology fell 96%. Money rose 550%. Prices rose 143%. What happened to the difference?', readMins:6},
    {slug:'battery-breakeven', kicker:'Deep dive', title:'Batteries crossed $100/kWh in 2025 — the EV tipping point.',
     dek:'A pack below $100/kWh means EVs undercut gas cars on sticker price. Here\'s how we got here.', readMins:5},
    {slug:'ai-compute-halving', kicker:'Sector', title:'AI compute is still halving every 2.2 years.',
     dek:'Epoch AI\'s 2025 tracking says performance-per-dollar keeps falling. The deflation is accelerating, not slowing.', readMins:7},
  ];

  return { years, di, m2, cpi, sectors, headline, early2025, timeline, dollarTest, stories, dataEndMeasured, dataEndEarly };
})();
