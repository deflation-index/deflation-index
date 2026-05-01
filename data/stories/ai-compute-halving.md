There are two stories about the cost of AI in 2025, and they point in opposite directions.

The first is the one you read in the news: training a frontier model now costs hundreds of millions of dollars. GPT-5-class systems require clusters of tens of thousands of accelerators running for months. Data center capex is the largest line item in big-tech earnings calls. AI is, on this telling, *getting more expensive*.

The second is the one Epoch AI tracks: the cost of doing a unit of AI work — compute per dollar — keeps falling at roughly the same rate it has fallen for forty years. **Performance-per-dollar in AI compute is halving every 2.2 years.** The 2025 reading is **−37%** year-over-year, the steepest drop in the series since 2020.

Both stories are true. They're describing different things. The frontier got more expensive because the frontier moved. Doing what was the frontier two years ago has gotten radically cheaper, and the trend doesn't show signs of slowing.

## Why both are true at once

A useful frame: AI compute has a *training* curve and an *inference* curve, and they behave differently.

**Training compute** has indeed inflated at the frontier, because the frontier itself is defined as "the largest training run anyone is willing to fund." The compute required for state-of-the-art models has grown about 4–5x per year since 2018, faster than hardware can deliver. The dollar number goes up because the requirement grew faster than the unit cost fell.

**Inference compute** — the ongoing cost of running a model after training is done — has fallen ferociously. Specialized inference chips (like Groq's LPUs and various NPU integrations), better quantization (running models at 4-bit or 2-bit precision instead of 16-bit), better serving infrastructure (continuous batching, speculative decoding), and the simple economics of mass-produced silicon have collapsed the cost of "answer one question at GPT-4 quality" by something like 100x in two years. By 2025, you can serve a Claude 3.5 Sonnet-class response for a fraction of a cent. In 2023, the same response cost on the order of a dime.

For the Deflation Index, the relevant curve is the second one. The index tracks unit cost — dollars per gigaflop, or per token, or per inference — not the size of someone's training cluster. The cost of doing a *fixed* unit of AI work has been the most aggressively deflationary curve we measure.

## The 2.2-year doubling

Epoch AI's most-cited figure is **2.2 years** — the time it takes for performance-per-dollar in AI compute to halve. (Or equivalently, for the dollar to buy twice as much compute.) This is **steeper than Moore's Law**, which historically clocked at 2 years for transistor density. AI compute compounds roughly as fast.

It compounds, importantly, on top of three different drivers:

1. **Hardware density** — more transistors per chip, more chips per server, more servers per cluster. Roughly the Moore's Law contribution. ~25% per year.
2. **Hardware specialization** — Tensor cores, transformer-optimized memory hierarchies, NVLink fabric, eventually photonic interconnect. Moving from "general-purpose math" to "specifically the math AI needs." ~15% per year on top.
3. **Algorithmic efficiency** — distillation, mixture-of-experts, sparse attention, smarter quantization. Doing the same task with fewer FLOPs. Often ignored in cost-per-compute discussions, but on benchmarks-per-dollar, this is roughly half of total progress. ~25% per year on top.

Compound those three and you get something close to the 37%/year decline Epoch reports. Each driver is fragile in isolation. Together they keep delivering.

## Why this matters beyond AI

The Computing sector of the Deflation Index — historically dominated by the kinds of compute that ran spreadsheets and rendered video — is now dominated, in dollar terms, by AI compute. The 2025 sector value is **0.078** on the 1990=100 scale. A ninety-nine point nine percent drop in cost-per-unit-compute over thirty-five years.

If the trend holds, the implications spill far outside the index:

- **AI capex is not a one-time infrastructure build.** Anything you can wait two years on, you'll do at half the cost. Anything you can wait four years on, a quarter. This bends procurement, service-pricing, and competitive strategy in ways the 2024 market is still pricing in.
- **The economics of inference favor abundance over scarcity.** Charging by the token gets harder when the marginal cost of a token approaches zero. The business models that survive are the ones built on volume, distribution, and trust — not metered access.
- **The "AI bubble" question reframes.** A capex-heavy buildout looks bubble-like. A capex-heavy buildout into an asset whose unit economics improve 37% per year is closer to laying fiber in 1998: the infrastructure outlives the financial cycle, even when the financial cycle gets brutal.

For the index, the reading is simpler. Computing is the steepest curve we measure. In 2025 it got steeper. Until inference cost stops collapsing — and there is no current evidence that it will — that line keeps falling.

Two stories. Both true. The one you don't read in the news is, for the long-run economics, the one that matters more.
