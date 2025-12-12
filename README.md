# The Deflation Index

**Quantifying technological deflation across computing, communications, and energy.**

The Deflation Index (DI) measures the force of technological progress by tracking exponential cost reductions in three fundamental sectors and comparing them against monetary expansion and official inflation metrics.

## 📊 What is the DI?

The Deflation Index is a composite metric (35% Computing, 30% Communications, 35% Energy) that quantifies annual technological deflation from 1990-2024. It reveals the gap between:
- **What technology delivers** (20-25% annual cost reductions)
- **What monetary policy creates** (6-7% M2 expansion)  
- **What we experience** (2-3% CPI inflation)

## 🚀 Live Site

Visit [deflationindex.com](https://deflationindex.com) (coming soon)

## 📁 Repository Structure

```
deflation-index/
├── public/               # Static website files
│   ├── index.html       # Main website
│   └── assets/          # Future: images, additional files
├── data/                # Source data and calculations
│   ├── master_deflation_index.xlsx
│   ├── computing_deflation_index.xlsx
│   ├── communications_deflation_index.xlsx
│   └── energy_deflation_index.xlsx
├── docs/                # Documentation
│   ├── DEPLOYMENT.md    # Deployment instructions
│   ├── METHODOLOGY.md   # Data sources and calculations
│   └── API.md           # Future: API documentation
└── README.md           # This file
```

## 🛠 Technology Stack

- **Frontend**: Static HTML/CSS/JS with Chart.js
- **Hosting**: Cloudflare Pages (free, global CDN)
- **Domain**: deflationindex.com
- **Analytics**: Plausible (privacy-focused, coming soon)

## 📈 Key Findings

**1990-2024 Analysis:**
- Technology delivered **~1,500%** purchasing power gains
- Actual purchasing power: **-45%** decline
- Net gap: **~2,000%** or **~90%** of potential abundance

**Annual Averages:**
- Deflation Index: **-22%**
- M2 Growth: **+6.4%**
- Official CPI: **+2.8%**
- Annual capture rate: **~19%**

## 🔄 Development

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/deflation-index.git
cd deflation-index

# Open the site locally
cd public
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Making Updates
1. Edit files in `/public`
2. Test locally
3. Commit and push to main branch
4. Cloudflare Pages auto-deploys

## 📊 Data Sources

All calculations based on publicly available data:
- **Federal Reserve**: M2 money supply data
- **Bureau of Labor Statistics**: CPI data
- **IRENA**: Solar panel cost data
- **BloombergNEF**: Battery cost data
- **AI Impacts**: Computing cost trends
- **IEA**: Energy data and analysis
- **Industry sources**: Storage, communications, LED pricing

## 🤝 Contributing

This is currently a solo research project by Deflation Index LLC. 

For questions or data corrections: contact@deflationindex.com (coming soon)

## 📄 License

© 2024 Deflation Index LLC. All rights reserved.

Data sources are publicly available. Calculations and methodology are original work.

## 🎯 Roadmap

- [x] Core website with interactive visualization
- [ ] Deploy to deflationindex.com
- [ ] Add email newsletter signup
- [ ] Monthly DI updates
- [ ] API for DI data (Q1 2025)
- [ ] Premium data subscriptions
- [ ] Additional sectors (healthcare, education, housing)
- [ ] Real-time DI calculator

## 📞 Contact

- Website: deflationindex.com (coming soon)
- Email: contact@deflationindex.com (coming soon)
- Twitter: @deflationindex (coming soon)

---

**Built to measure the force of technological progress and track where the abundance goes.**
