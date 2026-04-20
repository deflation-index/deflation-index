# Contributing to The Deflation Index

Thanks for being here. The Deflation Index is an open research project, and
contributions — from typo fixes to new sector proposals — are welcome.

The project is licensed CC BY 4.0 (data, methodology, and documentation) and
MIT (code). By contributing, you agree your contributions are offered under
the same terms.

## Ways to contribute

### Pull requests welcome

We accept pull requests for:

- **Data corrections** — if you can point to a better source for a specific data point, open a PR that updates the underlying CSV/JSON/Excel cell and cites the source in the commit message.
- **Methodology improvements** — weight justifications, sector definitions, calculation refinements. Back significant changes with a note in the PR description explaining the rationale and any impact on headline numbers.
- **Code** — scripts, site fixes, visualization improvements, accessibility and performance work. Small PRs merge faster than sprawling ones.
- **Documentation** — typos, clarifications, reorganization, examples, translations.
- **Tests & verification** — anything that makes it easier to reproduce or audit the calculations.

Open a PR directly, or open an issue first if you want to scope-check a larger change. We respond in days, not hours, but we do respond.

### Issues welcome

If you don't want to write code, open a GitHub issue. Useful issues include:

- **Bug reports** — something on the site or in the data that's wrong or broken. Include browser/OS if it's a site bug, and the exact cell or path if it's a data bug.
- **Data concerns** — "I think 2015 solar costs look too low, here's the source I checked against."
- **Methodology challenges** — "Your weight for transportation ignores X, here's why it matters."
- **Sector proposals** — "You should measure healthcare / education / housing / agriculture. Here's a candidate data source."
- **Feature requests** — chart types, data views, API endpoints, integrations.

## What makes a good data-correction PR

Be specific:

- **Which data point** — e.g. `data/excel/energy_deflation_index_v1.0.xlsx`, sheet `Master_Data`, row for year 1995, column `Solar $/W`.
- **Current value** — `$15.00 / watt`
- **Proposed value** — `$11.85 / watt`
- **Source** — IRENA *Renewable Power Generation Costs in 2024*, Table 3.2, page 47. URL if it's online.
- **Why the current value is wrong** — transcription error? superseded source? methodology shift?

Changes that move a headline number (annual rate, cumulative deflation, any sector total) should also update `data/constants.json` and the relevant Markdown docs. If that sounds like a lot, it's fine to open an issue instead and let us handle the downstream propagation.

## Source quality standards

Preferred:

- Government agencies (BLS, Federal Reserve/FRED, DOE, FCC, BEA, EIA)
- International bodies (IRENA, IEA, World Bank, IMF)
- Peer-reviewed research
- Industry reports from established firms with transparent methodology (BloombergNEF, NREL, Epoch AI, Wood Mackenzie)
- Company 10-K filings and SEC disclosures

Avoid:

- Blog posts without primary-source citations
- Single-source claims where the claim is novel
- Paywalled data we can't link to or reproduce
- Politically motivated aggregations

## Code style

- HTML/CSS/JS: match the existing files. Design system uses Fraunces (display), Inter (body), IBM Plex Mono (data/labels) and a paper/ink/gold/teal palette — variables are at the top of each HTML file.
- Python scripts: follow the conventions in existing scripts under `/scripts/`. Prefer `pandas` for tabular work, keep functions small, and document assumptions inline.
- Commit messages: short imperative subject line, then a paragraph explaining the why. Reference the issue if one exists.

## Code of conduct

- **Critique ideas, not people.** This is economic analysis, not culture war.
- **Cite your claims.** "I think X" is fine; "X is true because of Y source" is better.
- **Acknowledge uncertainty.** The index has limitations; we document them and we're honest about them.
- **Assume good faith.** If a number looks wrong, the likeliest explanation is a mistake, not malice.

## Recognition

Significant contributions are credited in:

- The commit history
- `docs/operations/CHANGELOG.md`
- Occasionally the blog and site, when the contribution is of public interest

## Questions

- Technical or methodological: open a GitHub issue.
- Everything else: `info@deflationindex.com`

Thanks for helping make this more accurate, more useful, and more open.
