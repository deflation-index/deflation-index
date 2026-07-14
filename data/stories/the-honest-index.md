This summer we audited our own index. We found three problems. All three point the same direction: **our headline number understates technology deflation — substantially.**

This essay explains what we found, what we're doing about it, and why we're telling you before the fix ships.

## What we found

**First, the averaging method was too polite.** The index combined its components with weighted *arithmetic* averages. That sounds innocuous, and for series that move together, it is. But when one component falls a million-fold while another falls ten-fold, an arithmetic average quietly becomes a chart of the slowest component — the composite can never fall below the slow movers, no matter what the fast ones do. Computing carries 29% of our index's weight; by 2024 it contributed about 1% of the index's level. The convention for price series spanning orders of magnitude — used by the BLS within its categories, and by every study of computing costs since Nordhaus — is the *geometric* average, which treats a halving as a halving no matter where it happens. Ours wasn't.

**Second, some of our early data didn't deserve the decimal places it carried.** When we traced the 1990s values in our own workbooks back toward their sources, several series turned out to be smooth back-extrapolations — each year exactly 90.089% of the one before, seven significant digits of a formula, not a measurement. Where the published record exists, it disagrees: a gigabyte of hard drive cost about $9,000 in 1990, not the $7.65 our workbook carried. A billion calculations per second cost on the order of a million dollars, not $831.

**Third, our sectors weren't measuring what our labels said.** The site said "lithium-ion battery pack cost"; the series behind it was a blend of batteries with unsourced estimates for autonomous driving and ridesharing. The site said "solar LCOE"; the series blended solar with storage and LED lighting. Label and construction have to match. They didn't.

## What changes

Version 4.0 rebuilds the index on three rules: **every series is the single metric its label claims. Every datapoint traces to a published source. Every series starts when defensible measurement starts** — batteries in 2010 with the first BloombergNEF survey, wholesale connectivity in 1998 with the first market pricing, solar in 2010 with IRENA's coverage. Aggregation moves to geometric averages, and the old arithmetic version will be published alongside as a sensitivity, so anyone can see exactly what the change did.

The corrections cut both ways, and that matters. Computing deflation gets much deeper — the draft rebuild compounds near 37% per year, right where the published record puts it. Connectivity gets far deeper: wholesale internet transit fell from $1,200 to seven cents per megabit-per-second-month since 1998. But energy gets *shallower*: we can defend IRENA's −89% in real terms since 2010 — which is −84% in the nominal dollars every sector here uses — and we cannot defend the −98.5%-since-1990 figure our old synthetic series implied, so we're surrendering it. An index that only ever revises in its own favor is advocacy. This one gives back the claims it can't source.

The headline, still being verified datapoint by datapoint: technology deflation of **−99.97% cumulative since 1990 — roughly 20% per year, every year, for thirty-five years** — against money supply growing 5.7% annually. If that draft survives verification, the published gap has been conservative this whole time.

## Why tell you now

Because you'd find it anyway, and you should. The audit memo — including the parts that are unflattering — is in our repository, next to the data it criticizes. The Method page has carried a plain-language disclosure since the day the audit concluded. The anchor tables show, row by row, which datapoints are verified against primary documents and which are still being checked, and our build refuses to call any output final until every row clears.

Measurement projects earn trust in exactly one way: by being most rigorous about their own numbers. We found the flaw, we published the flaw, and we're fixing it in the open, before the corrected headline ships — not after someone else forced us to.

v4.0 now runs this site as a release candidate — the headline you see everywhere here is the corrected one. The verification ledger stays open, row by row, until the last datapoint clears against its primary document. The data, the audit, and every intermediate draft are on [GitHub](https://github.com/deflation-index/deflation-index). Argue with it.
