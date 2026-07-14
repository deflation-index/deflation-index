// Deflation Index data — v4.0-rc.1 (generated from data/v4/draft_output.json)
// Available on window.DI

window.DI = (function(){
  // 1990–2025 inclusive (36 years). v4.0 release candidate: all four sectors
  // are single-metric series from published sources, aggregated with weighted
  // GEOMETRIC means. Late-start sectors hold at 100 before their first
  // datapoint (comms 1998, energy 2010, transportation 2010). Every anchor's
  // verification status is public in data/v4/*.csv; the arithmetic variant is
  // published as a sensitivity in data/v4/draft_output.json.
  const years = Array.from({length: 36}, (_, i) => 1990 + i);
  const dataEndMeasured = 2025; // all sectors measured through 2025
  const dataEndEarly = 2025;

  // Rebased to 1990=100 (v4 geometric master)
  const di = [100,88.1275,77.6645,66.5776,57.0734,51.6202,42.0308,34.2228,25.0026,17.0709,11.6554,8.33666,5.9629,4.48967,3.7181,3.28651,2.90806,2.33124,1.59363,1.16244,0.884034,0.618215,0.414704,0.274432,0.200128,0.145942,0.113526,0.08831,0.075954,0.065327,0.056187,0.048843,0.042459,0.039399,0.036405,0.034413];  // v4.0-rc: weighted geometric mean of v4 sector series (data/v4/draft_output.json)
  // M2 real through 2025 (FRED live, 1990-base index)
  const m2 = [100,103.06,104.68,106.23,106.71,111.11,116.58,123.09,133.59,141.62,150.21,165.87,176.42,184.95,195.64,203.67,214.31,227.87,250.06,259.2,267.86,293.1,318.15,335.45,356.14,375.89,402.68,422.45,437.96,467.38,583.04,658.39,654.39,636.81,650.02,
    675.69  // 2025: +3.95% YoY measured, FRED M2SL
  ];
  // CPI real through 2025 (BLS CPIAUCSL)
  const cpi = [100,105.4,109.8,113.1,116.1,119.3,121.9,124.7,128.0,132.4,136,138.9,141.1,143.3,143.4,144.4,146.3,149.3,152.9,155.7,159.3,161.2,163.5,165.9,168.6,175.5,181.5,187.3,192.7,197.3,201.5,210.9,227.8,237.1,243.5,
    250.10  // 2025: +2.71% YoY measured, BLS
  ];

  // Per-sector indices, 1990=100. 2025 values are early-read where available.
  const computing = [100,65.068,42.3385,25.0772,14.8533,10.5567,5.24871,2.60962,0.897481,0.308655,0.10615,0.0552587,0.028766,0.0150854,0.0109353,0.0090937,0.00758929,0.00633377,0.00307526,0.00149315,0.00083542,0.00047733,0.00023674,0.00011742,8.102e-05,5.591e-05,3.866e-05,2.673e-05,2.601e-05,2.531e-05,2.463e-05,1.976e-05,1.586e-05,1.36e-05,1.208e-05,1.072e-05];  // v4.0-rc: geometric blend compute/storage/memory 60/30/10 (data/v4)
  const communications = [100,100,100,100,100,100,100,100,100,75,56.25,30.6186,16.6667,11.1803,7.5,5.59017,4.16667,2.04124,1,0.645497,0.416667,0.285044,0.195,0.125915,0.0813051,0.0525,0.0397586,0.0301094,0.0228021,0.0172682,0.0130773,0.00990352,0.0075,0.00689731,0.00634305,0.00583333];  // v4.0-rc: wholesale IP transit, series starts 1998 (data/v4/comms_transit.csv)
  const energy = [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,80.2568,64.4115,51.6946,41.4884,33.2973,28.9744,25.2128,21.9395,19.0912,16.6126,16.0148,15.4385,14.8829,15.3514,15.8559];  // v4.0-rc: IRENA utility PV LCOE, 2025 vintage converted to nominal, starts 2010 (data/v4/energy_solar.csv)
  const transportation = [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,80.1631,64.2613,51.5138,41.2951,33.1034,26.9371,21.9194,17.8364,14.5139,11.8103,11.8675,11.925,11.9828,9.91379,9.31034];  // v4.0-rc: BNEF pack survey (nominal as published), starts 2010 (data/v4/transportation_battery.csv)

  const sectors = [
    {id:'computing', name:'Computing', icon:'chip', weight:0.2941, metric:'compute · storage · memory',
     metricLong:'Geometric blend: processing ($/GFLOPS, 60%), disk ($/GB, 30%), RAM ($/GB, 10%)',
     drop:-99.99999, annualRate:-36.7, data:computing,
     raw1990:'~$963k/GFLOPS · $9,000/GB disk', raw2025:'$0.0123/GFLOPS · $0.010/GB disk',
     buysPer100: {then: '0.0001 GFLOPS', now: '8,130 GFLOPS (8.1 TFLOPS)'},
     tangible:{then:'A GFLOP of compute cost roughly a million dollars. A gigabyte of disk: $9,000.', now:'A penny buys the GFLOP; the gigabyte costs one cent.'},
     narrative:'Moore\'s Law, then GPUs, then the AI accelerator boom — a roughly nine-million-fold composite decline, the steepest in economic history. One honest wrinkle: memory and storage prices turned UP in late 2025 on AI datacenter demand.',
     sources:['Cost-of-computing record','Komorowski / Backblaze','McCallum']},

    {id:'communications', name:'Communications', icon:'wave', weight:0.2353, metric:'$/Mbps·mo transit',
     metricLong:'Wholesale IP transit, per Mbps per month (the input layer, not your broadband bill)',
     drop:-99.994, annualRate:-30.31, data:communications, dataStart:1998,
     raw1990:'—', raw2025:'$0.07/Mbps·mo (≈$0.0005/GB)',
     buysPer100: {then:'≈11 GB moved (1998)', now:'≈186 TB moved'},
     tangible:{then:'Moving a month of traffic at 1 Mbps cost $1,200 in 1998.', now:'Seven cents.'},
     narrative:'The market price of reaching the entire internet, surveyed since 1998. A seventeen-thousand-fold decline — and a market that did not exist in 1990, so the series honestly starts when it did.',
     sources:['DrPeering (Norton)','TeleGeography']},

    {id:'energy', name:'Energy', icon:'sun', weight:0.2941, metric:'$/kWh solar LCOE',
     metricLong:'Utility-scale solar PV, global weighted-average levelized cost (IRENA)',
     drop:-84.1, annualRate:-11.6, data:energy, dataStart:2010,
     raw1990:'—', raw2025:'$0.044/kWh',
     buysPer100:{then:'360 kWh of solar (2010)', now:'2,270 kWh of solar'},
     tangible:{then:'A solar kilowatt-hour cost 28 cents in 2010 (in 2010 dollars).', now:'4.4 cents — and the decline has plateaued.'},
     narrative:'IRENA measures an 89% real-terms decline since 2010; in nominal dollars — the basis every sector here uses — it is 84%. And honestly: the curve has flattened, and in nominal terms solar LCOE has risen since 2023. We report the plateau too.',
     sources:['IRENA']},

    {id:'transportation', name:'Transportation', icon:'battery', weight:0.1765, metric:'$/kWh Li-ion pack',
     metricLong:'Lithium-ion battery pack cost, volume-weighted average (BloombergNEF survey)',
     drop:-90.7, annualRate:-14.64, data:transportation, dataStart:2010,
     raw1990:'—', raw2025:'$108/kWh',
     buysPer100:{then:'0.086 kWh (2010)', now:'0.93 kWh'},
     tangible:{then:'An EV battery pack was $1,160/kWh in 2010.', now:'$108 — a ten-fold drop in fifteen years.'},
     narrative:'The battery is the car. Packs plateaued near $140 from 2020 to 2023, then resumed falling: $115 in 2024, $108 in 2025 ($99 BEV-specific). Below $100, EVs undercut gas cars on sticker price for good.',
     sources:['BloombergNEF','IEA']}
  ];

  const headline = {
    // v4.0-rc.1 — geometric master (see data/v4/draft_output.json)
    di_cumulative_pct: -99.964,       // 2024, 1990 base
    di_annual_pct: -20.38,
    di_2024: 0.0364,
    di_2025_early: 0.0344,            // key name kept for compatibility; 2025 is measured
    di_2025_cumulative_pct: -99.97,
    m2_cumulative_pct: 550.02,
    m2_annual_pct: 5.66,
    m2_2024: 650.02,
    m2_2024_trillions: 21.30,
    m2_2025: 675.69,
    m2_2025_cumulative_pct: 575.69,
    m2_2025_trillions: 21.97,
    cpi_cumulative_pct: 143.5,
    cpi_annual_pct: 2.65,
    cpi_2025: 250.10,
    cpi_2025_cumulative_pct: 150.10,
    gap_annual_pp: 26.0,              // |di_annual| + m2_annual
    abundance_gap_pp: 507,            // 2024: 99.97 + 550.02 - 143.5
    abundance_gap_2025_pp: 526        // 2025: 99.97 + 575.69 - 150.10
  };

  const early2025 = {
    status: 'v4_release_candidate',
    retrieved: '2026-07-13',
    m2_dec2025_trillions: 22.39,
    m2_yoy: 3.95,
    cpi_yoy: 2.71,
    battery_pack: 108,
    bev_pack: 99,
    stationary: 70,
    ai_compute_yoy: -37,
    ai_doubling_years: 2.2,
    measured: ['M2 (FRED)','CPI (BLS)','Battery pack (BNEF 2025)','Solar LCOE (IRENA 2025)','IP transit (TeleGeography 2025)','Compute/storage (published record)'],
    pending: ['Primary-document verification ledger (data/v4/*.csv)','Memory 2025 basis reconciliation (McCallum)','Direct 1990 compute datapoint (Nordhaus)']
  };

  const timeline = [
    {year:1990, title:'The baseline', text:'M2 at $3.3T. A GFLOP of compute costs roughly a million dollars; a gigabyte of disk, $9,000. Solar power is a novelty for calculators and satellites.'},
    {year:2000, title:'Computing bends the curve', text:"The dot-com boom wires the world. A commodity cluster delivers a GFLOPS for $640. A gigabyte of disk: $10. Wholesale internet transit, first surveyed in 1998 at $1,200/Mbps, is already at $675."},
    {year:2010, title:'Measurement broadens', text:'IRENA starts tracking solar ($0.28/kWh in 2010 dollars). BloombergNEF runs its first battery survey ($1,160/kWh pack). Two more sectors become measurable. M2: $8.7T.'},
    {year:2020, title:'The monetary break', text:'M2 expands 24% in one year — the largest peacetime expansion in U.S. history. Tech deflation keeps compounding underneath; battery packs pause near $137.'},
    {year:2024, title:'The measurement', text:'On the v4 method: DI at 0.033 (−99.97% since 1990). M2 at $21.3T (+550%). CPI at 243.5 (+143.5%). The gap between these lines is the story.'},
    {year:2026, title:'The correction (v4.0)', text:'We audit our own index and find the headline was too small. Geometric aggregation, verified anchors, every sector a single sourced metric. 2025 measured across all four: DI 0.0303, gap 526pp. And honestly: storage and memory prices turned UP on AI demand — 2026 may show technology inflation.'}
  ];

  // The $100 test — what a constant $100 bought then vs now (then = each series' first measured year)
  const dollarTest = [
    { id:'data', label:'Internet transit (since 1998)', unit:'GB moved', then:10.8, now:185700,
      thenText:'11 GB — a CD-ROM and change', nowText:'186 terabytes — the input layer got 17,000× cheaper' },
    { id:'compute', label:'Computing power', unit:'GFLOPS', then:0.000104, now:8130,
      thenText:'A ten-thousandth of a GFLOPS — spreadsheet territory', nowText:'8.1 TFLOPS — a modern gaming GPU' },
    { id:'solar', label:'Solar electricity (since 2010)', unit:'kWh', then:360, now:2270,
      thenText:'360 kWh — a fridge for most of a year', nowText:'2,270 kWh — most of a small home\'s year' },
    { id:'battery', label:'Battery capacity (since 2010)', unit:'kWh', then:0.086, now:0.93,
      thenText:'86 watt-hours — phone battery', nowText:'930 watt-hours — power tool or small e-bike' },
  ];

  // Stories — short explainer shelf (three essays, deliberately)
  const stories = [
    {slug:'what-is-deflation-index', kicker:'Explainer', title:'What the Deflation Index actually measures.',
     dek:'Three lines on a chart. The technology input layer, measured — and nothing it can\'t defend.', readMins:4},
    {slug:'the-abundance-gap', kicker:'Concept', title:'The Abundance Gap: tech savings, minus inflation.',
     dek:'Technology fell 96%. Money rose 576%. Prices rose 150%. What happened to the difference?', readMins:6},
    {slug:'the-honest-index', kicker:'Methodology', title:'We audited our own index. The headline was too small.',
     dek:'Three flaws, all pointing the same way. What v4.0 changes, and why we\'re telling you before it ships.', readMins:6},
  ];

  return { years, di, m2, cpi, sectors, headline, early2025, timeline, dollarTest, stories, dataEndMeasured, dataEndEarly };
})();
